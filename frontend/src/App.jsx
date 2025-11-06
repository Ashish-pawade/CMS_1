import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Screens/Login'
import StudentHome from './Screens/Student/Home'
import HostelDetails from './Screens/Student/HostelDetails'

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/student' element={<StudentHome/>} />
        <Route path='/student/hostel' element={<HostelDetails/>} />
      </Routes>
    </Router>
  )
}
