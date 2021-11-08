import React from "react";
import { Route, Switch } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import ProfileSettings from "./ProfileSettings";

function SettingsBody() {
  return (
    <div className="ml-5 md:ml-16 py-8">
      <Switch>
        <Route path="/settings" exact>
          <AccountSettings />
        </Route>
        <Route path="/settings/profile">
          <ProfileSettings />
        </Route>
      </Switch>
    </div>
  );
}

export default SettingsBody;
