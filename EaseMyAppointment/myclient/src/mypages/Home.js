import React,{useEffect,useState} from 'react';
import axios from 'axios'
import Layout from '../mycomponents/Layout';
import { Row } from 'antd';
import DoctorList from '../mycomponents/DoctorList';


const Home = () => {

  const[doctors,setDoctors] =useState([])
        const getUSerData=async()=>{
          try{
            const res= await axios.get('/getalldoctorslist', {
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

useEffect(()=>{
  getUSerData();
},[]);

  return (
    <Layout>
     <h1 className='text-center'>Home Page</h1>
    <Row>
      {doctors && doctors.map(doctor=>(
           <DoctorList doctor={doctor}  />   
      
      ))}
    </Row>
     </Layout>
    
  );
};


export default Home;