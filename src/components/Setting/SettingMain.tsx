import { FC } from "react";
import ToggleSwitch from "../Generic/ToggleSwitch";
import Title from "../Generic/Title";
import SettingSection from "./SettingSection";
import store from "../../store";
import { observer } from "mobx-react-lite";
import { SelectInput } from "../Generic/Input";
import TextBlock from "../Generic/TextBlock";

const SettingMain: FC = () => {
  return (
    <>
      <Title text="Основное" align="left" />
      <SettingNoteActions />
      <SettingListNotes />
    </>
  );
};

const SettingNoteActions: FC = observer(() => {
  const { isEditable, isDeletable } = store.setting.noteActions;

  return (
    <SettingSection>
      <Title text="Действия над записями" size="medium" align="left" />
      <ToggleSwitch
        text="Редактирование"
        isEnabled={isEditable}
        changeHandler={() => store.setting.setNoteActions("isEditable")}
      />
      <ToggleSwitch
        text="Удаление"
        isEnabled={isDeletable}
        changeHandler={() => store.setting.setNoteActions("isDeletable")}
      />
    </SettingSection>
  );
});

const SettingListNotes: FC = observer(() => {
  const notesNumber = store.setting.notesNumberPerPage;
  return (
    <SettingSection>
      <Title text="Список записей" size="medium" align="left" />
      <TextBlock>
        Количество отображаемых записей:
        <SelectInput
          options={[
            { value: 10, content: 10 },
            { value: 20, content: 20 },
            { value: 50, content: 50 },
            { value: 100, content: 100 },
            { value: 300, content: 300 },
          ]}
          selectedValue={notesNumber}
        />
      </TextBlock>
    </SettingSection>
  );
});

export default SettingMain;
