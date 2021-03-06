import { FC } from "react";
import ToggleSwitch from "../Generic/Input/ToggleSwitch";
import Title from "../Generic/Title";
import SettingSection from "./SettingSection";
import { observer } from "mobx-react-lite";
import SelectInput from "../Generic/Input/SelectInput";
import TextBlock from "../Generic/TextBlock";
import store from "../../store";

const SettingMain: FC = () => {
  return (
    <>
      <Title align="left">Основное</Title>
      <SettingNoteActions />
      <SettingListNotes />
      <SettingEditor />
    </>
  );
};

const SettingNoteActions: FC = observer(() => {
  const { isEditable, isDeletable } = store.settingStore.noteActions;

  return (
    <SettingSection>
      <Title size="medium" align="left">
        Действия над записями
      </Title>
      <ToggleSwitch
        text="Редактирование"
        isEnabled={isEditable}
        changeHandler={() => store.settingStore.setNoteActions("isEditable")}
      />
      <ToggleSwitch
        text="Удаление"
        isEnabled={isDeletable}
        changeHandler={() => store.settingStore.setNoteActions("isDeletable")}
      />
    </SettingSection>
  );
});

const SettingListNotes: FC = observer(() => {
  const notesNumber = store.settingStore.notesNumberPerPage;
  return (
    <SettingSection>
      <Title size="medium" align="left">
        Список записей
      </Title>
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
          onChange={(event) =>
            store.settingStore.setNotesNumberPerPage(+event.target.value)
          }
        />
      </TextBlock>
    </SettingSection>
  );
});

const SettingEditor = observer(() => {
  const isMenubarDisplayed = store.settingStore.editor.isMenubarDisplayed;
  return (
    <SettingSection>
      <Title size="medium" align="left">
        Редактор
      </Title>
      <ToggleSwitch
        text="Показывать панель инструментов"
        isEnabled={isMenubarDisplayed}
        changeHandler={() => store.settingStore.setEditor()}
      />
    </SettingSection>
  );
});

export default SettingMain;
