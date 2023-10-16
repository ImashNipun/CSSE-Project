import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";

const Layout = () => {
  return (
    <div className="flex w-full">
      <div className="fixed w-full">
        {/* navbar */}
        <Navbar />
      </div>
      <div className="fixed flex flex-1">
        {/* sidebar */}
        <Sidebar />
      </div>
      <div className="flex-grow p-4 mt-20 ml-60">
        {/* content */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
