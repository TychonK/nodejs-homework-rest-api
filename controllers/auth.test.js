import { jest } from '@jest/globals'
import { registration } from './auth'
import HttpCode from "../lib/constants"

import authService from '../service/auth'

// jest.mock('../service/auth')

describe('Unit test registration', () => {

    let req, res, next

    beforeEach(() => {
        req = { body: { email: 'test@test.com', password: 'lolekek' } }
        res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) }
        next = jest.fn()
        authService.create = jest.fn(async (data) => data)
    })

    test('Signup new user', async () => {
        authService.userExists = jest.fn(async () => false)
        await registration(req, res, next)
        expect(authService.userExists).toHaveBeenCalledWith(req.body.email)
        expect(res.status).toHaveBeenCalledWith(HttpCode.CREATED)
    })
    test('Signup user exists', async () => {
        authService.userExists = jest.fn(async () => true)
        await registration(req, res, next)
        expect(authService.userExists).toHaveBeenCalledWith(req.body.email)
        expect(res.status).toHaveBeenCalledWith(HttpCode.CONFLICT)
    })
    test('Signup database error', async () => {
        const testError = new Error('Database error')
        authService.userExists = jest.fn(async () => {throw testError})
        await registration(req, res, next)
        expect(authService.userExists).toHaveBeenCalledWith(req.body.email)
        expect(next).toHaveBeenCalledWith(testError)
    })
})
