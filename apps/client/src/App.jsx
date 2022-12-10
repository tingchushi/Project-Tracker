import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login';
import Layout from '../layout/Layout';
import Registration from '../src/components/SignUp';
import Dashboard from '../src/components/Dashboard';
import Projectpage from "./components/Projectpage";

function App() {
  const [selectedProject, setSelectedProject] = useState('')
  console.log(selectedProject)
  return (  
    <div>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path='/dashboard' element={<Dashboard />} /> 
        <Route path='/main' element={<Projectpage />} />
        <Route path="/*" element={<Layout />} />
      </Route>
     </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;

//https://www.youtube.com/watch?v=J01rYl9T3BU&t=5846s