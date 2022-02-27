import { Router } from 'express'
import { registration, login, logout } from '../../../controllers/users'
import { } from './validation'
import guard from '../../../middlewares/guard'

const router = new Router()

router.post('/signup', registration)
router.post('/login', login)
router.post('/logout', guard, logout)

export default router
