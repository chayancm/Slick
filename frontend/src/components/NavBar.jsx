/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Tooltip } from 'antd';
import { UserProfile } from '.'; // Assuming UserProfile component exists
import { Link, NavLink } from 'react-router-dom';
import { DashBoard, Login, Register,LogOut,Add_Coupon,Add_Store } from '../pages' // Assuming pages exist 
import App from '../App';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import '../style/NavBar.css'
const Navbar = () => {
  let clicked = false;
  const { 
    currentColor, 
    activeMenu, 
    setActiveMenu, 
    handleClick, 
    isClicked, 
    setScreenSize, 
    screenSize, 
    isLogedin
  } = useStateContext(); 
  const navigate = useNavigate();

  // ... useEffect logic remains the same ...

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="navbar pl-8"> 
        <button 
          className="navbar-menu-button" 
          onClick={handleActiveMenu}
          
        >
          <AiOutlineMenu className='text-2xl' />
        </button> 
      <NavLink to={'/'} key={App} className="navbar-link">
              Home
            </NavLink>
      <div className="navbar-items"> 
        {!isLogedin && (
          <> 
            <NavLink to={'/Login'} key={Login} className="navbar-link">
              Login
            </NavLink>
            <NavLink to={'/Register'} key={Register} className="navbar-link">
              Register
            </NavLink>
          </>
        )}

        {isLogedin && (
          <>
          <NavLink to={'/AddCoupon'} key={Add_Coupon} className="navbar-link">
              Add Coupon
            </NavLink>
          <NavLink to={'/AddStore'} key={Add_Store} className="navbar-link">
              Add Store
            </NavLink>
          <NavLink to={'/DashBoard'} key={DashBoard} className="navbar-link">
            DashBoard
          </NavLink>
          <NavLink to={'/LogOut'} key={LogOut} className="navbar-link">
           Logout
          </NavLink>
          </>
        )}

        {isLogedin && ( 
          <Tooltip title="Profile" placement="bottom" className='pr-8 pt-4 pl-4'>
            <div 
              className="navbar-profile"
              onClick={() => handleClick('userProfile')}
            >
              <img
                className="h-8 w-8 rounded-full object-cover border-2 border-white"
                src="../img.png"
                alt="user-profile"
              />
              <MdKeyboardArrowDown />
            </div>
          </Tooltip>
        )}

        {isClicked.UserProfile && <UserProfile />}   
      </div>
    </div>
  );
};

export default Navbar;
