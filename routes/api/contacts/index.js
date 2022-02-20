import { Router } from 'express'
import repositoryContacts from '../../../repository/contacts'
import { validateCreate, validateUpdate, validateId, validateFavorite } from './validation'
import { listContacts, getContactById, createContact, removeContact, updateContact, updateFavorite } from '../../../controllers/contacts'

import guard from '../../../middlewares/guard' 

const router = new Router()

router.get('/', guard, listContacts)

router.get('/:id', [guard, validateId], getContactById)

router.post('/', [guard, validateCreate], createContact)

router.delete('/:id', [guard, validateId], removeContact)

router.put('/:id', [guard, validateId, validateUpdate], updateContact)

router.patch('/:id/favorite', [guard, validateId, validateFavorite], updateFavorite)

export default router
