import React from "react";
import Diary from "./Diary";
import Login from "./Login";
import { useIdleTimer } from "react-idle-timer";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import Loader from "./Generic/Loader";

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

  const { password, isLoading } = useTypedSelector((state) => state.app);

  return (
    <>
      {isLoading && <Loader />}
      <div className={(isLoading ? "blur" : "") + " app"}>
        {password ? <Diary /> : <Login />}
      </div>
    </>
  );
};

export default App;
