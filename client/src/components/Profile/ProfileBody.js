import React from "react";
import HardestSolved from "./HardestSolved";
import ProfileChart from "./ProfileChart";
import ProfileStrengthAndWeakness from "./ProfileStrengthAndWeakness";

function ProfileBody() {
  return (
    <div>
      <ProfileChart />
      <ProfileStrengthAndWeakness />
      <HardestSolved />
    </div>
  );
}

export default ProfileBody;
