import React from 'react'
import Login from './components/Authentication/Login/Login'
import Signup from './components/Authentication/Signup/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Student from './pages/student/Student';
import ForgetPassword from './components/Authentication/Forget Password/ForgetPassword';
import NavBar from './components/NavBar/NavBar';
import AdminSideBar from './components/Admin SideBar/AdminSideBar'
import AdminDashboard from './pages/admin/Admin Dashboard/AdminDashboard';
import AdminPage from './components/AdminPage/AdminPage'

const App = () => {
  return (
    <div>

      {/* <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Admin />} />
        <Route path='/student/login' element={<Student />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/student' element={<Student />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Routes> */}

      {/* <NavBar /> */}
      {/* <AdminSideBar /> */}
      <AdminDashboard />
      {/* <AdminPage /> */}
    </div>
  )
}

export default App
