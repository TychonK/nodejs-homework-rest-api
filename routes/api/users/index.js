import { Router } from 'express'
import { uploadAvatar, verifyUser, repeatEmailForVerifyUser } from '../../../controllers/users'
import guard from '../../../middlewares/guard'
import { upload } from '../../../middlewares/upload'
import { validateRepeatVerification } from './validation'

const router = new Router()

router.get('/verify/:token', verifyUser)
router.post('/verify', validateRepeatVerification, repeatEmailForVerifyUser)

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar)

export default router
