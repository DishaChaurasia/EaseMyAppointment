import {Form, Input,message } from 'antd';
import '../styling/Signup.css';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';


const Signin = () => {
  const navigate=useNavigate();
  const dispatch= useDispatch()
  const onFinish = async(values) => {
    try{
      dispatch(showLoading())
      const res= await axios.post('/login', values);
      window.location.reload();
      dispatch(hideLoading())
              if(res.data.success){
                localStorage.setItem("token",res.data.token);
    message.success('Logged in Successfully :)');
     navigate('/');
   // return <Navigate to={'/'}/>;
 
}
else{
message.error(res.data.message);
}
    }
   catch(err){
    dispatch(hideLoading())
          console.log(err)
          message.error('Something went wrong');

   }
  };
  
  return (
    <>
    
       < div className='form-class'>
<Form 
layout="vertical" onFinish={onFinish} 
className='inner-form'>
<center><h3>Login Form</h3></center>
 
  <Form.Item label="Email" name="email">
    <Input required/>
  </Form.Item>
  <Form.Item label="Password" name="password">
    <Input type="password" required/>
  </Form.Item>
  
  <button className='btn btn-primary' type="submit">Login</button>
  <Link to="/register" >Not registered yet? Click here to Register</Link>
</Form>
       </div>
    </>
  )
}

export default Signin;