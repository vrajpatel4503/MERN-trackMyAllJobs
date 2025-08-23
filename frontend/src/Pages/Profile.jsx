import React from "react";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileCard from "../components/Profile/ProfileCard";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="md:border-r md:p-4 md:top-16">
        <ProfileSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <ProfileCard />
      </div>
    </div>
  );
};

export default Profile;
