import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoIcon, SettingIcon, LockIcon } from "../../assets/SvgIcons";
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

  const settingsRedux = useTypedSelector((state) => state.app.showSettings);

  const currentBookRedux = useTypedSelector((state) => state.books.currentBook);

  return (
    <>
      <header className="header">
        <div className="header__title">{currentBookRedux.title}</div>

        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="info-icon__tooltip">Инфо</Tooltip>}
        >
          <div
            className="header__button header__button_help"
            onClick={() =>
              clickToSettings(
                settingsRedux === settingsTabTypes.About
                  ? settingsTabTypes.None
                  : settingsTabTypes.About
              )
            }
          >
            {InfoIcon}
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="settings-icon__tooltip">Настройки</Tooltip>}
        >
          <div
            className="header__button header__button_setting"
            onClick={() =>
              clickToSettings(
                settingsRedux !== settingsTabTypes.None &&
                  settingsRedux !== settingsTabTypes.About
                  ? settingsTabTypes.None
                  : settingsTabTypes.Main
              )
            }
          >
            {SettingIcon}
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="lock-icon__tooltip">Заблокировать</Tooltip>}
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
};

export default Header;
