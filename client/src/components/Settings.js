import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SettingsBody from "./Settings/SettingsBody";
import SettingsSidebar from "./Settings/SettingsSidebar";

function Dashboard() {
  return (
    <div className="settingsContainer dark:bg-gray-800">
      <Router>
        <SettingsSidebar />

        <SettingsBody />
      </Router>
    </div>
  );
}

export default Dashboard;
