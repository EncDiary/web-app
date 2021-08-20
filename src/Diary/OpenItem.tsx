import React from "react";
import { useActions } from "../redux/hooks/useActions";

interface OpenItemProps {
  icon: any;
  name: string;
  showPanel: string;
}

const OpenItem: React.FC<OpenItemProps> = ({ icon, name, showPanel }) => {
  const { setCurrentOpeningTabRedux } = useActions();

  function clickToChangeCurrentTab() {
    setCurrentOpeningTabRedux(showPanel);
  }

  return (
    <div className="open__icon" onClick={clickToChangeCurrentTab}>
      <div className="open__icon-image">{icon}</div>
      <div className="open__icon-text">{name}</div>
    </div>
  );
};

export default OpenItem;
