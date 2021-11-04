import { FC, ReactElement } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
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
  content: ReactElement;
}

interface HeaderNavigationLinkProps {
  content: ReactElement;
  link: string;
}

const Header: FC = () => {
  const history = useHistory();
  return (
    <header className="header">
      <div className="header__username">admin</div>
      <div className="header__navigation">
        <HeaderNavigationLink link="/write" content={<EditIcon />} />
        <HeaderNavigationLink link="/notes" content={<BookIcon />} />
        <HeaderNavigationLink link="/info" content={<InfoIcon />} />
        <HeaderNavigationLink link="/setting" content={<SettingIcon />} />

        <HeaderNavigationButton
          onClick={() => history.push("/login")}
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
      className="header__navigation-item"
      activeClassName="header__navigation-item_active"
    >
      <div className="header__navigation-item-icon">{content}</div>
    </NavLink>
  );
};

export default Header;
