const userModel= require('../models/userModels')
const bcrypt =require('bcryptjs')
const jwt= require('jsonwebtoken')
const docModel= require('../models/docModel')
const appointmentModel= require('../models/appointmentModel')
const moment=require('moment');

const signupController =async(req,res)=>{
    try{
        const existingUser= await userModel.findOne({email:req.body.email});
        if(existingUser){
          return res.status(200)
          .send({success:false,message:"User already exists "});
        }
        const password=req.body.password;
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        req.body.password= hashedPassword;

        const newUser= new userModel(req.body);
        await newUser.save()
        res.status(201).send({success:true,message:"Registered Successfully"});
    
  }
  catch(err){
      console.log(err)
      res
      .status(500)
      .send({
        success:false,message:`SignUp Controller ${err.message}`
    });
  }

     
};

const signinController=  async(req,res)=>{
         try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user)
        {
          return res.status(200).send({message:'User not found',success:false});
        }
        const isMatch= await bcrypt.compare(req.body.password,user.password);
         if(!isMatch){
          return res.status(200).send({message:'Invalid email or password',success:false});
         }
         const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    res.status(200).send({message:"Successfully Logged in",success:true,token});
         }
         catch(err){
          console.log(err)
          res.status(500).send({message:`Error in Login ${err.message}`})
         }
};

const authController=async(req,res)=>{
      try{
        const userId = req.body.userId;
        const user = await userModel.findById(userId);
        user.password = undefined;
        if (!user) {
          return res.status(404).send({
            success: false,
            message: 'User not found',
          });
        }
    
        // User found, return user data or perform other actions.
      else{  return res.status(200).send({
          success: true,
          data:user,
        });
      }
      } catch (err) {
        console.log('Error fetching user data:', err);
        return res.status(500).json({
          success: false,
          message: 'Server Error',
        });
      }
    };
    
 const DoctorController =async(req,res)=>{
   
  try {
    const newDoctor = await docModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.fName} ${newDoctor.lName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.fName + " " + newDoctor.lName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "An Error occurred",
    });
  }
 } 
    
 const NotificationController=async(req,res)=>{
  try{
 const user= await userModel.findOne({_id:req.body.userId});
 const seennotification= user.seennotification;
 const notification=user.notification;
 seennotification.push(...notification);
 user.notification=[];
 user.seennotification=notification;
 const updatedUser= await user.save();
 res.status(200).send({
  success:true,
  message:'Mark as read',
  data:updatedUser,
 });
  }
  catch(err){
        console.log(err)
        res.status(500).send({
          message:'Error',
          success:false,
          err,
        });
  }

 };
    
  const DeleteNotificationController=async(req,res)=>{
      try{
    const user= await userModel.findOne({_id:req.body.userId})
    user.notification=[]
    user.seennotification=[]
    const updatedUser=await user.save()
    updatedUser.password=undefined;
   res.status(200).send({
    success: true,
    message:'Notification deleted successfully',
    data:updatedUser,
   })
      }
      catch(err){
        console.log(err)
        res.status(500).send({
          success:false,
          message:'Unable to  delete notifications',
          err
        })
      }
      

  };
    
  const GetDoctorListController=async(req,res)=>{
    try {

      const doctors = await docModel.find({ status: "approved" });
      res.status(200).send({
        success: true,
        message: "Docots Lists Fetched Successfully",
        data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Errro while Fetching DOcotr",
      });
    }
  }
    
const BookAppointmentController=async(req,res)=>{
          
  try {
    req.body.date= moment(req.body.date,'DD-MM-YYYY').toISOString();
    req.body.time=moment(req.body.time,'HH:mm').toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.aboutDoctor.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new Appointment Request from ${req.body.aboutUser.username}`,
      onCLickPath: "/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Booked succesfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error ",
    });
  }
}

const BookingAvailabilityController=async(req,res)=>{
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm")
    .add(1, "hours")
    .toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error In Booking",
    });
  }
}

const UserAppointmentController=async(req,res)=>{
 try{
    const appointments= await appointmentModel
    .find({userId:req.body.userId,});
    res.status(200).send({
      success:true,
      message:'Successfully fetched',
      data:appointments,
    });
 }
 catch(err){
    console.log(err);
    
      res.status(500).send({
        success:false,
        err,
        message:'Error'
      })
    
  }
};

const UpdateStatusController=async(req,res)=>{
 try{
      const {appointmentsId, status}=req.body
      const appointments= await appointmentModel.findByIdAndUpdate(
        appointmentsId,{status}
      )
      const user = await userModel.findOne({ _id: appointmentsId.userId });
      const notification=user.notification;
    notification.push({
      type: "status updated",
      message: `updated ${status}`,
      onCLickPath: "/userappointments",
    });
    await user.save();
    res.status(200).send({
      success:true,
      message:'status updated'
       }   )
 }
 catch(err){
  console.log(err)
 res.status(500).send({
   success:false,
   err,
   message:'Error'
 })
  
 }
}

module.exports= {signinController,signupController,
  authController,DoctorController, NotificationController
,DeleteNotificationController,
BookAppointmentController,GetDoctorListController,
BookingAvailabilityController,
UserAppointmentController,UpdateStatusController};
