import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { Redirect } from "react-router";
import store from "../../store";
import { settingPanelEnum } from "../../types/setting";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import WithSidebar from "../Generic/WithSidebar";
import SettingHotkey from "../Setting/SettingHotkey";
import SettingMain from "../Setting/SettingMain";
import SettingSecure from "../Setting/SettingSecure";
import SettingSidebar from "../Setting/SettingSidebar";

const Setting: FC = observer(() => {
  const account = store.appStore.account;
  if (!account) {
    return <Redirect to="/login" />;
  }

  const [currentSettingPanel, setCurrentSettingPanel] = useState(
    settingPanelEnum.main
  );

  const getCurrentSettingPanel = () => {
    switch (currentSettingPanel) {
      case settingPanelEnum.main:
        return <SettingMain />;
      case settingPanelEnum.security:
        return <SettingSecure account={account} />;
      case settingPanelEnum.hotkeys:
        return <SettingHotkey />;
    }
  };

  return (
    <>
      <Header account={account} />
      <WithSidebar>
        <SettingSidebar
          currentSettingPanel={currentSettingPanel}
          setCurrentSettingPanel={setCurrentSettingPanel}
        />
        <MainContent type="setting">{getCurrentSettingPanel()}</MainContent>
      </WithSidebar>
    </>
  );
});

export default Setting;
