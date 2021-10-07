const Joi=require('joi')

const patterns={
    name:/[a-zA-Zа-яА-Я]*$/,
    phone: /^(?:\+\s?\d+\s?)?(?:\(\d{1,4}\))?(?:[-\s./]?\d){5,}$/,
    
}
const schemaContact=Joi.object({
    "name": Joi.string().pattern(patterns.name).min(1).max(30).required(),
    "email": Joi.string().email().required(),
    "phone": Joi.string().pattern(patterns.phone).required()
})



const validate= async(schema,obj,res,next)=>{
try {
    await schema.validateAsync(obj)
    next()
}
catch (err) {
    console.log(err)
    res.status(400).json({statys:'error',code:400,message:`Field ${err.message.replace(/"/g,'')}`})
 }}

 module.exports.validateContact=async(req,res,next)=>{
     return await validate(schemaContact,req.body, res,next)
 }

