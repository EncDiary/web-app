import React from "react";
import { useIdleTimer } from "react-idle-timer";
import { Redirect, Route, Switch, useHistory } from "react-router";
import store from "../store";
import Info from "./Routes/Info";
import Login from "./Routes/Login";
import Notes from "./Routes/Notes";
import Register from "./Routes/Register";
import Setting from "./Routes/Setting";
import Write from "./Routes/Write";

const App: React.FC = () => {
  const history = useHistory();

  const handleOnIdle = () => {
    if (store.appStore.account) {
      history.push("/login");
      store.noteStore.clearNotes();
      store.appStore.clearAccount();
    }
  };

  useIdleTimer({
    timeout: 1000 * 60 * 10,
    onIdle: handleOnIdle,
  });

  return (
    <Switch>
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
      <Route path="/info" exact>
        <Info />
      </Route>
      <Route path="/setting" exact>
        <Setting />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};

export default App;
