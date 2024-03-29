import "@material-tailwind/react/tailwind.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import "./App.css";
import About from "./components/About";
import ActivateAccount from "./components/ActivateAccount";
import AllFavorites from "./components/AllFavorites";
import AllProblems from "./components/AllProblems";
import AllRecommendations from "./components/AllRecommendations";
import Connections from "./components/Connections/Connections";
import Dashboard from "./components/Dashboard";
import Alert from "./components/elements/Alert";
import HomeOrDashboard from "./components/HomeOrDashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import AllNotifications from "./components/Notifications/AllNotifications";
import PasswordReset from "./components/PasswordReset";
import PasswordResetConfirm from "./components/PasswordResetConfirm";
import Problem from "./components/Problem";
import Profile from "./components/Profile";
import Register from "./components/Register";
import PrivateRoute from "./components/RoutingComponents/PrivateRoute";
import Settings from "./components/Settings";
import Standings from "./components/Standings";
import Submissions from "./components/Submissions";
import Suggestions from "./components/Suggestions";
import { AlertContext } from "./contexts/AlertContext";
import { ThemeContext } from "./contexts/ThemeContext";
import { UserContext } from "./contexts/UserContext";
import NotFound from "./components/RoutingComponents/NotFound";

function App() {
  // Auth states
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth_token") ? true : false
  );
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userProfile, setUserProfile] = useState(
    localStorage.getItem("profile") || null
  );
  const [avatar, setAvatar] = useState("");

  // Alert states
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Theme states
  const [dark, setDark] = useState(localStorage.getItem("dark") ? true : false);

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

  const toggleTheme = (isDark) => {
    setDark(isDark);

    if (isDark) {
      localStorage.setItem("dark", true);
    } else {
      localStorage.removeItem("dark");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const username = localStorage.getItem("user") || "";
    const email = localStorage.getItem("email") || "";

    if (token) {
      setIsAuthenticated(true);
      setUser(username);
      setEmail(email);

      // axios.defaults.headers.common["Authorization"] = `Token ${token}`;

      axios
        .get("/auth/users/me/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          axios
            .get(`/api/user/profile/${res.data.id}/`, {
              headers: {
                Authorization: `Token ${token}`,
              },
            })
            .then((result) => {
              setUserProfile(result.data.id);
              setAvatar(result.data.avatar);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          firstName,
          setFirstName,
          lastName,
          setLastName,
          user,
          setUser,
          email,
          setEmail,
          userProfile,
          avatar,
          setAvatar,
        }}
      >
        <AlertContext.Provider value={displayAlert}>
          <ThemeContext.Provider value={{ dark, toggleTheme }}>
            <div className={dark ? "dark" : ""}>
              <Router>
                <Navbar />
                <Switch>
                  <Route path="/about">
                    <About />
                  </Route>

                  <Route path="/standings">
                    <Standings />
                  </Route>

                  <Route path="/profile/:username">
                    <Profile />
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

                  <Route path="/password-reset/">
                    <PasswordReset />
                  </Route>

                  <Route path="/password/reset/confirm/:uid/:token">
                    <PasswordResetConfirm />
                  </Route>

                  {/* Private Routes */}

                  <PrivateRoute
                    path="/dashboard"
                    component={Dashboard}
                    exact={false}
                  />

                  <PrivateRoute
                    path="/problems"
                    component={AllProblems}
                    exact={true}
                  />

                  <PrivateRoute
                    path="/problem/:problem_id"
                    component={Problem}
                    exact={false}
                  />

                  <PrivateRoute
                    path="/recommendations"
                    component={AllRecommendations}
                    exact={true}
                  />

                  <PrivateRoute
                    path="/favorites"
                    component={AllFavorites}
                    exact={true}
                  />

                  <PrivateRoute
                    path="/settings"
                    component={Settings}
                    exact={false}
                  />

                  <PrivateRoute
                    path="/notifications"
                    component={AllNotifications}
                    exact={true}
                  />

                  <PrivateRoute
                    path="/connections"
                    component={Connections}
                    exact={false}
                  />
                  <PrivateRoute
                    path="/submissions/:username"
                    component={Submissions}
                    exact={true}
                  />
                  <PrivateRoute
                    path="/suggestions"
                    component={Suggestions}
                    exact={true}
                  />

                  <Route path="/" exact>
                    <HomeOrDashboard />
                  </Route>

                  <Route path="/not-found" exact>
                    <NotFound />
                  </Route>

                  <Route path="*">
                    <Redirect to="/not-found" />
                  </Route>
                </Switch>
              </Router>
            </div>
          </ThemeContext.Provider>
        </AlertContext.Provider>
      </UserContext.Provider>

      {showAlert && <Alert isSuccess={isSuccess} message={alertMessage} />}
    </>
  );
}

export default App;
