const {Schema, model,SchemaTypes}=require('mongoose')


const contactSchema= new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  })

const Contact = model('contact', contactSchema)

module.exports=Contact