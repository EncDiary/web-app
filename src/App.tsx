import React from "react";
import Diary2 from "./Diary2";
import Login from "./Diary/Login";
import { useIdleTimer } from "react-idle-timer";
import { useTypedSelector } from "./redux/hooks/useTypedSelector";
import { useActions } from "./redux/hooks/useActions";

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

  return passwordRedux ? <Diary2 /> : <Login />;
};

export default App;
