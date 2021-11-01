import { FC, useState } from "react";
import { settingPanelEnum } from "../../types/setting";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import WithSidebar from "../Generic/WithSidebar";
import SettingHotkey from "../Setting/SettingHotkey";
import SettingMain from "../Setting/SettingMain";
import SettingSecure from "../Setting/SettingSecure";
import SettingSidebar from "../Setting/SettingSidebar";

const Setting: FC = () => {
  const [currentSettingPanel, setCurrentSettingPanel] = useState(
    settingPanelEnum.main
  );

  const getCurrentSettingPanel = () => {
    switch (currentSettingPanel) {
      case settingPanelEnum.main:
        return <SettingMain />;
      case settingPanelEnum.security:
        return <SettingSecure />;
      case settingPanelEnum.hotkeys:
        return <SettingHotkey />;
    }
  };

  return (
    <>
      <Header />
      <WithSidebar>
        <SettingSidebar
          currentSettingPanel={currentSettingPanel}
          setCurrentSettingPanel={setCurrentSettingPanel}
        />
        <MainContent type="setting">{getCurrentSettingPanel()}</MainContent>
      </WithSidebar>
    </>
  );
};

export default Setting;
