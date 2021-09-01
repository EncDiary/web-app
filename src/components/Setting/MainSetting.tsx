import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import Switcher from "../Generic/Switcher";
import SettingsTitle from "../Generic/SettingsTitle";
import { FC } from "react";

const MainSetting: FC = () => {
  return (
    <>
      <SettingsTitle text="Основные настройки" level={1} />
      <NoteActionsSetting />
      <AdditionalSetting />
    </>
  );
};

const NoteActionsSetting: FC = () => {
  const { editAction, deleteAction } = useTypedSelector(
    (state) => state.settings.noteActions
  );

  const { setEditActionRedux, setDeleteActionRedux } = useActions();

  return (
    <>
      <SettingsTitle text="Действия над записями" level={2} />
      <Switcher
        name="Редактирование"
        isEnabled={editAction}
        handleChange={() => setEditActionRedux(!editAction)}
      />
      <Switcher
        name="Удаление"
        isEnabled={deleteAction}
        handleChange={() => setDeleteActionRedux(!deleteAction)}
      />
    </>
  );
};

const AdditionalSetting: FC = () => {
  const { setGoDownArrowAddNote } = useActions();

  const goDownArrowAddNote = useTypedSelector(
    (state) => state.settings.additional.goDownArrowAddNote
  );

  return (
    <>
      <SettingsTitle text="Дополнительно" level={2} />
      <Switcher
        name="Стрелка под формой добавления записи"
        isEnabled={goDownArrowAddNote}
        handleChange={() => setGoDownArrowAddNote(!goDownArrowAddNote)}
      />
    </>
  );
};

export default MainSetting;
