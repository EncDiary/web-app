import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentOpeningTabRedux } from "../redux/actions/appActions";

function OpenItem({ icon, name, showPanel }) {
  const dispatch = useDispatch();

  function clickToChangeCurrentTab() {
    dispatch(setCurrentOpeningTabRedux(showPanel));
  }

  return (
    <div className="open__icon" onClick={clickToChangeCurrentTab}>
      <div className="open__icon-image">{icon}</div>
      <div className="open__icon-text">{name}</div>
    </div>
  );
}

export default OpenItem;
