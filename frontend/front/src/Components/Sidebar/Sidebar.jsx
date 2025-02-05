import React from 'react';
import { FaHome, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import './Sidebar.css';
import { MdOutlineProductionQuantityLimits, MdBorderColor } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';

const Sidebar = ({ open, setOpen, userId }) => {
  const SidebarData = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <FaHome />,
      cName: 'nav-text'
    },
    {
      title: 'About',
      path: '/about',
      icon: <MdBorderColor />,
      cName: 'nav-text'
    },
    userId && {
      title: 'Products',
      path: '/products',
      icon: <MdOutlineProductionQuantityLimits />,
      cName: 'nav-text'
    },
    userId && {
      title: 'Orders',
      path: '/orders',
      icon: <MdBorderColor />,
      cName: 'nav-text'
    },
    userId && {
      title: 'Orders Calendar',
      path: '/orderscalendar',
      icon: <SlCalender />,
      cName: 'nav-text'
    },
    userId && {
      title: 'Add User',
      path: '/add-user',
      icon: <FaUserPlus />,
      cName: 'nav-text'
    }
  ].filter(Boolean); // Remove null values if userId is not present

  const showSidebar = () => setOpen(!open);
  const closeSidebar = () => setOpen(false);

  const handleOutsideClick = (event) => {
    if (open && !event.target.closest('.nav-menu')) {
      closeSidebar();
    }
  };

  React.useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  return (
    <div>
      <div className='py-3 px-3' open={open} onClose={closeSidebar}>
        <nav className={open ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle pt-3'>
              <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>ERP SYSTEM</span>
              <Link to='#' className='menu-bars'>
                <IoMdClose onClose={closeSidebar} style={{ fontSize: '30px', position: "absolute", right: "8px", top: "32px" }} />
              </Link>
            </li>
            <hr style={{ color: "white" }} />
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
