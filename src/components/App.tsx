import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Login from "./Routes/Login";
import Notes from "./Routes/Notes";
import Register from "./Routes/Register";
import Setting from "./Routes/Setting";
import Write from "./Routes/Write";

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>
      <Route path="/write" exact>
        <Write />
      </Route>
      <Route path="/notes" exact>
        <Notes />
      </Route>
      <Route path="/setting" exact>
        <Setting />
      </Route>
    </Switch>
  );
};

export default App;
