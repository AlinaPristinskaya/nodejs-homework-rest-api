const Contacts= require('../repository/index')

const getContacts= async (req, res, next) => {
    try{
      const contacts= await Contacts.listContacts()
      res.json({ status: 'success', code: 200, data: {contacts} })
    }catch(error){
      next(error)
    }
    
  }
  
  const getContact=  async (req, res, next) => {
    try{
      const contact= await Contacts.getContactById(req.params.contactId)
      if(contact){
        return res.status(200).json({status:'success', code:200, data:{contact}})
  
      }    
      return res.status(404).json({status:'error', code:404, message:"Not found"})
  
      
      
    }catch(error){
      next(error)
    }
  }
  
  const saveContacts= async (req, res, next) => {
    try{
      const contact= await Contacts.addContact(req.body)
      
      if (!contact.name||!contact.email||!contact.phone){
        return res.status(400).json({status:'error', code:400,data:{contact}})
      }
      return res.status(200).json({ status: 'success', code: 201, data: {contact} })
      
    }catch(error){
      next(error)
    }
  }
  
  
  const removeContact= async (req, res, next) => {
    try{
      const contact=await Contacts.removeContact(req.params.contactId)
      if(contact){
        return res.status(200).json({status:'success',code:200, message: "contact deleted"})
      }
      return res.status(404).json({status:'error', code:404, message:'Not found'})
    }
    catch(error){
      next(error)
    }
  }
  
  
  
  const updateContact= async (req, res, next) => {
    try{
      const body= (req.body.name &&req.body.email&&req.body.phone)
      if(!body){
        return res.status(400).json({status:'error', code:400, message:"missing fields"})
  
      }    
        const contact= await Contacts.updateContact(req.params.contactId, req.body)
        if (contact){
        return res.status(200).json({ status: 'success', code: 200, data: {contact} })
  
      } return res.status(404).json({status:'error', code:404, message:"Not found"})
  
      
      
    }catch(error){
      next(error)
    }
  }
  
  const updateStatusContact= async (req, res, next) => {
    try {
      console.log(req.method);
      const contact = await Contacts.updateStatusContact(req.params.contactId, req.body.favorite);
      if (contact) {
        return res
          .status(200)
          .json({ status: "succes", code: 200, data: { contact } });
      }
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not Found" });
    } catch (error) {
      next(error);
    }
  }

  module.exports={getContacts,getContact,saveContacts,removeContact,updateContact,updateStatusContact}