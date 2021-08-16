import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoIcon, SettingIcon, LockIcon } from "../assets/SvgIcons";
import { useDispatch, useSelector } from "react-redux";
import { lockBookRedux } from "../redux/actions/appActions";
import { setShowingSettingsRedux } from "../redux/actions/appActions";

function Header() {
  const dispatch = useDispatch();

  function clickToLockBook() {
    dispatch(lockBookRedux());
  }

  function clickToSettings(tab) {
    dispatch(setShowingSettingsRedux(tab));
  }

  const settingsRedux = useSelector((state) => state.app.showSettings);

  const currentBookRedux = useSelector((state) => state.books.currentBook);

  return (
    <>
      <header className="header">
        <div className="header__title">{currentBookRedux.title}</div>

        <OverlayTrigger placement="bottom" overlay={<Tooltip>Инфо</Tooltip>}>
          <div
            className="header__button header__button_help"
            onClick={() =>
              clickToSettings(settingsRedux === "about" ? false : "about")
            }
          >
            {InfoIcon}
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Настройки</Tooltip>}
        >
          <div
            className="header__button header__button_setting"
            onClick={() =>
              clickToSettings(
                settingsRedux && settingsRedux !== "about" ? false : "main"
              )
            }
          >
            {SettingIcon}
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Заблокировать</Tooltip>}
        >
          <div
            className="header__button header__button_lock"
            onClick={clickToLockBook}
          >
            {LockIcon}
          </div>
        </OverlayTrigger>
      </header>
    </>
  );
}

export default Header;
