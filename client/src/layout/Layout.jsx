import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";

const Layout = () => {
  return (
    <div className="flex w-full">
      <div className="fixed ">
        {/* sidebar */}
        <Sidebar />
      </div>
      <div className="flex-grow p-4 ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
