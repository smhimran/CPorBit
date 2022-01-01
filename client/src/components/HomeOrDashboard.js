import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function HomeOrDashboard() {
  const user = useContext(UserContext);

  if (user.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Redirect to="/" />;
  }
}

export default HomeOrDashboard;
