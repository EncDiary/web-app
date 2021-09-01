import { FC } from "react";
import SettingsTitle from "../Generic/SettingsTitle";

interface HotkeyItemProps {
  combination: string;
  description: string;
}

const HotkeysSetting: FC = () => {
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

const HotkeyItem: FC<HotkeyItemProps> = ({ combination, description }) => {
  return (
    <div className="hotkey__item">
      <span className="hotkey__combination">{combination}</span>
      <span className="hotkey__description">{description}</span>
    </div>
  );
};

export default HotkeysSetting;
