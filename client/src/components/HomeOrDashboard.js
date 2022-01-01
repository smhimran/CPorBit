import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Home from "./Home";

function HomeOrDashboard() {
  const user = useContext(UserContext);

  if (user.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Home />;
  }
}

export default HomeOrDashboard;
