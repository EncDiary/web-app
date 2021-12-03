import { FC, ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  CommandIcon,
  LockIcon,
  MenuIcon,
  ToolIcon,
} from "../../assets/svg-icons";
import "./SettingSidebar.scss";

interface SettingSidebarButtonProps {
  text: string;
  icon?: ReactElement;
  link: string;
}

const SettingSidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="sidebar">
      <button
        className={"sidebar__open-button"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon />
        Меню настроек
      </button>
      <div className={`sidebar__links ${isOpen ? "sidebar__links_show" : ""}`}>
        <SettingSidebarButton
          text="Основное"
          icon={<ToolIcon />}
          link="/setting/main"
        />
        <SettingSidebarButton
          text="Безопасность"
          icon={<LockIcon />}
          link="/setting/secure"
        />
        <SettingSidebarButton
          text="Горячие клавиши"
          icon={<CommandIcon />}
          link="/setting/hotkey"
        />
      </div>
    </aside>
  );
};

const SettingSidebarButton: FC<SettingSidebarButtonProps> = ({
  text,
  icon,
  link,
}) => {
  return (
    <NavLink
      to={link}
      className="sidebar__link"
      activeClassName="sidebar__link_active"
    >
      <div className="sidebar__link-icon">{icon}</div>
      <div className="sidebar__link-text">{text}</div>
    </NavLink>
  );
};

export default SettingSidebar;
