import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import store from "../../store";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import WithSidebar from "../Generic/WithSidebar";
import SettingHotkey from "../Setting/SettingHotkey";
import SettingMain from "../Setting/SettingMain";
import SettingSecure from "../Setting/SettingSecure";
import SettingSidebar from "../Setting/SettingSidebar";
import "./Setting.scss";

const Setting: FC = observer(() => {
  const account = store.appStore.account;
  if (!account) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header account={account} />
      <WithSidebar>
        <SettingSidebar />
        <MainContent type="setting">
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
    </>
  );
});

export default Setting;
