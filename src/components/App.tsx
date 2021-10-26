import React from "react";
import { Route, Switch } from "react-router";
import Login from "./Routes/Login";
import "./App.scss";
import Register from "./Routes/Register";

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
    </Switch>
  );
};

export default App;
