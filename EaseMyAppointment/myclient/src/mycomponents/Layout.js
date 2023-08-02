import React from 'react'
import '../styling/Layout.css';
import { AdminMenu, UserMenu } from './../mydata/data';
import {Link,useLocation, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {message,Badge} from 'antd';

const Layout = ({children}) => {
  const {user} =useSelector(state=>state.user)
  const location = useLocation();
  const navigate= useNavigate()
const handleLogout=()=>{
  localStorage.clear()
  message.success('Logout Successfully')
   navigate('/login')
}

 const DoctorMenu=[
  {
      name:'  Home',
      path:'/',
      icon:"fa-solid fa-house"
  },
  {
      name:'  User Profile',
      path:`/doctor/profile/${user?._id}`,
      icon:'fa-solid fa-user'
  },
  user?.approved
    ? {
        name: 'Apply Doctor',
        path: '/applydoctor',
        icon: 'fa-solid fa-stethoscope'
      }
    : null,
  {
      name:'  Appointments',
      path:'/appointments',
      icon:"fa-solid fa-list"
  },
  
 
];

  const SidebarMenu= user?.isAdmin?
   AdminMenu
  : user?.isDoctor? DoctorMenu: UserMenu;

  return (
   <>
    <div className='main'>
        <div className='layout'>
            <div className="sidebar">
           <div className="logo">
            <h6>EaseMyAppointment</h6>
            <hr/>
           </div>
           <div className="menu">
            {SidebarMenu.filter((menu) => menu !== null).map(menu=>{
              const isValid= location.pathname===menu.path;
              return(
                <>
                  <div className={`menu_items ${isValid && "valid"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                </>
              );
            })}
            <div className={`menu_items `} onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <Link to="/login"> Logout</Link>
                  </div>
           </div>
            </div>
            <div className="content">
    <div className="header">
    <div className="header_content" style={{cursor:'pointer'}}>
    <Badge count={user && user.notification.length} 
    onClick={()=>{
      navigate('/notification');
    }}  >
     <i class="fa-solid fa-bell"></i>
     </Badge>
     <Link to='/userprofile'>{user?.username}</Link>
     </div>
    </div>
    <div className="body">{children}</div>
            </div>
        </div>
    </div>
   </>
  );
};


export default Layout;