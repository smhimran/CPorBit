import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ConnectionsBody from "./ConnectionsBody";
import ConnectionSidebar from "./ConnectionSidebar";

function Connections() {
  return (
    <div className="dark:bg-gray-800 h-screen">
      <div className="connections-grid flex">
        <Router>
          <ConnectionSidebar />

          <ConnectionsBody />
        </Router>
      </div>
    </div>
  );
}

export default Connections;
