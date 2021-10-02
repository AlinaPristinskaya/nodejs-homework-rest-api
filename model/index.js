// const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const crypto=require('crypto')
const DB= require('./db')
const db= new DB('contacts.json')

const listContacts = async () => {
  return await db.read()
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  const contacts= await db.read()
  if(!body.name || !body.email || !body.phone){
  return ({"message": "missing required name field"})  
  }
  const newContact={id:crypto.randomUUID(),...body}
  contacts.push(newContact)
  await db.write(contacts)
  return newContact

}

const updateContact = async (contactId, body) => {
  const contacts= await db.read()
  const index=contacts.findIndex((contact)=>contact.id===contactId)
  if(index!==-1){
    const contact= contacts[index]
    contacts[index]={...contact,...body}
    await db.write(contacts)
    return contacts[index]
  }
  return null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
