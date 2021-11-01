import { FC } from "react";
import Title from "../Generic/Title";
import "./SettingHotkey.scss";
import SettingSection from "./SettingSection";

interface HotkeyCodeProps {
  text: string;
}

const SettingHotkey: FC = () => {
  return (
    <>
      <Title text="Горячие клавиши" align="left" />
      <SettingSection>
        <Title text="Для текстового редактора" size="medium" align="left" />
        <ul className="hotkeys">
          <HotkeyItem>
            <HotkeyCode text="Ctrl + B" /> или <HotkeyCode text="__text__" />{" "}
            или <HotkeyCode text="**text**" /> – Жирный шрифт
          </HotkeyItem>
          <HotkeyItem>
            <HotkeyCode text="Ctrl + I" /> или <HotkeyCode text="_text_" /> или{" "}
            <HotkeyCode text="*text*" /> – Курсив
          </HotkeyItem>
          <HotkeyItem>
            <HotkeyCode text="Ctrl + Shift + 7" /> или{" "}
            <HotkeyCode text="1. text" /> – Нумерованный список
          </HotkeyItem>
          <HotkeyItem>
            <HotkeyCode text="Ctrl + Shift + 8" /> или{" "}
            <HotkeyCode text="- text" /> – Ненумерованный список
          </HotkeyItem>
          <HotkeyItem>
            <HotkeyCode text="Ctrl + Z" /> – Отменить действие
          </HotkeyItem>
          <HotkeyItem>
            <HotkeyCode text="Ctrl + Shift + Z" /> – Повторить действие
          </HotkeyItem>
        </ul>
      </SettingSection>
    </>
  );
};

const HotkeyItem: FC = ({ children }) => {
  return <li className="hotkey">{children}</li>;
};

const HotkeyCode: FC<HotkeyCodeProps> = ({ text }) => {
  return <span className="hotkey__code">{text}</span>;
};

export default SettingHotkey;
