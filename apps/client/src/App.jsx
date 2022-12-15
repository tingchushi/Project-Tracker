import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login';
import Layout from '../layout/Layout';
import Registration from './components/SignUp';
import Projectpage from "./components/Projectpage";
import Overview from "./components/Overview";

function App() {

  const info = JSON.parse(localStorage.getItem('token'))
    console.log(info)

  return (  
    <div>
    
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Registration />} /> 
        {info == null ? <Route path='/' element={<Login />} />: <Route path='/*' element={<Projectpage />} /> }
        {info == null ? <Route path='/' element={<Login />} />: <Route path='/overall' element={<Overview />} /> }
        <Route path="/*" element={<Login />} />
      </Route>
     </Routes>
    </BrowserRouter>

  
    </div>
  );
}

export default App;

//https://www.youtube.com/watch?v=J01rYl9T3BU&t=5846s