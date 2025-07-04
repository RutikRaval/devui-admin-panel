import React from 'react'
import './sidebar.css'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
const sidebarItems = [
  { label: "Dashboard", path: "/dashboard/home" },
  { label: "Users", path: "/dashboard/users" },
  { label: "Settings", path: "/dashboard/settings" }, 
];


  return (
    <aside className='sidebar'>
      <div className='logo d-flex align-items-center justify-content-between'>
        <span>DevUI</span>
        <i className="fa-solid fa-bars"></i>
      </div>

      <nav className='nav'>
        {sidebarItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
          >
            <span className='icon'>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar;
