import Joi from "joi";

const repeatVerifySchema = Joi.object({
    email: Joi.string().email().required(),
})

export const validateRepeatVerification = async (req, res, next) => {
    try {
        const value = await repeatVerifySchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({message: err.message.replace(/"/g, '')})
    }
    next()
}