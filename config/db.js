const mongoose=require("mongoose")
require('dotenv').config()


const uri = process.env.URI_DB


const db = mongoose.connect(uri, {
     useNewUrlParser: true,
      useUnifiedTopology: true })


mongoose.connection.on('connected',()=>{
  console.log('Database connection successful')
}) 
mongoose.connection.on('error',(err)=>{
  console.log(`${err.message}`)
  process.exit(1)
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    console.log('Connection for DB closed')
    process.exit()
})

/* client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */

module.exports=db