import React from "react";
import { useActions } from "../../hooks/useActions";
import { currentOpeningTabTypes } from "../../types/app";

interface OpenItemProps {
  icon: any;
  name: string;
  showPanel: currentOpeningTabTypes;
}

const BookActionItem: React.FC<OpenItemProps> = ({ icon, name, showPanel }) => {
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

export default BookActionItem;
