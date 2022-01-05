import { observer } from "mobx-react-lite";
import React from "react";
import { useIdleTimer } from "react-idle-timer";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import store from "../store";
import { Loading } from "./Generic/Spinner";
import Info from "./Routes/Info";
import Login from "./Routes/Login";
import Notes from "./Routes/Notes";
import Register from "./Routes/Register";
import Setting from "./Routes/Setting";
import Write from "./Routes/Write";

const App: React.FC = observer(() => {
  const navigate = useNavigate();
  const { account, isLoading, isAppBlur } = store.appStore;

  const handleOnIdle = () => {
    if (account) {
      navigate("/login");
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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<Write />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/info" element={<Info />} />
        <Route path="/setting/*" element={<Setting />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {isLoading && <Loading />}
    </div>
  );
});

export default App;
