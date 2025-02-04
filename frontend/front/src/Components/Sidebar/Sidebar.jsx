import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import './Sidebar.css';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { MdBorderColor } from 'react-icons/md';
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
    userId ? {
      title: 'Products',
      path: '/products',
      icon: <MdOutlineProductionQuantityLimits />,
      cName: 'nav-text'
    } :{
      title: 'Products',
      path: '/',
      icon: <MdOutlineProductionQuantityLimits />,
      cName: 'nav-text'
    },
    userId ? 
    {
      title: 'Orders',
      path: '/orders',
      icon: <MdBorderColor />,
      cName: 'nav-text'
    } :{
      title: 'Orders',
      path: '/',
      icon: <MdBorderColor />,
      cName: 'nav-text'
    },
    userId ?
    {
      title: 'Orders Calendar',
      path: '/orderscalendar',
      icon: <SlCalender />,
      cName: 'nav-text'
    }:{
      title: 'Orders Calendar',
      path: '/',
      icon: <SlCalender />,
      cName: 'nav-text'
    }
  ];

  const showSidebar = () => setOpen(!open);

  const closeSidebar = () => {
    setOpen(false);
  };


  //click outside and sidebar closedown
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

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open]);

  return (
    <div>
      <div className='py-3 px-3' open={open} onClose={closeSidebar}>
        <nav className={open ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle pt-3'>

              <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>ERP SYSTEM</span>
              <Link to='#' className='menu-bars'>
                <IoMdClose onClose={closeSidebar} style={{ fontSize: '30px',position:"absolute",right:"8px" , top:"32px"}} />
              </Link>
            </li>
            <hr style={{color:"white"}}/>
            {SidebarData.map((item, index) => (
              item && (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
