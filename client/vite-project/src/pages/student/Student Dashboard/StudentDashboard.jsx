import React, { useState } from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import SideBar from '../../../components/SideBar/SideBar';

const StudentDashboard = () => {
    const [toggle, setToggle] = useState(false);

  return (
    <div>
      <NavBar toggle={toggle} setToggle={setToggle} name="student" />
      <SideBar />
    </div>
  )
}

export default StudentDashboard
