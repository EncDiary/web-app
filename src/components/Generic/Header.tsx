import { FC } from "react";
import { InfoIcon, LockIcon, SettingIcon } from "../../assets/svg-icons";
import "./Header.scss";

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__username">admin</div>
      <div className="header__navigation">
        <button className="header__navigation-button">
          <div className="header__navigation-button-icon">
            <InfoIcon />
          </div>
        </button>
        <button className="header__navigation-button">
          <div className="header__navigation-button-icon">
            <SettingIcon />
          </div>
        </button>
        <button className="header__navigation-button">
          <div className="header__navigation-button-icon">
            <LockIcon />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
