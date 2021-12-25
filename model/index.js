import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import contacts from './contacts.json'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  return contacts
}

const getContactById = async (contactId) => {
  const contact = contacts.find((contact) => contact.id == contactId)
  return contact
}

const removeContact = async (contactId) => {
  const conatctExists = await getContactById(contactId)
  if (!conatctExists) {
    return null
  }

  const contactsAfterRemoval = contacts.filter((contact) => contact.id != contactId)
  await fs.writeFile(contactsPath, JSON.stringify(contactsAfterRemoval, null, 2))
  return contactsAfterRemoval
}

const addContact = async (body) => {
  const newContact = { id: randomUUID(), ...body };
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (contactId, body) => {
  const conatctExists = await getContactById(contactId)
  if (!conatctExists) {
    console.log(chalk.yellow('No contact with such ID found'));
    return
  }

  const index = contacts.findIndex((contact) => contact.id === contactId)
  const updatedContact = { id: contactId, ...body };

  contacts[index] = newContact
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return updatedContact
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
