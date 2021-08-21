import React from "react";
import Diary from "./Diary";
import Login from "./Login";
import { useIdleTimer } from "react-idle-timer";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const App: React.FC = () => {
  const { lockBookRedux } = useActions();

  const handleOnIdle = () => {
    lockBookRedux();
  };

  useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  const passwordRedux = useTypedSelector((state) => state.app.password);

  return passwordRedux ? <Diary /> : <Login />;
};

export default App;
