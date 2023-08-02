import React from 'react'
import {Form, Input,message } from 'antd';
import '../styling/Signup.css';
import { Link,Navigate,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Signup = () => {
     
    const navigate= useNavigate()
    const dispatch= useDispatch()
  const onFinish =async (values) => {
      try{
        dispatch(showLoading())
        const res= await axios.post('/register', values);
        dispatch(hideLoading())
                if(res.data.success){
      message.success('Registered Successfully :)');
       navigate('/login');
     // return <Navigate to={'/login'}/>;
   
 }
 else{
  message.error(res.data.message);
 }
    }
    catch(err){
      dispatch(hideLoading())
      console.log(err);
      message.error('Something went wrong');
    }
  };
    return (
        <>
            < div className='form-class'>
<Form 
layout="vertical" onFinish={onFinish} 
className='inner-form'>
<center><h3>Registration Form</h3></center>
  <Form.Item label="Username" name="username">
    <Input required/>
  </Form.Item>
  <Form.Item label="Email" name="email">
    <Input required/>
  </Form.Item>
  <Form.Item label="Password" name="password">
    <Input type="password" required/>
  </Form.Item>
  
  <button className='btn btn-primary' type="submit">Register</button>
  <Link to="/login" >Already registered? Click here to Login</Link>
</Form>
       </div>
        </>
    )
}

export default Signup;