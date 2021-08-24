import React from "react";
import SettingsTitle from "../Generic/SettingsTitle";
import HotkeyItem from "./HotkeyItem";

const HotkeysSetting: React.FC = () => {
  return (
    <>
      <SettingsTitle text="Горячие клавиши" level={1} />
      <div className="hotkey__list">
        <HotkeyItem combination="Ctrl + S" description="Жирный текст" />
        <HotkeyItem combination="Ctrl + I" description="Курсивный текст" />
        <HotkeyItem combination="Ctrl + U" description="Подчеркнутый текст" />
      </div>
    </>
  );
};

export default HotkeysSetting;
