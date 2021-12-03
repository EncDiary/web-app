import { FC } from "react";
import { TableHotkeys } from "../Generic/Table";
import Title from "../Generic/Title";
import SettingSection from "./SettingSection";

const SettingHotkey: FC = () => {
  return (
    <>
      <Title text="Горячие клавиши" align="left" />
      <SettingSection>
        <Title text="Для текстового редактора" size="medium" align="left" />
        <TableHotkeys
          header={["Действие", "Горячая клавиша"]}
          rows={[
            { action: "Жирный", hotkeys: ["Ctrl + B", "__text__", "**text**"] },
            { action: "Курсив", hotkeys: ["Ctrl + I", "_text_", "*text*"] },
            {
              action: "Нумерованный список",
              hotkeys: ["Ctrl + Shift + 7", "1. text"],
            },
            {
              action: "Ненумерованный список",
              hotkeys: ["Ctrl + Shift + 8", "- text"],
            },
            { action: "Отменить действие", hotkeys: ["Ctrl + Z"] },
            { action: "Повторить действие", hotkeys: ["Ctrl + Shift + Z"] },
          ]}
        />
      </SettingSection>
    </>
  );
};

export default SettingHotkey;
