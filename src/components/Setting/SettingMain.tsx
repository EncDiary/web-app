import { FC } from "react";
import ToggleSwitch from "../Generic/ToggleSwitch";
import Title from "../Generic/Title";
import SettingSection from "./SettingSection";
import store from "../../store";
import { observer } from "mobx-react-lite";

const SettingMain: FC = observer(() => {
  const { isEditable, isDeletable } = store.setting.noteActions;

  return (
    <>
      <Title text="Основное" align="left" />
      <SettingSection>
        <Title text="Действия над записями" size="medium" align="left" />
        <ToggleSwitch
          text="Редактирование"
          isEnabled={isEditable !== undefined ? isEditable : true}
          changeHandler={() => store.setting.setNoteActions("isEditable")}
        />
        <ToggleSwitch
          text="Удаление"
          isEnabled={isDeletable !== undefined ? isDeletable : true}
          changeHandler={() => store.setting.setNoteActions("isDeletable")}
        />
      </SettingSection>
    </>
  );
});

export default SettingMain;
