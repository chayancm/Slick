/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route ,Outlet} from 'react-router-dom';
import { NavBar, Footer, SideBar, ThemeSettings, Header } from '../components/';
import { Tooltip } from 'antd';
import { Categories, Add_Admin, Edit_Admin, Add_Category, Edit_Category, ColorPicker, Ecommerce, Login } from './';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import { FiSettings } from 'react-icons/fi';

import RequireAuth from './RequireAuth';
const DashBoardLayout=()=>{
  const {
    activeMenu,
    onLogin,
    setOnLogin,
    isLogedin,
    setCurrentColor,
    setCurrentMode,
    currentMode,
    currentColor,
    themeSettings,
    setThemeSettings,
    setIsLogedin,
    isAdmin
  } = useStateContext();

  return (
            <div className="flex relative dark:bg-main-dark-bg w-full top-0 left-0" style={{ height: '100%',width: '100%' }}>
              {isLogedin && (
                <div className="fixed right-4 bottom-4" style={{ zIndex: '10000' }}>
                  <Tooltip title="Settings" placement="top">
                    <button
                      type="button"
                      onClick={() => setThemeSettings(true)}
                      style={{ background: currentColor, borderRadius: '50%' }}
                      className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                      <FiSettings />
                    </button>
                  </Tooltip>
                </div>
              )}

                <div className={
                    activeMenu 
                      ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen w-full'  
                      : 'dark:bg-main-dark-bg bg-main-bg w-full min-h-screen max-w-full'
                }> 
                    {/* Introduce a new wrapper */}
                    <div >  
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar  w- max-w-full  ">
                            <NavBar />
                        </div>

                        <div className={activeMenu ? 'ml-64 flex flex-row justify-center items-center max-w-full ' : ' flex flex-row justify-center items-center max-w-full '}>
                            <Outlet  />
                        </div>
                    </div>

                    {activeMenu && (
                        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white top-20 left-0 z-10 " style={{height:'80vh'}}>
                            <SideBar />
                        </div>
                    )}
                </div>

            </div>
  )
}




const DashBoard = () => {
  return (
    <Routes>
      
        <Route path="/" element={<DashBoardLayout />}>
          <Route index element={<Ecommerce />} />
          <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
          <Route path="Add_User" element={<Add_Admin />} />
          <Route path="Edit_User" element={<Edit_Admin />} />
          </Route>
          <Route path="ColorPicker" element={<ColorPicker />} />
          <Route element={<RequireAuth allowedRoles={["ADMIN","EDITOR"]}/>}>
          <Route path="Add_category" element={<Add_Category />} />
          <Route path="Edit_category" element={<Edit_Category />} />
          <Route path="Categories" element={<Categories />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default DashBoard;
