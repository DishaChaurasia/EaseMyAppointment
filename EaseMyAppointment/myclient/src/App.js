
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './mypages/Home';
import Signin from './mypages/Signin';
import Signup from './mypages/Signup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Spinner from './mycomponents/Spinner';
import Protected from './mycomponents/Protected';
import Public from './mycomponents/Public';
import Apply from './mypages/Apply';
import Notification from './mypages/Notification';
import Users from './mypages/people/Users';
import Doctors from './mypages/people/Doctors';
import Profile from './mypages/doctor/Profile';
import Booking from './mypages/Booking';
import Appointments from './mypages/Appointments';

axios.defaults.baseURL="http://localhost:7000";


function App() {
  const {loading }= useSelector((state)=>state.alerts);
  return (
   <>
     <BrowserRouter>
     {loading ? (

     <Spinner/>
     ):(
     
      <Routes>
        <Route path='/' element ={
          <Protected>
 <Home />
          </Protected>
        }
       />
      <Route
              path="/applydoctor"
              element={
                <Protected>
                  <Apply />
                
                </Protected>
              }
            />
             <Route
              path="/notification"
              element={
                <Protected>
                  <Notification/>
                
                </Protected>
              }
            />
            
            <Route
              path="/doctor/profile/:id"
              element={
                <Protected>
                <Profile/>
                
                </Protected>
              }
            />
       
        <Route path='/login' element ={
       <Public>
        <Signin/>
        </Public>
        }/>
        <Route path='/people/users' element ={
       <Protected>
        <Users/>
        </Protected>
        }/>
         <Route path='/people/doctors' element ={
        <Protected>
        <Doctors/>
        </Protected>
        }/>

<Route path='/doctor/bookappointment/:doctorId' element ={
        <Protected>
        <Booking/>
        </Protected>
        }/>

        <Route path='/register' element ={
          <Public>
        <Signup/>
        </Public>
        } />
        <Route path='/appointments' element ={
          <Protected>
        <Appointments/>
        </Protected>
        } />
        
      </Routes>
      )}
    </BrowserRouter>
   </>
  );
}

export default App;
