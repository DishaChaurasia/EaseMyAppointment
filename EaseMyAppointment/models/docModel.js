const mongoose= require('mongoose')

const docSchema= new mongoose.Schema({
    userId:{
     type:String,
    },
    fName:{
        type: String,
        required:[true,'First name is required']
    },
    lName:{
        type:String,
        required:[true,'Last name is required']
    },
  phone:{
    type:String,
    required:[true, 'Phone number is required']
  },
  email:{
    type:String,
   // required:[true, 'email is required']
  },
  website:{
    type:String,
  },
  address:{
    type:String,
    required:[true, 'address is required']
  },
  specialization:{
    type:String,
    required:[true, ' specialization is required']
  },
  experience:{
    type:String,
    required:[true, 'experience is required']
  },
  fees:{
    type:Number,
    required:[true, 'fees is required']
  },
  status:{
          type:String,
          default:'pending'
  },
  timings:{
    type:Object,
    required:[true, 'work timing is required']

  },
},
{timestamps:true}
)
const docModel= mongoose.model('doctors',docSchema)


module.exports=docModel