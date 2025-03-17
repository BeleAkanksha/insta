import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Home from './pages/Home'
import Logout from './pages/Logout'
import './App.css'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CreatePost from './pages/CreatePost'

const App = () => {
  
  return (
    
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          } />
          <Route path="/create-post" element={
            <UserProtectedWrapper>
              <CreatePost />
            </UserProtectedWrapper>
          } />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </div>
    
  )
}

export default App
