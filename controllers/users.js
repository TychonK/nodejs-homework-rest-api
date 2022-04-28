import HttpCode from "../lib/constants"
import { uploadFileService, localFileStorage } from '../service/file-storage'
import emailToName from "email-to-name"

import repositoryUsers from '../repository/users'

import { EmailService, SenderSendgrid } from "../service/email"

const uploadAvatar = async (req, res, next) => {
    const uploadService = new uploadFileService(localFileStorage, req.file, req.user)
    const avatarUrl = await uploadService.updateAvatar()
    res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, message: 'Successfully uploaded avatar', data: { avatarUrl } })
}

const verifyUser = async (req, res, next) => {
    const verifyToken = req.params.token
    const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken)
    
    if (userFromToken) {
        await repositoryUsers.updateVerify(userFromToken.id, true)
        res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { message: 'success' } })
        
    } else {
        res
        .status(HttpCode.BAD_REQUEST)
        .json({ status: 'success', code: HttpCode.OK, data: {message: 'invalid token'} })
    }
}

const repeatEmailForVerifyUser = async (req, res, next) => {
 
    const { email } = req.body
    const user = await repositoryUsers.findByEmail(email)
    if (user) {
        const { email, verificationToken, verified } = user

        if (verified === true) {
            return res
                    .status(HttpCode.CONFLICT)
                    .json({
                        status: 'error',
                        code: HttpCode.CONFLICT,
                        data: { message: "This email has already been verified" }
                    })
        }

        const emailService = new EmailService(process.env.NODE_ENV, new SenderSendgrid())
        const isVerifyEmailSent = await emailService.sendVerifyEmail(email, emailToName.process(email), verificationToken)

        if (isVerifyEmailSent) {
                return res.status(HttpCode.OK).json({
                status: 'OK',
                code: HttpCode.OK,
                data: { isVerifyEmailSent: isVerifyEmailSent }
            })
        }
        return res
        .status(HttpCode.UE)
        .json({
            status: 'error',
            code: HttpCode.UE,
            data: { message: "Could not send an email" }
        })
    } else {
        return res
        .status(HttpCode.NOT_FOUND)
        .json({
            status: 'error',
            code: HttpCode.NOT_FOUND,
            data: { message: "User with this email was not found" }
        })
    }
}

export {
    uploadAvatar,
    verifyUser,
    repeatEmailForVerifyUser
}