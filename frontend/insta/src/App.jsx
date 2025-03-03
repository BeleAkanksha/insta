import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Home from './pages/Home'
import './App.css'

const App = () => {
  
  return (
    
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} /> 
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
      </div>
    
  )
}

export default App
