import Joi from "joi";
import { joiPassword } from 'joi-password'

const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: joiPassword.string().min(6).noWhiteSpaces().required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const validateSignup = async (req, res, next) => {
    try {
        const value = await signupSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({message: err.message.replace(/"/g, '')})
    }
    next()
}

export const validateLogin = async (req, res, next) => {
    try {
        const value = await loginSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({message: err.message.replace(/"/g, '')})
    }
    next()
}