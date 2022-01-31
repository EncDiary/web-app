import { FC, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IAccount } from "../../types/account";
import { TSettingSections } from "../../types/setting";
import MainContent from "../Generic/Container/MainContent";
import MainWithSidebar from "../Generic/Container/MainWithSidebar";
import SettingHotkey from "../Setting/SettingHotkey";
import SettingMain from "../Setting/SettingMain";
import SettingSecure from "../Setting/SettingSecure";
import SettingSidebar from "../Setting/SettingSidebar";
import "./Setting.scss";

const Setting: FC = () => {
  const account: IAccount = useOutletContext();
  const [section, setSection] = useState<TSettingSections>("main");

  const switchSection = () => {
    switch (section) {
      case "main":
        return <SettingMain />;
      case "secure":
        return <SettingSecure account={account} />;
      case "hotkeys":
        return <SettingHotkey />;
    }
  };

  return (
    <MainWithSidebar>
      <SettingSidebar currentSection={section} setCurrentSection={setSection} />
      <MainContent withSidebar>
        <div className="setting__container">{switchSection()}</div>
      </MainContent>
    </MainWithSidebar>
  );
};

export default Setting;
