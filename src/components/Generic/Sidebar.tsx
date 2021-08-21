import React from "react";
import { settingsTabTypes } from "../../types/app";
import SidebarItem from "./SidebarItem";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <SidebarItem text="Основное" tabName={settingsTabTypes.Main} />
      <SidebarItem text="Безопасность" tabName={settingsTabTypes.Secure} />
      <SidebarItem text="Горячие клавиши" tabName={settingsTabTypes.Hotkeys} />
      <SidebarItem text="О приложении" tabName={settingsTabTypes.About} />
    </div>
  );
};

export default Sidebar;
