const doctorModel= require('../models/docModel');


const DoctorInfoController=async(req,res)=>{

    try{
        const doctor= await doctorModel.findOne({userId:req.body.userId})
         res.status(200).send({
            success:true,
            message:'success',
            data:doctor
         });
          
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

const UpdateProfileController=async(req,res)=>{
   try{
                const doctor= await doctorModel.findOneAndUpdate({userId:req.body.userId},
                    req.body);
       res.status(201).send({
        success:true,
        message:'Updated',
        data:doctor,
       });
   }
   catch(err){
    console.log(err)
    res.status(500).send({
        success:false,
        message:'Issue',
        err
    })
   }

}

const DoctorByIdController=async(req,res)=>{

    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
        res.status(200).send({
          success: true,
          message: "Single Doc Info Fetched",
          data: doctor,
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

module.exports= {DoctorInfoController,
    DoctorByIdController,UpdateProfileController};