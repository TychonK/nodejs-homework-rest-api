import HttpCode from "../lib/constants"
import repositoryContacts from '../repository/contacts'

const listContacts = async (req, res, next) => {
    const { id: userId } = req.user
    const contacts = await repositoryContacts.listContacts(userId)
    res.status(200).json({ status: 'success', code: HttpCode.OK, data: contacts } )
}

const getContactById = async (req, res, next) => {
    const { id: userId } = req.user
    const { id } = req.params
    const contact = await repositoryContacts.getContactById(userId, id)
    contact ? res.status(200).json(contact) : res.status(404).json({ message: "Not found" })
}

const createContact = async (req, res, next) => {
    const { id: userId } = req.user
    const newContact = await repositoryContacts.addContact(userId, req.body)
    res.status(201).json(newContact)
}

const removeContact = async (req, res, next) => {
    const { id: userId } = req.user
    const { id } = req.params
    const contact = await repositoryContacts.removeContact(userId, id)
    contact ? res.status(200).json({message: "contact deleted"}) : res.status(404).json({ message: "Not Found" })
}

const updateContact = async (req, res, next) => {
    const { id: userId } = req.user
    const { id } = req.params
    const contact = await repositoryContacts.updateContact(userId, id, req.body)
    contact ? res.status(200).json(contact) : res.status(404).json({ message: "Not Found" })
}

const updateFavorite = async (req, res, next) => {
    const { id: userId } = req.user
    const { id } = req.params
    const contact = await repositoryContacts.updateFavorite(userId, id, req.body)
    contact ? res.status(200).json( contact ) : res.status(404).json({message: "Not found"})
}

export { listContacts, getContactById, createContact, removeContact, updateContact, updateFavorite }