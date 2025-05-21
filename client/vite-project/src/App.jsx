import React from 'react'
import Login from './components/Authentication/Login/Login'
import Signup from './components/Authentication/Signup/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/admin/admin';
import Student from './pages/student/student';
import ForgetPassword from './components/Authentication/Forget Password/forgetPassword';
import NavBar from './components/NavBar/NavBar';

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
      </Routes> */}

      <NavBar />
    </div>
  )
}

export default App
