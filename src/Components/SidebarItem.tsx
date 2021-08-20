import React from "react";
import { useActions } from "../redux/hooks/useActions";
import { useTypedSelector } from "../redux/hooks/useTypedSelector";
import { settingsTabTypes } from "../redux/types/app";

interface SidebarItemProps {
  text: string;
  tabName: settingsTabTypes;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ text, tabName }) => {
  const settings = useTypedSelector((state) => state.app.showSettings);

  function isActive() {
    if (settings === tabName) {
      return "sidebar__item_active";
    } else {
      return "";
    }
  }

  const { setShowingSettingsRedux } = useActions();

  function changeSettingsTab() {
    setShowingSettingsRedux(tabName);
  }

  return (
    <div onClick={changeSettingsTab} className={"sidebar__item " + isActive()}>
      {text}
    </div>
  );
};

export default SidebarItem;
