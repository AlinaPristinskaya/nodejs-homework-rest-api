const express = require('express')
const router = express.Router()
const Contacts= require('../../model')

router.get('/', async (req, res, next) => {
  try{
    const contacts= await Contacts.listContacts()
    res.json({ status: 'success', code: 200, data: {contacts} })
  }catch(error){
    next(error)
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  try{
    const contact= await Contacts.addContact(req.body)
    if (!contact.name||!contact.email||!contact.phone){
      return res.status(400).json({status:'error', code:400,data:{contact}})
    }
    res.status(201).json({ status: 'success', code: 201, data: {contact} })
    
  }catch(error){
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  try{
    const body= (req.body.name||req.body.email||req.body.phone)
    if(!body){
      return res.status(400).json({status:'error', code:400, message:"missing fields"})

    }    
      const contact= await Contacts.updateContact(req.params.contactId, req.body)
      if (contact){
      return res.status(201).json({ status: 'success', code: 201, data: {contact} })

    } return res.status(404).json({status:'error', code:404, message:"Not found"})

    
    
  }catch(error){
    next(error)
  }
})

module.exports = router
