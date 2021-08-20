import React from "react";
import { useActions } from "../redux/hooks/useActions";
import { currentOpeningTabTypes } from "../redux/types/app";

interface OpenItemProps {
  icon: any;
  name: string;
  showPanel: currentOpeningTabTypes;
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
