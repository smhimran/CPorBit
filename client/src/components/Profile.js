import React from "react";
import ProfileBody from "./Profile/ProfileBody";
import ProfileSidebar from "./Profile/ProfileSidebar";

function Profile() {
  return (
    <div className="dark:bg-gray-800  py-4 h-screen">
      <div className="container px-6 mx-auto">
        <div className="profileContainer">
          <ProfileSidebar />
          <ProfileBody />
        </div>
      </div>
    </div>
  );
}

export default Profile;
