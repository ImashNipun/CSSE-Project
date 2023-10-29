import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import img from "../assets/logo.svg";
import useAuth from "../hook/useAuth";

import {
  FaHome,
  FaWallet,
  FaRegUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const SideBar = () => {
  const { auth, onLogout } = useAuth();
  const [activeItem, setActiveItem] = useState("Home");

  const location = useLocation();

  //set active items
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  //get active item's location
  useEffect(() => {
    const getActiveItem = (location) => {
      if (location.pathname === "/profile") {
        setActiveItem("Profile");
      }

      if (location.pathname === "/wallet") {
        setActiveItem("Wallet");
      }

      if (location.pathname === "/") {
        setActiveItem("Home");
      }
    };
    getActiveItem(location);
  }, [location, activeItem]);

  return (
    <div className="h-screen bg-slate-800 sadow">
      <div className="flex items-center">
        <img src={img} alt="Your Logo" className="py-3 mb-1 ml-4 w-60 " />
      </div>

      <Link to={"/"}>
        <div
          className={`flex items-center py-4 px-8 ${
            activeItem === "Home"
              ? "bg-sky-100 opacity-100  text-sky-400"
              : "hover:text-sky-400 text-white"
          }`}
          onClick={() => handleItemClick("Home")}
        >
          <FaHome
            className={`text-lg mr-2 ${
              activeItem === "Analytics Overview"
                ? "text-sky-400"
                : "hover:text-sky-400"
            }`}
          />
          <span>Home</span>
        </div>
      </Link>

      <Link to={"/wallet"}>
        <div
          className={`flex items-center py-4 px-8 ${
            activeItem === "Wallet"
              ? "bg-sky-100 opacity-100  text-sky-400"
              : "hover:text-sky-400 text-white"
          }`}
          onClick={() => handleItemClick("Wallet")}
        >
          <FaWallet
            className={`text-lg mr-2 ${
              activeItem === "Passenger Traffic"
                ? "text-sky-400"
                : "hover:text-sky-400"
            }`}
          />
          <span>Wallet</span>
        </div>
      </Link>

      {(auth?.user?.user_type === "shop" ||
        auth?.user?.user_type === "local") && (
        <Link to={"/profile"}>
          <div
            className={`flex items-center py-4 px-8 ${
              activeItem === "Profile"
                ? "bg-sky-100 opacity-100  text-sky-400"
                : "hover:text-sky-400 text-white"
            }`}
            onClick={() => handleItemClick("Profile")}
          >
            <FaRegUserCircle
              className={`text-lg mr-2 ${
                activeItem === "Fare Collection"
                  ? "text-sky-400"
                  : "hover:text-sky-400 text-white"
              }`}
            />
            <span>Profile</span>
          </div>
        </Link>
      )}

      <Link to={"/#"}>
        <div
          className={`flex items-center py-4 px-8 ${
            activeItem === "Logout"
              ? "bg-sky-100 opacity-100  text-sky-400"
              : "hover:text-sky-400 text-white"
          }`}
          onClick={() => {
            handleItemClick("Logout");
            onLogout();
          }}
        >
          <FaSignOutAlt
            className={`text-lg mr-2 ${
              activeItem === "Fare Collection"
                ? "text-sky-400"
                : "hover:text-sky-400 text-white"
            }`}
          />
          <span>Logout</span>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
