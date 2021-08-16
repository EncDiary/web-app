import React from "react";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarItem text="Основное" tabName="main" />
      <SidebarItem text="Горячие клавиши" tabName="hotkeys" />
      <SidebarItem text="О приложении" tabName="about" />
    </div>
  );
}

export default Sidebar;
