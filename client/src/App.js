import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import ActivateAccount from "./components/ActivateAccount";
import Dashboard from "./components/Dashboard";
import Alert from "./components/elements/Alert";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Register from "./components/Register";
import PrivateRoute from "./components/RoutingComponents/PrivateRoute";
import Settings from "./components/Settings";
import Standings from "./components/Standings";
import { AlertContext } from "./contexts/AlertContext";
import { UserContext } from "./contexts/UserContext";

function App() {
  // Auth states
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth_token") ? true : false
  );
  const [email, setEmail] = useState("");

  // Alert states
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const displayAlert = (message, succuess) => {
    setIsSuccess(succuess);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      setIsSuccess(false);
      setAlertMessage("");
    }, 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const username = localStorage.getItem("user") || "";
    const email = localStorage.getItem("email") || "";

    if (token) {
      setIsAuthenticated(true);
      setUser(username);
      setEmail(email);
    }
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          user,
          setUser,
          email,
          setEmail,
        }}
      >
        <AlertContext.Provider value={displayAlert}>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/about">
                <About />
              </Route>

              <Route path="/standings">
                <Standings />
              </Route>

              {/* Auth Routes */}
              <Route path="/register">
                <Register />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/activate/:uid/:token">
                <ActivateAccount />
              </Route>

              {/* Private Routes */}

              <PrivateRoute
                path="/dashboard"
                component={Dashboard}
                exact={false}
              />

              <PrivateRoute path="/profile" component={Profile} exact={false} />
              <PrivateRoute
                path="/settings"
                component={Settings}
                exact={false}
              />

              <Route path="/" exact>
                <Home />
              </Route>
            </Switch>
          </Router>
        </AlertContext.Provider>
      </UserContext.Provider>

      {showAlert && <Alert isSuccess={isSuccess} message={alertMessage} />}
    </>
  );
}

export default App;
