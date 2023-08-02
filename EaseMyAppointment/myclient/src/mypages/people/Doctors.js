import React ,{ useEffect, useState } from 'react';
import Layout from '../../mycomponents/Layout';
import axios from "axios";
import { message,Table } from "antd";

const Doctors = () => {
const [doctors, setDoctors] = useState([]);
  //getUsers
  const getDoctors = async () => {
    try {
      const res = await axios.get('/getalldoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const HandleStatus=async(record,status)=>{
    try {
        const res = await axios.post(
          "/changeaccstatus",
          { doctorId: record._id, userId: record.userId, status: status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          message.success(res.data.message);
          window.location.reload();
        }
      } catch (err) {
        message.error("Something Went Wrong");
      }
  }
  useEffect(() => {
    getDoctors();
  }, []);

 
  const cols = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_text, record) => (
        <span>
          {record.fName} {record.lName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-success" onClick={()=>HandleStatus(record,'approved')}>Approve</button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Doctors</h1>
      <Table columns={cols} dataSource={doctors} />
    </Layout>
  );
};


export default Doctors;