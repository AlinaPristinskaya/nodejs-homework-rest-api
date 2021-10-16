const express = require('express')
const router = express.Router()
const{getContact,getContacts,removeContact,saveContacts,updateContact,updateStatusContact}=require('../../controllers/contacts')
const {validateContact, validateId}= require('./validation')



router.get('/', getContacts )

router.get('/:contactId',validateId, getContact  )

router.post('/',validateContact, saveContacts )

router.delete('/:contactId', validateId, removeContact )

router.put('/:contactId',validateContact, updateContact )

router.patch("/:contactId/favorite", updateStatusContact);



module.exports = router
