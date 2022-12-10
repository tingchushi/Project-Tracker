import React, { useState } from "react";
import Icon, {
  EllipsisOutlined,
  GlobalOutlined,
  HomeOutlined,
  MessageOutlined,
  NotificationOutlined,
  PlaySquareOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Sidebar() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  
  const navigate =useNavigate(); 
  
useEffect(()=>{
  if(JSON.parse(localStorage.getItem('token')) === null ){
    navigate('/') ;
  } else {
    const info = JSON.parse(localStorage.getItem('token'));
    const id = info.token;
    // console.log(id)
      fetch(`user/search/${id}`, {
          method: "GET",
        })
        .then((response) =>  response.json())
        .then((data) => {
            setFirstName(data.firstname)
            setLastName(data.lastname)
    
        });   
    }
},[])
  
  const handleLogout = () =>{
    localStorage.clear();
    alert("Logout Successfully")
    navigate('/')
}

  function SidebarOption({ text, name, tag }) {
    
    return (
      <div className="sidebar-option">
        <Icon className="sidebar-icon" component={name} size="medium" />
        <h2>{text}</h2> 
      </div>
    );
  }

  return (
    <div className="sidebar">
      {lastName === ''? '': <div style={{textAlign: 'left', paddingLeft:'10px', fontFamily:"Zen Dots, cursive", fontSize:"14px", width:'100%'}}>Welcome<br /> {lastName} , {firstName}</div>}
      <SidebarOption text="Home" name={HomeOutlined} />
      <SidebarOption text="Profile" name={UserOutlined} />
      <div onClick={handleLogout}>
        <SidebarOption text="Logout" onClick={handleLogout} name={UserOutlined} />
      </div>
      
      {/* <SidebarOption text="Notify" name={NotificationOutlined} />
      <SidebarOption text="News" name={ReadOutlined} />
      <SidebarOption text="Videos" name={PlaySquareOutlined} />
      <SidebarOption text="Explore" name={GlobalOutlined} />
      <SidebarOption text="More" name={EllipsisOutlined} /> */}
    </div>
  );
}

export function MiniSidebar() {
  function SidebarOption({ text, name, tag }) {
    return (
      <div className="sidebar-option">
        <Icon className="sidebar-icon" component={name} size="medium" />
        <h3 style={{ paddingTop: "23px" }}>{text}</h3>
      </div>
    );
  }
  return (
    <div className="mini-sidebar">
      <SidebarOption text="Home" name={HomeOutlined} />
      <SidebarOption onClick={handleLogout} name={UserOutlined} />
      {/* <SidebarOption text="Notify" name={NotificationOutlined} />
      <SidebarOption text="News" name={ReadOutlined} />
      <SidebarOption text="Videos" name={PlaySquareOutlined} />
      <SidebarOption text="Explore" name={GlobalOutlined} />
      <SidebarOption text="More" name={EllipsisOutlined} /> */}
    </div>
  );
}