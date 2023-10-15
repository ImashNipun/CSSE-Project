import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import img from "../assets/logo.svg";

import {
  FaChartPie,
  FaUsers,
  FaMoneyBillWave,
  FaUserTie,
  FaSmile,
  FaMapMarkerAlt,
} from "react-icons/fa";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("Analytics Overview");

  const location = useLocation();

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  useEffect(() => {
    const getActiveItem = (location) => {
      if (location.pathname === "/analytics-overview") {
        setActiveItem("Analytics Overview");
      }

      if (
        location.pathname === "/bus-routes" ||
        location.pathname === "/add-bus-routes"
      ) {
        setActiveItem("Bus Routes");
      }
    };
    getActiveItem(location);
  }, [location, activeItem]);

  return (
    <div className="h-screen bg-gray-200 sadow">

      <div className="flex items-center">
        <img
          src={img}
          alt="Your Logo"
          className="py-3 mb-1 ml-4 w-60"
        />
      </div>

      <Link to={"/analytics-overview"}>
        <div
          className={`flex items-center py-4 px-8 ${
            activeItem === "Analytics Overview"
              ? "bg-sky-100 opacity-100  text-sky-400"
              : "hover:text-sky-400"
          }`}
          onClick={() => handleItemClick("Analytics Overview")}
        >
          <FaChartPie
            className={`text-lg mr-2 ${
              activeItem === "Analytics Overview"
                ? "text-sky-400"
                : "hover:text-sky-400"
            }`}
          />
          <span>Analytics Overview</span>
        </div>
      </Link>

      <Link to={"/passenger-traffic"}>
        <div
          className={`flex items-center py-4 px-8 ${
            activeItem === "Passenger Traffic"
              ? "bg-sky-100 opacity-100  text-sky-400"
              : "hover:text-sky-400"
          }`}
          onClick={() => handleItemClick("Passenger Traffic")}
        >
          <FaUsers
            className={`text-lg mr-2 ${
              activeItem === "Passenger Traffic"
                ? "text-sky-400"
                : "hover:text-sky-400"
            }`}
          />
          <span>Passenger Traffic</span>
        </div>
      </Link>

      <Link to={"/"}>
        <div
          className={`flex items-center py-4 px-8 ${
            activeItem === "Fare Collection"
              ? "bg-sky-100 opacity-100  text-sky-400"
              : "hover:text-sky-400"
          }`}
          onClick={() => handleItemClick("Fare Collection")}
        >
          <FaMoneyBillWave
            className={`text-lg mr-2 ${
              activeItem === "Fare Collection"
                ? "text-sky-400"
                : "hover:text-sky-400"
            }`}
          />
          <span>Fare Collection</span>
        </div>
      </Link>

      <Link to={"/bus-routes"}>
        <div
          className={`flex items-center py-4 px-8 ${
            activeItem === "Bus Routes"
              ? "bg-sky-100 opacity-100  text-sky-400"
              : "hover:text-sky-400"
          }`}
          onClick={() => handleItemClick("Bus Routes")}
        >
          <FaMapMarkerAlt
            className={`text-lg mr-2 ${
              activeItem === "Bus Routes"
                ? "text-sky-400"
                : "hover:text-sky-400"
            }`}
          />
          <span>Bus Routes</span>
        </div>
      </Link>

      <Link to={"/"}>
        <div
          className={`flex items-center py-4 px-8 ${
            activeItem === "Ticket Inspectors"
              ? "bg-sky-100 opacity-100  text-sky-400"
              : "hover:text-sky-400"
          }`}
          onClick={() => handleItemClick("Ticket Inspectors")}
        >
          <FaUserTie
            className={`text-lg mr-2 ${
              activeItem === "Ticket Inspectors"
                ? "text-sky-400"
                : "hover:text-sky-400"
            }`}
          />
          <span>Ticket Inspectors</span>
        </div>
      </Link>

      <Link to={"/"}>
        <div
          className={`flex items-center py-4 px-8 ${
            activeItem === "Compliments"
              ? "bg-sky-100 opacity-100  text-sky-400"
              : "hover:text-sky-400"
          }`}
          onClick={() => handleItemClick("Compliments")}
        >
          <FaSmile
            className={`text-lg mr-2 ${
              activeItem === "Compliments"
                ? "text-sky-400"
                : "hover:text-sky-400"
            }`}
          />
          <span>Compliments</span>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
