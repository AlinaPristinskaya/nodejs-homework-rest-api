const express = require('express')
const router = express.Router()
const{getContact,getContacts,removeContact,saveContacts,updateContact,updateStatusContact}=require('../../controllers/contacts')
const {validateContact, validateId}= require('./validation')
const guard=require('../../helpers/guard')


router.get('/',guard, getContacts )

router.get('/:contactId',guard, validateId, getContact  )

router.post('/',guard,validateContact, saveContacts )

router.delete('/:contactId',guard, validateId, removeContact )

router.put('/:contactId',guard,validateContact, updateContact )

router.patch("/:contactId/favorite",guard, updateStatusContact);



module.exports = router
