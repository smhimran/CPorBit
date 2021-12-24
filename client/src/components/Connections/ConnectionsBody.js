import React from "react";
import { Route, Switch } from "react-router-dom";
import Current from "./Current";
import Pending from "./Pending";
import Requests from "./Requests";

function ConnectionsBody() {
  return (
    <div>
      <Switch>
        <Route path="/connections/requests">
          <Requests />
        </Route>

        <Route path="/connections/pending">
          <Pending />
        </Route>
        <Route path="/connections" exact>
          <Current />
        </Route>
      </Switch>
    </div>
  );
}

export default ConnectionsBody;
