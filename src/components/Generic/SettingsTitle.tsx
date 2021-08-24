import React from "react";

interface SettingsTitleProps {
  text: string;
  level: number;
}

const SettingsTitle: React.FC<SettingsTitleProps> = ({ text, level }) => {
  function GetTitle() {
    switch (level) {
      case 1:
        return (
          <h1 className="title settings__title settings__title_primary">
            {text}
          </h1>
        );
      case 2:
        return (
          <h2 className="title settings__title settings__title_secondary">
            {text}
          </h2>
        );
      default:
        return "";
    }
  }

  return <>{GetTitle()}</>;
};

export default SettingsTitle;
