import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoIcon, SettingIcon, LockIcon } from "../../assets/svg/AppIcons";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { settingsTabTypes } from "../../types/app";

const Header: React.FC = () => {
  const { lockBookRedux, setShowingSettingsRedux } = useActions();

  function clickToLockBook() {
    lockBookRedux();
  }

  function clickToSettings(tab: settingsTabTypes) {
    setShowingSettingsRedux(tab);
  }

  const {
    app: { showSettings },
    books: { currentBook },
  } = useTypedSelector((state) => state);

  return (
    <>
      <header className="header">
        <div className="header__title">{currentBook.title}</div>

        <div
          className="header__button header__button_help"
          onClick={() =>
            clickToSettings(
              showSettings === settingsTabTypes.About
                ? settingsTabTypes.None
                : settingsTabTypes.About
            )
          }
        >
          {InfoIcon}
        </div>
        <div
          className="header__button header__button_setting"
          onClick={() =>
            clickToSettings(
              showSettings !== settingsTabTypes.None &&
                showSettings !== settingsTabTypes.About
                ? settingsTabTypes.None
                : settingsTabTypes.Main
            )
          }
        >
          {SettingIcon}
        </div>
        <div
          className="header__button header__button_lock"
          onClick={clickToLockBook}
        >
          {LockIcon}
        </div>
      </header>
    </>
  );
};

export default Header;
