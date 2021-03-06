import { observer } from "mobx-react-lite";
import React from "react";
import { useIdleTimer } from "react-idle-timer";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import store from "../store";
import { Loading } from "./Generic/Spinner";
import Info from "./Routes/Info";
import Login from "./Routes/Login";
import HistoryNotes from "./Routes/HistoryNotes";
import Register from "./Routes/Register";
import Setting from "./Routes/Setting";
import Write from "./Routes/Write";
import AccountTemplate from "./Templates/AccountTemplate";
import UnauthorizedTemplate from "./Templates/UnauthorizedTemplate";
import { clearStore } from "../modules/clearStore";

const App: React.FC = observer(() => {
  const navigate = useNavigate();
  const {
    appStore: { isLoading, isAppBlur },
    userStore: { account },
  } = store;

  const handleOnIdle = () => {
    if (account) {
      navigate("/login");
      clearStore();
    }
  };

  useIdleTimer({
    timeout: 1000 * 60 * 10,
    onIdle: handleOnIdle,
  });

  return (
    <div id="app" className={isLoading || isAppBlur ? "blur" : ""}>
      <Routes>
        <Route element={<UnauthorizedTemplate />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AccountTemplate />}>
          <Route path="/write" element={<Write />} />
          <Route path="/notes" element={<HistoryNotes />} />
          <Route path="/info" element={<Info />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {isLoading && <Loading />}
    </div>
  );
});

export default App;
