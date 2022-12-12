import React from 'react';
import {
CDBSidebar,
CDBSidebarContent,
CDBSidebarFooter,
CDBSidebarHeader,
CDBSidebarMenu,
CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
return (
<div className='w3-sidebar w3-light-grey w3-bar-block' style={{ left:'0', top:'0', height: '100vh', float:'left', position:'fixed', overflow: 'scroll initial' }}>
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
      <a
      href="/"
      className="text-decoration-none"
      style={{ color: 'inherit' }}
      >
      Sidebar
      </a>
      </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
        <NavLink exact ="/login" className="activeClicked">
        <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
        </NavLink>
        <div exact ="/dashboard" >
        <CDBSidebarMenuItem icon="table" href='/dashboard'><a href="/dashboard" style={{color:'white', textDecoration:'none', cursor:'pointer', }}>Tables</a></CDBSidebarMenuItem>
        </div>
        {/* <NavLink exact ="/profile" className="activeClicked">
        <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
        </NavLink> */}
        <NavLink exact ="/analytics" className="activeClicked">
        <CDBSidebarMenuItem icon="chart-line">
        Analytics
        </CDBSidebarMenuItem>
        </NavLink>
        <NavLink
        exact
        ="/*"
        target="_blank"
        className="activeClicked"
        >
        <CDBSidebarMenuItem icon="exclamation-circle">
        404 page
        </CDBSidebarMenuItem>
        </NavLink>
        </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
        style={{
        padding: '20px 5px',
        }}
        >
        Sidebar Footer
        </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
);
};
export default Sidebar;