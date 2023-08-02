import React, { useState, useEffect }  from 'react';
import Layout from '../mycomponents/Layout';
import axios from "axios";
import moment from "moment";
import { Table } from "antd";

const Appointments = () => {

    const [appointments, setAppointments] = useState([]);
    const getAppointments = async () => {
        try {
          const res = await axios.get('/userappointment', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (res.data.success) {
            setAppointments(res.data.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        getAppointments();
      }, []);

 const HandleStatus=()=>{
    
 }

      const cols = [
        {
          title: "ID",
          dataIndex: "_id",
        },
        
        {
          title: "Date & Time",
          dataIndex: "date",
          render: (text, record) => (
            <span>
              {moment(record.date).format("DD-MM-YYYY")} &nbsp;
              {moment(record.time).format("HH:mm")}
            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
        },
        {
            title: "Actions",
          dataIndex: "actions",
          render:(text,record)=>(
             <div className='d-flex'>
                {record.status==='pending'&&(
                    <div className='d-flex'>
                    <button className='btn btn-success' onClick={()=>
                    HandleStatus(record,'approved')}>Approve</button>
                     <button className='btn btn-danger' onClick={()=>
                    HandleStatus(record,'reject')}>Reject</button>
                    </div>
                )}
             </div>
          )
          
        }
      ];
  return (
    <Layout>
        <h1>Appointments</h1>
        <Table columns={cols} dataSource={appointments} />
    </Layout>
  )
}

export default Appointments