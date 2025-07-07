import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../services/store';
import {
  HiOutlineFolder,
  HiOutlineGlobe,
  HiOutlineHome,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineCode
} from 'react-icons/hi';
import { IoLogOutOutline, IoLanguage } from "react-icons/io5";
import { RxComponent2 } from "react-icons/rx";
import './sidebar.css';

const Sidebar = () => {
  const { collapse, openSidebar, closeSidebar } = useStore();
  const [openSubmenus, setOpenSubmenus] = useState({});

  const navigate = useNavigate()
  const location = useLocation().pathname.split('/');
  const path = location[location.length - 1]

  console.log(path);

  // Toggle submenu visibility
  const toggleSubmenu = (id) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: <HiOutlineHome />
    },
    {
      id: 'category',
      label: 'Category',
      icon: <HiOutlineFolder />,
      subItems: [
        { label: 'Add Category', path: '/dashboard/addcategory' },
        { label: 'All Category', path: '/dashboard/showallcategory' }
      ]
    },
    {
      id: 'language',
      label: 'Language',
      icon: <IoLanguage />,
      subItems: [
        { label: 'Add Language', path: '/dashboard/addlanguage' },
        { label: 'All Language', path: '/dashboard/showalllanguage' }
      ]
    },
    {
      id: 'component',
      label: 'Component',
      icon: <RxComponent2 />,
      subItems: [
        { label: 'Add Component', path: '/dashboard/addcomponent' },
        { label: 'All Component', path: '/dashboard/showallcomponent' }
      ]
    }
  ];
  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/', { replace: true })
  }
  return (
    <div
      className={`sidebar ${collapse ? 'expanded' : 'collapsed'}`}
      onMouseEnter={openSidebar}
      onMouseLeave={closeSidebar}
    >
      <div className="sidebar-header">
        <div className="logo-icon">DevUI</div>
        <div className={`logo-text ${collapse ? 'visible' : 'hidden'}`}>
          Admin Panel
        </div>
      </div>

      <div className="sidebar-items">
        {sidebarItems.map((item) => (
          <div key={item.id}>
            {/* Parent item */}
            {item.subItems ? (
              <div
                className={`sidebar-item ${path.includes(item.id) ? 'active' : ''} parent-item`}
                onClick={() => collapse && toggleSubmenu(item.id)}
              >
                <div className="item-icon">{item.icon}</div>
                <div className={`item-label ${collapse ? 'visible' : 'hidden'}`}>
                  {item.label}
                </div>
                {collapse && (
                  <div className="submenu-icon">
                    {openSubmenus[item.id] ?
                      <HiOutlineChevronDown /> :
                      <HiOutlineChevronRight />
                    }
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                className="sidebar-item"
                activeClassName="active"
                style={{ textDecoration: 'none' }}
                end
              >
                <div className="item-icon">{item.icon}</div>
                <div className={`item-label ${collapse ? 'visible' : 'hidden'}`}>
                  {item.label}
                </div>
              </NavLink>
            )}

            {/* Sub-items */}
            {collapse && item.subItems && openSubmenus[item.id] && (
              <div className="submenu">
                {item.subItems.map((subItem, index) => (
                  <NavLink
                    key={index}
                    to={subItem.path}
                    className="submenu-item"
                    activeClassName="active"
                    style={{ textDecoration: 'none' }}
                    end
                  >
                    <div className="item-icon"></div>
                    <div className="item-label visible">
                      {subItem.label}
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-toggle">
        {
          !collapse ? <IoLogOutOutline className='logout-icon' /> : (
            <div className='w-100'>
              <button className='w-100 btn border' onClick={handleLogout}>Logout</button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Sidebar;