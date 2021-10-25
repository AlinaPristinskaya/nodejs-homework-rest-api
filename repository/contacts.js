
const Contact=require('../model/contact')




const listContacts = async (userId) => {
  const result=await Contact.find({owner:userId}).populate({
    path:'owner',
    select:'email'
  }) 
  return result
}

const getContactById = async (contactId, userId) => {
  const result=await Contact.findOne({_id:contactId,owner:userId}).populate({
    path:'owner',
    select:'email'
  })
  return result
}

const removeContact = async (contactId,userId) => {
  const result= await Contact.findOneAndRemove({_id:contactId,owner:userId})
  return result
}

const addContact = async (body) => {
  const result= await Contact.create(body)
  return result

}

const updateContact = async (contactId, body, userId) => {
  console.log(contactId, body)
  const result=await Contact.findOneAndUpdate(
    {_id:contactId, owner:userId},
    {...body},
    {new:true})
   return result
}

const updateStatusContact=async(contactId, body,userId)=>{
  console.log(contactId, body)
  const result=await Contact.findOneAndUpdate(
    {_id:contactId,owner:userId},
    {favorite:!body},
    {new:true})
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
