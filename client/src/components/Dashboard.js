import React from "react";
import Favorites from "./Dashboard/Favorites";
import Recommended from "./Dashboard/Recommended";
import SystemSuggested from "./Dashboard/SystemSuggested";

function Dashboard() {
  return (
    <div className="dark:bg-gray-800 min-h-screen h-full">
      <div className="flex flex-col md:flex-row container px-6 pt-4 mx-auto justify-between">
        <SystemSuggested />
        <div className="flex flex-col w-2/5 md:ml-10">
          <Recommended />
          <Favorites />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
