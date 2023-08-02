const JWT =require('jsonwebtoken');
const cors = require('cors');;
module.exports=async(req,res,next)=>{
    try{ 
        cors()(req, res, () => {});
        const token=req.headers['authorization'].split(" ")[1];
    JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err)
        {
            console.log('Error during token verification:', err);
            return res.status(200).send({
                message:'Auth Failed',
                success:false,
            });
        }
        else{
            console.log('Decoded token payload:', decode);
            req.body.userId=decode.id;
            next();
        }
    })
}catch(err){
    console.log(err)
    res.status(401).send({
        success:false,message:'Auth Failed',
    });
}
};