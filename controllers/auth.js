import User from "../model/user"
import HttpCode from "../lib/constants"

import authService from "../service/auth"

import { EmailService, SenderSendgrid } from "../service/email"
import emailToName from "email-to-name"

const registration = async (req, res, next) => {
    try {
        const { email } = req.body
        const userExists = await authService.userExists(email)
        if (userExists) {
            return res.status(HttpCode.CONFLICT).json({status: 'error', code: HttpCode.CONFLICT, message: 'This email already exists'})
        }

        const userData = await authService.create(req.body)

        const emailService = new EmailService(process.env.NODE_ENV, new SenderSendgrid())

        const isVerifyEmailSent = await emailService.sendVerifyEmail(email, emailToName.process(userData.email), userData.verificationToken)
        delete userData.verificationToken

        res.status(HttpCode.CREATED).json({
            status: 'CREATED',
            code: HttpCode.CREATED,
            data: { ...userData, isVerifyEmailSent: isVerifyEmailSent }
        })
        
    } catch (err) {
        next(err)
    }
    
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await authService.getUser(email, password)
    if (!user) {
        return res.status(HttpCode.UNAUTHORIZED).json({status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials'})
    }

    const token = authService.getToken(user)
    await authService.setToken(user.id, token)
    res.status(HttpCode.OK).json({status: 'OK', code: HttpCode.OK, data: { token }})
}

const logout = async (req, res, next) => {
    await authService.setToken(req.user.id, null)

    res.status(HttpCode.NO_CONTENT).json({status: 'NO_CONTENT', code: HttpCode.NO_CONTENT, data: {}})
}

export { registration, login, logout }