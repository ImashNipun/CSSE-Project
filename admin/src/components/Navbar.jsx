import React from "react";
import { FaBell, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-gray-200 shadow h-20">
      <div className="flex justify-end">
        <div className="mr-12 mt-6">
          <FaBell className="text-black text-2xl" />
        </div>
        <div className="mr-12 mt-6">
          <FaUser className="text-black text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
