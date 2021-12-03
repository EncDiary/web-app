import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Redirect, Route, Switch } from "react-router";
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
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header account={account} />
      <WithSidebar>
        <SettingSidebar />
        <MainContent type="setting">
          <div className="setting__container">
            <Switch>
              <Route path="/setting/secure">
                <SettingSecure account={account} />
              </Route>
              <Route path="/setting/hotkey">
                <SettingHotkey />
              </Route>
              <Route>
                <SettingMain />
              </Route>
            </Switch>
          </div>
        </MainContent>
      </WithSidebar>
    </>
  );
});

export default Setting;
