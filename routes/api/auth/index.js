import { Router } from 'express'
import { registration, login, logout } from '../../../controllers/users'
import { } from './validation'
import guard from '../../../middlewares/guard'

import { validateLogin, validateSignup } from './validation'

const router = new Router()

router.post('/signup', validateSignup, registration)
router.post('/login', validateLogin, login)
router.post('/logout', guard, logout)

export default router
