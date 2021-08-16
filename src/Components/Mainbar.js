import React from "react";
import { useSelector } from "react-redux";
import AboutSetting from "../Settings/AboutSetting";
import HotkeysSetting from "../Settings/HotkeysSetting";
import MainSetting from "../Settings/MainSetting";
import SecureSetting from "../Settings/SecureSetting";

function Mainbar() {
  const settings = useSelector((state) => state.app.showSettings);

  function showCurrentSetting() {
    switch (settings) {
      case "main":
        return <MainSetting />;
      case "secure":
        return <SecureSetting />;
      case "hotkeys":
        return <HotkeysSetting />;
      case "about":
        return <AboutSetting />;
      default:
        return "";
    }
  }

  return <div className="mainbar">{showCurrentSetting()}</div>;
}

export default Mainbar;
