import React, { useEffect } from 'react';
import {
CDBSidebar,
CDBSidebarContent,
CDBSidebarFooter,
CDBSidebarHeader,
CDBSidebarMenu,
CDBSidebarMenuItem,
} from 'cdbreact';
import { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate();

  let info1 = 0;
  if(JSON.parse(localStorage.getItem('token')) === null ){
    redirect('/login') ; 
  } else {
    const info = JSON.parse(localStorage.getItem('token'));
    let info1 = (Object.values(info)[0])
    
    useEffect(()=> { 
      fetch(`user/search/${info1}`, {
        method: "get",
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Bad status code from server.');
        } 
        
        console.log(response.status)
        return response.json();
      })
      
      .then((data) => {
        setData(data);
      });
      
    },[])
  }

  const handleClick = () => {
    localStorage.clear();
    window.location = "/";
  }

return (
<div className='w3-sidebar w3-light-grey w3-bar-block' style={{ left:'0', top:'0', height: '100vh', float:'left', position:'fixed', overflow: 'scroll initial' }}>
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
      <a
      hef={info1 === null? '/' : "/main"}
      className="text-decoration-none"
      style={{ color: 'inherit' }}
      >
      <p style={{color:'white', justifyContent:'center', justifyItem:'center', textAlign:'center', paddingLeft:'3px', paddingTop:'0px'}}>
        <p>{data.firstname}  {data.lastname}</p>
      </p>
      </a>
      </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
        <div href={'/main'} >
        <CDBSidebarMenuItem icon="table"><a href="/overall" style={{color:'white', textDecoration:'none', cursor:'pointer', }}>Overview</a></CDBSidebarMenuItem>
        </div>
        <div href={'/main'} >
        <CDBSidebarMenuItem icon="table"><a href="/main" style={{color:'white', textDecoration:'none', cursor:'pointer', }}>Dashboard</a></CDBSidebarMenuItem>
        </div>
        <div href={'/main'} >
        <CDBSidebarMenuItem icon="table" href="/main" style={{color:'white', textDecoration:'none', cursor:'pointer' }} onClick={handleClick}>Logout</CDBSidebarMenuItem>
        </div>
        </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
        style={{
        padding: '20px 5px',
        }}
        >
  
        </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
);
};
export default Sidebar;