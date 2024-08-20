/* eslint-disable no-unused-vars */
import { Tooltip } from "antd";
import React from "react";
import { FiSettings } from "react-icons/fi";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar, SideBar } from "../components/";
import { useStateContext } from "../contexts/ContextProvider";
import {
  Add_Admin,
  Add_Category,
  Add_Coupon,
  Add_Store,
  Categories,
  ColorPicker,
  Coupons,
  Ecommerce,
  Edit_Admin,
  Edit_Category,
  Edit_Store,
  LogOut,
  Register,
  Stores,
} from "./";

import RequireAuth from "./RequireAuth";
const DashBoardLayout = () => {
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
    isAdmin,
  } = useStateContext();

  return (
    <div
      className="flex relative dark:bg-main-dark-bg w-full top-0 left-0"
      style={{ height: "100%", width: "100%" }}
    >
      {isLogedin && (
        <div className="fixed right-4 bottom-4" style={{ zIndex: "10000" }}>
          <Tooltip title="Settings" placement="top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </Tooltip>
        </div>
      )}

      <div
        className={
          activeMenu
            ? "dark:bg-main-dark-bg bg-main-bg min-h-screen w-full"
            : "dark:bg-main-dark-bg bg-main-bg w-full min-h-screen max-w-full"
        }
      >
        <div>
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar  w- max-w-full  ">
            <NavBar />
          </div>

          <div
            className={
              activeMenu
                ? "ml-64 flex flex-row justify-center items-center max-w-full "
                : " flex flex-row justify-center items-center max-w-full relative"
            }
          >
            <Outlet />
          </div>
        </div>

        {activeMenu && (
          <div
            className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white top-20 left-0 z-10 "
            style={{ height: "80vh" }}
          >
            <SideBar />
          </div>
        )}
      </div>
    </div>
  );
};

const DashBoard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoardLayout />}>
        <Route index element={<Ecommerce />} />
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="Add_User" element={<Add_Admin />} />
          <Route path="Edit_User" element={<Edit_Admin />} />
        </Route>
        <Route path="ColorPicker" element={<ColorPicker />} />
        <Route element={<RequireAuth allowedRoles={["ADMIN", "EDITOR"]} />}>
          <Route path="Add_category" element={<Add_Category />} />
          <Route path="Edit_category" element={<Edit_Category />} />
          <Route path="Edit_Store/:storeid" element={<Edit_Store />} />
          <Route path="Categories" element={<Categories />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={["ADMIN", "EDITOR", "USER"]} />}
        >
          <Route path="/DashBoard/LogOut" element={<LogOut />} />
          <Route path="/DashBoard/Register" element={<Register />} />
          <Route path="AddStore" element={<Add_Store />} />
          <Route path="AddCoupon" element={<Add_Coupon />} />
          <Route path="Coupons" element={<Coupons />} />
          <Route path="Stores" element={<Stores />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default DashBoard;
