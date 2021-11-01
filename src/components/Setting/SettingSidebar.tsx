import { FC, ReactElement } from "react";
import { CommandIcon, LockIcon, ToolIcon } from "../../assets/svg-icons";
import { settingPanelEnum } from "../../types/setting";
import "./SettingSidebar.scss";

interface SettingSidebarProps {
  currentSettingPanel: settingPanelEnum;
  setCurrentSettingPanel: React.Dispatch<
    React.SetStateAction<settingPanelEnum>
  >;
}

interface SettingSidebarButtonProps {
  onClick: () => void;
  text: string;
  currentPanel: settingPanelEnum;
  panel: settingPanelEnum;
  icon?: ReactElement;
}

const SettingSidebar: FC<SettingSidebarProps> = ({
  currentSettingPanel,
  setCurrentSettingPanel,
}) => {
  return (
    <aside className="sidebar">
      <SettingSidebarButton
        text="Основное"
        currentPanel={currentSettingPanel}
        onClick={() => setCurrentSettingPanel(settingPanelEnum.main)}
        panel={settingPanelEnum.main}
        icon={<ToolIcon />}
      />
      <SettingSidebarButton
        text="Безопасность"
        currentPanel={currentSettingPanel}
        onClick={() => setCurrentSettingPanel(settingPanelEnum.security)}
        panel={settingPanelEnum.security}
        icon={<LockIcon />}
      />
      <SettingSidebarButton
        text="Горячие клавиши"
        currentPanel={currentSettingPanel}
        onClick={() => setCurrentSettingPanel(settingPanelEnum.hotkeys)}
        panel={settingPanelEnum.hotkeys}
        icon={<CommandIcon />}
      />
    </aside>
  );
};

const SettingSidebarButton: FC<SettingSidebarButtonProps> = ({
  onClick,
  text,
  currentPanel,
  panel,
  icon,
}) => {
  return (
    <button
      className={`sidebar__button${currentPanel === panel ? "_active" : ""}`}
      onClick={onClick}
    >
      <div className="sidebar__button-icon">{icon}</div>
      <div className="sidebar__button-text">{text}</div>
    </button>
  );
};

export default SettingSidebar;
