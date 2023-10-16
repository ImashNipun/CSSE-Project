import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import WalletPage from "../wallet/WalletPage";
import useAuth from "../../hook/useAuth";

const UserProfile = ({ activeTab }) => {
  const {auth} = useAuth();
  const user = {
    name: "John Doe",
    walletBalance: 1000,
    bio: "Frontend Developer at XYZ Corp",
  };

  return (
    <div className="w-4/5 p-4">
      {activeTab === "home" && (
        <div>
          <h2 className="text-2xl font-bold">Welcome,!</h2>
          <p>{user.bio}</p>
        </div>
      )}
      {activeTab === "wallet" && (
        <div>
          <WalletPage />
        </div>
      )}
      {activeTab === "profile" && (
        <div>
          <h2 className="text-2xl font-bold">Profile</h2>
          <p>Name: {user.name}</p>
          <p>Bio: {user.bio}</p>
        </div>
      )}
      
    </div>
  );
};

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} handleTabClick={handleTabClick} />
      <UserProfile activeTab={activeTab} />
    </div>
  );
}

export default ProfilePage;
