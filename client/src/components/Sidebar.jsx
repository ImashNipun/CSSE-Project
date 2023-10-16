import React from "react";
import useAuth from "../hook/useAuth";

const Sidebar = ({ activeTab, handleTabClick }) => {
  const {onLogout} = useAuth();
  const tabs = ["home", "wallet", "profile"];

  return (
    <div className="w-1/5 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`cursor-pointer py-2 ${
              activeTab === tab ? "text-yellow-400" : ""
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </li>
        ))}
        <li className="cursor-pointer py-2" onClick={onLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
