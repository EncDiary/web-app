import { FC, ReactElement, useState } from "react";
import {
  CommandIcon,
  LockIcon,
  MenuIcon,
  ToolIcon,
} from "../../assets/svg-icons";
import { TSettingSections } from "../../types/setting";
import "./SettingSidebar.scss";

interface SettingSidebarProps {
  currentSection: TSettingSections;
  setCurrentSection: React.Dispatch<React.SetStateAction<TSettingSections>>;
}

interface SettingSidebarButtonProps {
  text: string;
  icon?: ReactElement;
  section: TSettingSections;
  currentSection: TSettingSections;
  setCurrentSection: React.Dispatch<React.SetStateAction<TSettingSections>>;
}

const SettingSidebar: FC<SettingSidebarProps> = ({
  currentSection,
  setCurrentSection,
}) => {
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
      <div
        className={`sidebar__buttons ${isOpen ? "sidebar__buttons_show" : ""}`}
      >
        <SettingSidebarButton
          text="Основное"
          icon={<ToolIcon />}
          section="main"
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <SettingSidebarButton
          text="Безопасность"
          icon={<LockIcon />}
          section="secure"
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <SettingSidebarButton
          text="Горячие клавиши"
          icon={<CommandIcon />}
          section="hotkeys"
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </div>
    </aside>
  );
};

const SettingSidebarButton: FC<SettingSidebarButtonProps> = ({
  text,
  icon,
  section,
  currentSection,
  setCurrentSection,
}) => {
  return (
    <button
      className={`sidebar__button${
        section === currentSection ? "_active" : ""
      }`}
      onClick={() => setCurrentSection(section)}
    >
      <div className="sidebar__button-icon">{icon}</div>
      <div className="sidebar__button-text">{text}</div>
    </button>
  );
};

export default SettingSidebar;
