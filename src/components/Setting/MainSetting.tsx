import Button from "../Generic/Button";
import { SHA256, AES, enc } from "crypto-js";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Note, NoteInfo } from "../../types/notes";
import { useActions } from "../../hooks/useActions";
import axios from "axios";
import Switcher from "../Generic/Switcher";
import SettingsTitle from "../Generic/SettingsTitle";
import { Book } from "../../types/books";

const MainSetting: React.FC = () => {
  const { setEditActionRedux, setDeleteActionRedux } = useActions();

  const editAction = useTypedSelector(
    (state) => state.settings.displaying.editAction
  );
  const deleteAction = useTypedSelector(
    (state) => state.settings.displaying.deleteAction
  );

  function handleCheckEdit() {
    setEditActionRedux(!editAction);
  }

  function handleCheckDelete() {
    setDeleteActionRedux(!deleteAction);
  }

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const currentBook = useTypedSelector((state) => state.books.currentBook);
  const password = useTypedSelector((state) => state.app.password);

  const getEncryptedData = (notes: Note[]) => {
    const notes_data = notes.map((note: Note) => {
      return {
        text: note.text,
        datetime: note.datetime,
      };
    });

    return {
      title: currentBook.title,
      is_encrypted: true,
      password_hash: SHA256(password).toString(),
      backup_date: new Date().toLocaleString(),
      notes: notes_data,
    };
  };

  const getDecryptedData = (notes: Note[]) => {
    const notes_data = notes.map((note: Note) => {
      return {
        text: AES.decrypt(note.text, password).toString(enc.Utf8),
        datetime: note.datetime,
      };
    });

    return {
      title: currentBook.title,
      is_encrypted: false,
      backup_date: new Date().toLocaleString(),
      notes: notes_data,
    };
  };

  function fetchAllNotes(currentBook: Book, password: string) {
    return axios({
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: serverUrl + "note/getAllNotes.php",
      data: {
        id: currentBook.id,
        password_hash: SHA256(password).toString(),
      },
    });
  }

  async function exportNotes(isEncrypted: boolean) {
    const response = await fetchAllNotes(currentBook, password);

    const data = isEncrypted
      ? getEncryptedData(response.data.notes)
      : getDecryptedData(response.data.notes);

    const filename =
      (isEncrypted ? "Encrypt" : "Decrypt") +
      " - Web Diary - " +
      data.backup_date;

    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.json`;
    link.click();
  }

  return (
    <>
      <SettingsTitle text="Основные настройки" level={1} />
      <SettingsTitle text="Экспорт записей" level={2} />
      <ul>
        <li>
          Экспорт в зашифрованном виде
          <Button
            onClick={() => exportNotes(true)}
            text="Скачать"
            className="button settings__button_inline"
          />
        </li>
        <li>
          Экспорт в чистом виде (небезопасно)
          <Button
            onClick={() => exportNotes(false)}
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
    </>
  );
};

export default MainSetting;
