import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import NewEdit from './pages/NewEdit'
import Login from './pages/Login'
import { useState } from 'react'
import Update from './pages/update'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [user, setUser] = useState({
    name:''
  })
// console.log(user);
  useEffect(()=>{
    if(localStorage.getItem("user")){
    
      setUser({name:localStorage.getItem("user")})
    
    }
  },[])
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' index element={user?.name ? <Home/> : <Navigate to="/login"/>}/> 
      <Route path='/action' element={user?.name ?<NewEdit/> : <Navigate to="/login"/>}/> 
      <Route path='/login' element={user?.name ? <Navigate to="/"/> :<Login user={user} setUser={setUser}/>}/> 
      <Route path='/update/:id' element={user?.name ? <Update/> :<Login setUser={setUser}/>}/> 
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  )
}

export default App