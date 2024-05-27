/* eslint-disable no-unused-vars */
import React ,{useEffect, useState}from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { Tooltip } from 'antd';
import {NavBar, Footer,SideBar,ThemeSettings,Header} from './components'
import {Categories,Add_Admin, Edit_Admin,Add_Category,Edit_Category, ColorPicker, Ecommerce,Login,DashBoard,Register, LogOut,Add_Store,Add_Coupon} from './pages'
import { useStateContext } from './contexts/ContextProvider';
import axios from 'axios';
import './style/App.css'
function App() {

  useEffect(()=>{
    function cleanupExpiredLocalStorage() {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
    
        if (item && item.expiry && new Date().getTime() > item.expiry) {
          localStorage.removeItem(key);
        }
      }
    }
    
    cleanupExpiredLocalStorage();

  },[])
  useEffect(()=>{
    function getIsLoggedInFromLocalStorage() {
      const storedValue = localStorage.getItem('isLogedIn');
    
      if (storedValue) {
        const storedData = JSON.parse(storedValue);
        console.log(storedData.value);
        if (storedData.expiry && new Date().getTime() > storedData.expiry) {
          localStorage.removeItem('isLogedIn'); 
          return false; 
        } else {
          return storedData.value; 
        }
      } else {
        return false; 
      }
    }
    getIsLoggedInFromLocalStorage()
  },[])

  const {activeMenu,setCurrentColor, setCurrentMode, currentMode,  currentColor, themeSettings, setThemeSettings,isLogedin,setIsLogedIn}=useStateContext();
  return (
    <main className={currentMode === 'Dark' ? 'dark' : 'light'}  style={{ minHeight: '100%',minWidth:'100%' }}>
       
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/DashBoard/*" element={<DashBoard className="w-full"/>} />
      </Routes>
      
    </main>
  );
}

export default App;
