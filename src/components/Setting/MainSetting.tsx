import Button from "../Generic/Button";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import Switcher from "../Generic/Switcher";
import SettingsTitle from "../Generic/SettingsTitle";
import { confirmationAlert } from "../Generic/SweetAlert";

const MainSetting: React.FC = () => {
  const { setEditActionRedux, setDeleteActionRedux, setGoDownArrowAddNote } =
    useActions();

  function handleCheckEdit() {
    setEditActionRedux(!editAction);
  }

  function handleCheckDelete() {
    setDeleteActionRedux(!deleteAction);
  }

  const {
    settings: {
      noteActions: { editAction, deleteAction },
      additional: { goDownArrowAddNote },
    },
    books: { currentBook },
    app: { password },
  } = useTypedSelector((state) => state);

  const { exportNotesRedux } = useActions();

  const confirmGetDecryptedBackup = async () => {
    const result = await confirmationAlert({
      title: "Создать незашифрованный бэкап",
      text: "Хранение такого файла может быть не безопасно",
    });
    if (result.isConfirmed) {
      exportNotesRedux(currentBook, password, false);
    }
  };

  return (
    <>
      <SettingsTitle text="Основные настройки" level={1} />
      <SettingsTitle text="Экспорт записей" level={2} />
      <ul>
        <li>
          Экспорт в зашифрованном виде
          <Button
            onClick={() => exportNotesRedux(currentBook, password, true)}
            text="Скачать"
            className="button settings__button_inline"
          />
        </li>
        <li>
          Экспорт в чистом виде (небезопасно)
          <Button
            onClick={() => confirmGetDecryptedBackup()}
            text="Скачать"
            className="button settings__button_inline"
          />
        </li>
      </ul>

      <SettingsTitle text="Действия над записями" level={2} />

      <Switcher
        name="Редактирование"
        isEnabled={editAction}
        handleChange={handleCheckEdit}
      />
      <Switcher
        name="Удаление"
        isEnabled={deleteAction}
        handleChange={handleCheckDelete}
      />

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
