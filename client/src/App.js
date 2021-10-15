import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import ActivateAccount from "./components/ActivateAccount";
import Home from "./components/Home";
import Register from "./components/Register";
import Standings from "./components/Standings";

function App() {
  return (
    <>
      <Router>
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

          <Route path="/activate/:uid/:token">
            <ActivateAccount />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
