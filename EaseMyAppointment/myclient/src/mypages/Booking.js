import React,{useState,useEffect} from 'react';
import Layout from '../mycomponents/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker,message } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Booking = () => {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [doctors, setDoctors] = useState([]);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
   const [isAvailable, setIsAvailable] = useState(false);
    const dispatch = useDispatch();
        const getUSerData=async()=>{
          try{
            const res= await axios.post('/getdoctorbyid',
             { doctorId: params.doctorId }, {
              headers:{
                Authorization: "Bearer " + localStorage.getItem('token'),
              },
            
            });  
            if(res.data.success){
              setDoctors(res.data.data)
            }
          }catch (err)
          {
            console.log(err)
          }
        };

        const HandleAvailability=async()=>{
          try {
            dispatch(showLoading());
            const res = await axios.post(
              "/bookingavailability",
              { doctorId: params.doctorId, date, time },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(hideLoading());
            if (res.data.success) {
              setIsAvailable(true);
              console.log(isAvailable);
              message.success(res.data.message);
            } else {
              message.error(res.data.message);
            }
          } catch (err) {
            dispatch(hideLoading());
            console.log(err);
          }
        }
        

        const HandleBooking = async () => {
            try {
              setIsAvailable(true);
              if(!date && !time){
                return alert("Date & time is required")
              }
              dispatch(showLoading());
              const res = await axios.post(
                '/bookappointment',
                {
                  doctorId: params.doctorId,
                  userId: user._id,
                aboutDoctor : doctors,
                 aboutUser : user,
                  date: date,
                  time: time,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              dispatch(hideLoading());
              if (res.data.success) {
                message.success(res.data.message);
              }
            } catch (err) {
              dispatch(hideLoading());
              console.log(err);
            }
          };
        

useEffect(()=>{
  getUSerData();
    //eslint-disable-next-line
},[]);
  return (
   <Layout>
    <h1>Booking Page</h1>
    <div className='container m-3'>
        {doctors &&(
            <div>
            <h3>Dr {doctors.fName} {doctors.lName}
            </h3>
            <h4>Fees :{doctors.fees}</h4>
            <h4>
              Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
            <div className='d-flex flex-column w-25'>
                <DatePicker className='m-2'

                 format="DD-MM-YYYY"
                     onChange={(value) =>{
                     
                      setDate(moment(value).format("DD-MM-YYYY"))
                      }

                     }
                />
                <TimePicker className='m-2'
                 format="HH:mm" 
                  onChange={(value) => 
                 
                 {   
                
                    setTime(moment(value).format("HH:mm"));
                  
                  }}
                />
                <button className="btn btn-primary mt-2" 
                onClick={HandleAvailability}>
                Check Availability
              </button>
              
              <button className="btn btn-dark mt-2" onClick={HandleBooking}>
                Book Now
                </button>
              
            </div>
            </div>
        )}
    </div>
   </Layout>
  )
}

export default Booking