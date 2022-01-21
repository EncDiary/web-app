import { FC, ReactElement } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BookIcon,
  EditIcon,
  InfoIcon,
  LockIcon,
  SettingIcon,
} from "../../assets/svg-icons";
import store from "../../store";
import { IAccount } from "../../types/account";
import "./Header.scss";

interface HeaderProps {
  account: IAccount;
}

interface HeaderNavigationButtonProps {
  onClick?: () => void;
  content: ReactElement;
}

interface HeaderNavigationLinkProps {
  content: ReactElement;
  link: string;
}

const Header: FC<HeaderProps> = ({ account }) => {
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/login");
    store.userStore.clearAccount();
  };

  return (
    <header className="header">
      <div className="header__username">{account.username}</div>
      <div className="header__navigation">
        <HeaderNavigationLink link="/write" content={<EditIcon />} />
        <HeaderNavigationLink link="/notes" content={<BookIcon />} />
        <HeaderNavigationLink link="/info" content={<InfoIcon />} />
        <HeaderNavigationLink link="/setting" content={<SettingIcon />} />

        <HeaderNavigationButton
          onClick={() => logOut()}
          content={<LockIcon />}
        />
      </div>
    </header>
  );
};

const HeaderNavigationButton: FC<HeaderNavigationButtonProps> = ({
  content,
  onClick,
}) => {
  return (
    <button className="header__navigation-item" onClick={onClick}>
      <div className="header__navigation-item-icon">{content}</div>
    </button>
  );
};

const HeaderNavigationLink: FC<HeaderNavigationLinkProps> = ({
  content,
  link,
}) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `header__navigation-item${isActive ? "_active" : ""}`
      }
    >
      <div className="header__navigation-item-icon">{content}</div>
    </NavLink>
  );
};

export default Header;
