import React from 'react'
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
function Logout() {
    const handleLogout = () =>{
        localStorage.clear();
        alert("Logout Successfully")
    }
  
    return (
    <div>
       <SidebarOption text="Messages" name={MessageOutlined} />
    </div>
  )
}

export default Logout
