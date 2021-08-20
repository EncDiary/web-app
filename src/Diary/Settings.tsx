import React from "react";
import Mainbar from "../Components/Mainbar";
import Sidebar from "../Components/Sidebar";

const Settings: React.FC = () => {
  return (
    <div className="settings">
      <Sidebar />
      <Mainbar />
    </div>
  );
};

export default Settings;
