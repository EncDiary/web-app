import React from "react";
import Mainbar from "../Generic/Mainbar";
import Sidebar from "../Generic/Sidebar";

const Setting: React.FC = () => {
  return (
    <div className="settings">
      <Sidebar />
      <Mainbar />
    </div>
  );
};

export default Setting;
