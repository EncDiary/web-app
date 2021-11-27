import { observer } from "mobx-react-lite";
import React from "react";
import { useIdleTimer } from "react-idle-timer";
import { Redirect, Route, Switch, useHistory } from "react-router";
import store from "../store";
import { Loading } from "./Generic/Spinner";
import Demo from "./Routes/Demo";
import Info from "./Routes/Info";
import Login from "./Routes/Login";
import Notes from "./Routes/Notes";
import Register from "./Routes/Register";
import Setting from "./Routes/Setting";
import Write from "./Routes/Write";

const App: React.FC = observer(() => {
  const history = useHistory();
  const { account, isLoading, isAppBlur } = store.appStore;

  const handleOnIdle = () => {
    if (account) {
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
    <div id="app" className={isLoading || isAppBlur ? "blur" : ""}>
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
        <Route path="/setting">
          <Setting />
        </Route>
        <Route path="/demo" exact>
          <Demo />
        </Route>
        <Redirect to="/login" />
      </Switch>
      {isLoading && <Loading />}
    </div>
  );
});

export default App;
