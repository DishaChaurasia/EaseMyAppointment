const express= require('express');
const colors=require('colors');
const cors=require('cors');
const morgan = require('morgan');
const dotenv= require('dotenv');
const db = require('./configurations/db');
const app= express();
const authMiddleware = require('./middlewares/auth');

app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000',
    }
));

const {signinController, signupController, 
    authController, DoctorController, 
    NotificationController, DeleteNotificationController, GetDoctorListController, BookAppointmentController, BookingAvailabilityController, UserAppointmentController, UpdateStatusController }
     = require('./controllers/userCtrl');
const { UsersController, DoctorsController, ChangeAccStatus } = require('./controllers/adminCtrl');
const { DoctorInfoController, UpdateProfileController, DoctorByIdController } = require('./controllers/doctorCtrl');


dotenv.config();

db();

app.use(express.json());
app.use(morgan('dev'));

// app.use("/api/v1/user",require("./routes/userRoutes"));
app.post('/login',signinController);
app.post('/register',signupController);
app.post('/getUserData',authMiddleware,authController);
app.post('/applydoctor',authMiddleware,DoctorController);

app.post('/getallnotification',authMiddleware,NotificationController);
app.post('/deleteallnotification',authMiddleware,DeleteNotificationController);


app.get('/getallusers',authMiddleware,UsersController);
app.get('/getalldoctors',authMiddleware,DoctorsController);
app.post('/changeaccstatus',authMiddleware,ChangeAccStatus);

app.post('/getdocinfo',authMiddleware,DoctorInfoController);
app.post('/updateprofile',authMiddleware,UpdateProfileController);

app.get('/getalldoctorslist',authMiddleware,GetDoctorListController);
app.post('/getdoctorbyid',authMiddleware,DoctorByIdController);

app.post('/bookappointment',authMiddleware,BookAppointmentController);
app.post('/bookingavailability',authMiddleware,BookingAvailabilityController);
app.get('/userappointment',authMiddleware,UserAppointmentController);

app.post('/updatestatus',authMiddleware,UpdateStatusController);


const port=process.env.PORT || 7000;
app.listen(port,()=>{
    console.log(
        colors.white(`Server running on ${process.env.NODE_MODE} Mode on port number ${process.env.PORT}`)
    );
});
