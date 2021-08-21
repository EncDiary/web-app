import { useTypedSelector } from "../../hooks/useTypedSelector";
import { settingsTabTypes } from "../../types/app";
import AboutSetting from "../Setting/AboutSetting";
import HotkeysSetting from "../Setting/HotkeysSetting";
import MainSetting from "../Setting/MainSetting";
import SecureSetting from "../Setting/SecureSetting";

const Mainbar: React.FC = () => {
  const settings = useTypedSelector((state) => state.app.showSettings);

  function showCurrentSetting() {
    switch (settings) {
      case settingsTabTypes.Main:
        return <MainSetting />;
      case settingsTabTypes.Secure:
        return <SecureSetting />;
      case settingsTabTypes.Hotkeys:
        return <HotkeysSetting />;
      case settingsTabTypes.About:
        return <AboutSetting />;
      default:
        return "";
    }
  }

  return <div className="mainbar">{showCurrentSetting()}</div>;
};

export default Mainbar;
