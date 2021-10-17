import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AlertContext } from "../../contexts/AlertContext";
import { UserContext } from "../../contexts/UserContext";

function PrivateRoute({ path, component, exact }) {
  const user = useContext(UserContext);
  const displayAlert = useContext(AlertContext);

  if (user.isAuthenticated) {
    return <Route path={path} component={component} exact={exact} />;
  } else {
    displayAlert("You need to login first!", false);
    return <Redirect to="/login" />;
  }
}

export default PrivateRoute;
