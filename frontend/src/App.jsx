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
  const {activeMenu,setCurrentColor, setCurrentMode, currentMode,  currentColor, themeSettings, setThemeSettings,isLogedin,setIsLogedIn}=useStateContext();
  return (
    <main className={currentMode === 'Dark' ? 'dark' : 'light'}  style={{ minHeight: '100%' }}>
       
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/LogOut" element={<LogOut/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/AddStore" element={<Add_Store/>}/>
        <Route path="/AddCoupon" element={<Add_Coupon/>}/>

        <Route path="/*" element={
          <div className="app-container ">
                <Tooltip title="Settings" placement="top">
                <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="settings-button"
              >
                <FiSettings />
              </button>
                </Tooltip>
            
               <div className={
                    activeMenu 
                      ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen w-full'  
                      : 'dark:bg-main-dark-bg bg-main-bg w-full min-h-screen max-w-full'
                }> 
                    <div >  
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar  w- max-w-full  ">
                            <NavBar />
                        </div>
                    </div>
                    {activeMenu && (
                        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white top-20 left-0 z-10 " style={{height:'80vh'}}>
                            <SideBar />
                        </div>
                    )}
                </div>
        </div>}/>

        <Route path="/DashBoard/*" element={<DashBoard className="w-full"/>} />
      </Routes>
      
    </main>
  );
}

export default App;
