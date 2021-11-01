import { FC } from "react";
import { useHistory } from "react-router";
import {
  BookIcon,
  EditIcon,
  InfoIcon,
  LockIcon,
  SettingIcon,
} from "../../assets/svg-icons";
import "./Header.scss";

interface HeaderNavigationButtonProps {
  onClick?: () => void;
}

const Header: FC = () => {
  const history = useHistory();
  return (
    <header className="header">
      <div className="header__username">admin</div>
      <div className="header__navigation">
        <HeaderNavigationButton onClick={() => history.push("/write")}>
          <EditIcon />
        </HeaderNavigationButton>
        <HeaderNavigationButton onClick={() => history.push("/notes")}>
          <BookIcon />
        </HeaderNavigationButton>
        <HeaderNavigationButton>
          <InfoIcon />
        </HeaderNavigationButton>
        <HeaderNavigationButton onClick={() => history.push("/setting")}>
          <SettingIcon />
        </HeaderNavigationButton>
        <HeaderNavigationButton onClick={() => history.push("/login")}>
          <LockIcon />
        </HeaderNavigationButton>
      </div>
    </header>
  );
};

const HeaderNavigationButton: FC<HeaderNavigationButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button className="header__navigation-button" onClick={onClick}>
      <div className="header__navigation-button-icon">{children}</div>
    </button>
  );
};

export default Header;
