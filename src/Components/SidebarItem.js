import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowingSettingsRedux } from "../redux/actions/appActions";

function SidebarItem({ text, tabName }) {
  const settings = useSelector((state) => state.app.showSettings);

  function isActive() {
    if (settings === tabName) {
      return "sidebar__item_active";
    } else {
      return "";
    }
  }
  const dispatch = useDispatch();

  function changeSettingsTab() {
    dispatch(setShowingSettingsRedux(tabName));
  }

  return (
    <div onClick={changeSettingsTab} className={"sidebar__item " + isActive()}>
      {text}
    </div>
  );
}

export default SidebarItem;
