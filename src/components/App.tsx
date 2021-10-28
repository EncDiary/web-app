import React from "react";
import { Route, Switch } from "react-router";
import Login from "./Routes/Login";
import Notes from "./Routes/Notes";
import Register from "./Routes/Register";
import Write from "./Routes/Write";

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        Old design
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
    </Switch>
  );
};

export default App;
