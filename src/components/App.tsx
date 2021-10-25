import React from "react";
import { Route, Switch } from "react-router";
import Login from "./Routes/Login";
import "./App.scss";

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        Old design
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
    </Switch>
  );
};

export default App;
