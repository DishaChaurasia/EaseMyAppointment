
import React from 'react'
import Layout from '../mycomponents/Layout';
import {Form, Row,Col,Input, TimePicker,message} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import axios from 'axios';
import moment from 'moment';

const Apply = () => {

  const {user}= useSelector(state=>state.user)
   const dispatch=useDispatch()
   const navigate= useNavigate()

    const HandleFinish= async(values)=>{
      try{
        dispatch(showLoading())
        const res= await axios.post('/applydoctor',{...values,userId:user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
          dispatch(hideLoading())
          if(res.data.success){
            message.success(res.data.message)
            navigate('/')
          }
          else
          {
            message.error(res.data.success)
          }
      }
    
      catch(err) {
        dispatch(hideLoading())
        console.log(err)
        
        message.error('Something went wrong')
      }
    }
     
  return (
   <Layout>
        <h1 className='text-center'>Apply Doctor</h1>
        <Form layout="vertical" onFinish={HandleFinish} className='m-4'>
        <h4 >Personal details : </h4>
         <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='First Name' name='fName' 
            required rules={[{require:true}]}>
              <Input type='text' placeholder='first name'/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Last Name' name='lName' 
            required rules={[{require:true}]}>
              <Input type='text' placeholder='last name'/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Phone' name='phone' 
            required rules={[{require:true}]}>
              <Input type='String' placeholder='phone number'/>
            </Form.Item>
          </Col> <Col xs={24} md={24} lg={8}>
            <Form.Item label='Email' name='email' 
           >
              <Input type='text' placeholder='your email'/>
            </Form.Item>
          </Col> 
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Address' name='address' 
            required rules={[{require:true}]}>
              <Input type='text' placeholder='your clinic address'/>
            </Form.Item>
          </Col>
          </Row>
          <h4 >Professional details :</h4>
          <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
          
        
          
            <Form.Item label='Website' name='website' 
            required rules={[{require:true}]}>
              <Input type='text' placeholder='your website'/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Specialization' name='specialization' 
            required rules={[{require:true}]}>
              <Input type='text' placeholder='enter your specialization'/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Experience' name='experience' 
            required rules={[{require:true}]}>
              <Input type='text' placeholder='About your experience'/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Consultant Fees' name='fees' 
            required rules={[{require:true}]}>
              <Input type='Number' placeholder='fees per patient'/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Timings' 
            name='timings' 
            required rules={[{required:true}]}>

             <TimePicker.RangePicker format="HH:mm"/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className='btn btn-primary form-btn' type='submit'>
              Submit
            </button>
          </Col>
         </Row>
        
        </Form>
        </Layout>
    
    
  );
};

export default Apply;