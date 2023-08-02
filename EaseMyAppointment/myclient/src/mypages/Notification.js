import React from 'react';
import Layout from '../mycomponents/Layout';
import { Tabs, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {showLoading, hideLoading} from '../redux/features/alertSlice';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const Notification = () => {
    const dispatch= useDispatch()
    const navigate=useNavigate();
    const {user}= useSelector((state)=>state.user);
    const HandleRead=async ()=>{
     try{
       dispatch(showLoading())
         const res= await axios.post('/getallnotification',{
            userId:user._id,
        },
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
         dispatch(hideLoading())
         if(res.data.success){
            message.success(res.data.message)
         }
         else{
            message.error(res.data.message)
         }
     }
     catch(err){
        dispatch(hideLoading());
        console.log(err)
        message.error('Something went wrong')
     }
    };
    const HandleDelete=async()=>{
        try {
            dispatch(showLoading());
            const res = await axios.post(
              '/deleteallnotification',
              { userId: user._id },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(hideLoading());
            if (res.data.success) {
              message.success(res.data.message);
            } else {
              message.error(res.data.message);
            }
          } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Somthing Went Wrong In Ntifications");
          }
    };
  return (
  <Layout>
   <h3 className='p-2 text-center'>Notification Pannel</h3>
   <Tabs>
    <Tabs.TabPane tab="UnRead" key={0}>
        <div className='d-flex justify-content-end'>
        <h5 className='p-2 text-primary' onClick={HandleRead}>
        Mark all as read</h5>
        </div>
        
           { user?.notification.map((notificationMsg)=>(
                <div className="card" 
                style={{cursor:'pointer'}}
                >
                    <div className="card-text" onClick={()=> navigate(notificationMsg.onClickPath)}
                    >
                        {notificationMsg.message}
                    </div>
                </div>
           ))  }
    </Tabs.TabPane>

    <Tabs.TabPane tab="Read" key={1}>
        <div className='d-flex justify-content-end'>
        <h5 
        className='p-2 text-primary'  style={{cursor:'pointer'}} onClick={HandleDelete}>
        Delete all read</h5>
        </div>
        { user?.seennotification.map((notificationMsg)=>(
                <div className="card" 
                style={{cursor:'pointer'}}
                >
                    <div className="card-text" 
                    onClick={()=>navigate(notificationMsg.onClickPath)}
                    >
                        {notificationMsg.message}
                    </div>
                </div>
           ))  }
    </Tabs.TabPane>
   </Tabs>
    </Layout>
  )
}

export default Notification;