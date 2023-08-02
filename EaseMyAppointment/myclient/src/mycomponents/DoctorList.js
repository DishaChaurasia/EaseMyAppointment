import React from 'react'
import { useNavigate } from "react-router-dom";


const DoctorList = ({doctor}) => {
    const navigate = useNavigate();
  return (
    <>
    <div className='card m-3' style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/bookappointment/${doctor._id}`)} >
    <div className='crad-header'>
        Dr. {doctor.fName} {doctor.lName}
    </div>
<div className='card-body'>
    <p>
        <b>Specialization</b> {DoctorList.specialization}
    </p>
    <p>
    <b>Experience</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Cunsaltation</b> {doctor.fees}
          </p>
          <p>
            <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
</div>
    </div>
    </>
  )
}

export default DoctorList