const {Schema, model}=require('mongoose')
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const crypto = require('crypto');
const SALT_FACTOR=6

const userSchema= new Schema({
    
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        avatar:{
          type:String,
          default:function(){
            return gravatar.url(
              this.email,{s:'250'},true
            )
          }
        },
        idUserCloud: { type: String, default: null },
        //  Email verify
        // Изначально любой зарегестрированный пользователь не верифицирован - false
        isVerified: { type: Boolean, default: false },
        // но у него есть для верификации токен генерируемый по умолчанию в db.
        verifyTokenEmail: {
          type: String,
          required: true,
          default: crypto.randomUUID(),
        },
      
  })
userSchema.pre('save',async function(next){
  if (this.isModified('password')){
    const salt=await bcrypt.genSalt(SALT_FACTOR)
    this.password=await bcrypt.hash(this.password, salt)
  }
})

userSchema.methods.isValidPassword=async function(password){
  return bcrypt.compare(password, this.password)
}
const User = model('user', userSchema)

module.exports=User