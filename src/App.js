import React from "react";
import Diary from "./Diary";
import Login from "./Diary/Login";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import { lockBookRedux } from "./redux/actions/appActions";

function App() {
  // const serverUrl = "https://cj38001.tmweb.ru/";

  const dispatch = useDispatch();

  const handleOnIdle = () => {
    dispatch(lockBookRedux());
  };

  useIdleTimer({
    timeout: 1000 * 60 * 5, // 5 минут бездействия
    onIdle: handleOnIdle,
    debounce: 500,
  });

  // ___ЭТО ВАЖНЫЙ КУСОК КОДА___
  // const returnError = () => {
  //   Swal.fire({
  //     title: "Произошла ошибка при отправке",
  //     icon: "error",
  //   });
  // };

  const passwordRedux = useSelector((state) => state.app.password);

  return passwordRedux ? <Diary /> : <Login />;
}

export default App;
