import { Router } from 'express'
import repositoryContacts from '../../../repository/contacts'
import { validateCreate, validateUpdate, validateId, validateFavorite } from './validation'

const router = new Router()

router.get('/', async (req, res, next) => {
  const contacts = await repositoryContacts.listContacts()
  res.status(200).json( contacts )
})

router.get('/:id', validateId, async (req, res, next) => {
  const { id } = req.params
  const contact = await repositoryContacts.getContactById(id)
  contact ? res.status(200).json(contact) : res.status(404).json({ message: "Not found" })
})

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await repositoryContacts.addContact(req.body)
  res.status(201).json(newContact)
})

router.delete('/:id', validateId, async (req, res, next) => {
  const { id } = req.params
  const contact = await repositoryContacts.removeContact(id)
  contact ? res.status(200).json({message: "contact deleted"}) : res.status(404).json({ message: "Not Found" })
})

router.put('/:id', validateId, validateUpdate, async (req, res, next) => {
  const { id } = req.params
  const contact = await repositoryContacts.updateContact(id, req.body)
  contact ? res.status(200).json(contact) : res.status(404).json({ message: "Not Found" })
})

router.patch('/:id/favorite', validateId, validateFavorite, async (req, res, next) => {
  const { id } = req.params
  const contact = await repositoryContacts.updateFavorite(id, req.body)
  contact ? res.status(200).json( contact ) : res.status(404).json({message: "Not found"})
})

export default router
