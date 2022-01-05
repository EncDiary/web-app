import { FC } from "react";
import { Navigate, Route, Routes, useOutletContext } from "react-router-dom";
import { IAccount } from "../../types/account";
import MainContent from "../Generic/MainContent";
import WithSidebar from "../Generic/WithSidebar";
import SettingHotkey from "../Setting/SettingHotkey";
import SettingMain from "../Setting/SettingMain";
import SettingSecure from "../Setting/SettingSecure";
import SettingSidebar from "../Setting/SettingSidebar";
import "./Setting.scss";

const Setting: FC = () => {
  const account: IAccount = useOutletContext();

  return (
    <WithSidebar>
      <SettingSidebar />
      <MainContent withSidebar>
        <div className="setting__container">
          <Routes>
            <Route path="main" element={<SettingMain />} />
            <Route
              path="secure"
              element={<SettingSecure account={account} />}
            />
            <Route path="hotkey" element={<SettingHotkey />} />
            <Route path="*" element={<Navigate to="main" />} />
          </Routes>
        </div>
      </MainContent>
    </WithSidebar>
  );
};

export default Setting;
