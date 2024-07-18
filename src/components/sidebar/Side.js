import React, { useState, useEffect } from 'react';
// import './sidebar.css';
import  './sidebar.css'
import { MdOutlineWidgets } from 'react-icons/md';
import { NavLink, useLocation } from 'react-router-dom';

// const activeLink = (({isActive})=>isActive ? 'active' : '' )

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const sidebarWidth = isSidebarOpen ? '20%' : '0';

  useEffect(() => {
    setIsSidebarOpen(false); // Close the sidebar when the location changes
  }, [location.pathname]);

  // Check if the current location matches the provided path
  const isPathActive = (path) => {
    return location.pathname === path;
  };



  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ width: sidebarWidth }}>
      <div className='sidebar-up'>
        <div id='sidebar-icon' onClick={toggleSidebar}>
        <MdOutlineWidgets size={30} className='sidebar-logo' />
        </div>
        {isSidebarOpen && (
          <div className='sidebar-route'>
            <ul className='sidebar-list'>
            <li id='directory' className={isPathActive('/') ? 'active' : ''}>
            <NavLink to='/' id='Link' >
              <p>Mathematics</p>
              </NavLink>  
                </li>
              
              <NavLink to='/English' id='Link' >
                <li id='directory' className={isPathActive('/English') ? 'active' : ''}>
                  
                  <p>Use Of English</p>
                </li>
              </NavLink>
              {/* <NavLink to='/Physics' id='Link' >
                <li id='directory' className={isPathActive('/Physics') ? 'active' : ''}>
                  
                  <p>Physics</p>
                </li>
              </NavLink>
              <NavLink to='/Chemistry' id='Link' >
                <li id='directory' className={isPathActive('/Chemistry') ? 'active' : ''}>
                  
                  <p>Chemistry</p>
                </li>
              </NavLink>
              <NavLink to='/Biology' id='Link'>
                <li id='directory' className={isPathActive('/Biology') ? 'active' : ''}>
                
                  <p>Biology</p>
                </li>
              </NavLink>
              <NavLink to='/Crs' id='Link' >
                <li id='directory' className={isPathActive('/Crs') ? 'active' : ''}>
                 
                  <p>CRS</p>
                </li>
              </NavLink>
              <NavLink to='/Economics' id='Link'>
                <li id='directory' className={isPathActive('/Economics') ? 'active' : ''}>
                  
                  <p>Economics</p>
                </li>
              </NavLink>
              <NavLink to='/Commerce' id='Link' >
                <li id='directory' className={isPathActive('/Commerce') ? 'active' : ''}>
                  
                  <p>Commerce</p>
                </li>
              </NavLink>
              <NavLink to='/Government' id='Link' >
                <li id='directory' className={isPathActive('/Government') ? 'active' : ''}>
                  
                  <p>Government</p>
                </li>
              </NavLink> */}
            </ul>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Sidebar;
