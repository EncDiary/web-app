import { useTypedSelector } from "../redux/hooks/useTypedSelector";
import { settingsTabTypes } from "../redux/types/app";
import AboutSetting from "../Settings/AboutSetting";
import HotkeysSetting from "../Settings/HotkeysSetting";
import MainSetting from "../Settings/MainSetting";
import SecureSetting from "../Settings/SecureSetting";

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
