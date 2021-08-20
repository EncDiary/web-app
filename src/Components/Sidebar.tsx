import React from "react";
import SidebarItem from "./SidebarItem";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <SidebarItem text="Основное" tabName="main" />
      <SidebarItem text="Безопасность" tabName="secure" />
      <SidebarItem text="Горячие клавиши" tabName="hotkeys" />
      <SidebarItem text="О приложении" tabName="about" />
    </div>
  );
};

export default Sidebar;
