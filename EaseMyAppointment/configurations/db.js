const mongoose= require('mongoose')

const colors= require('colors')

const db= async()=>{
    try{
         await mongoose.connect(process.env.MONGO_URL)
         console.log(colors.white(`Mongodb successfully connected ${mongoose.connection.host}`))
    }
    catch(err){
        console.log(colors.red(`Server Issue ${err}`))
    }
};

module.exports= db;