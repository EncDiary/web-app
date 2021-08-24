import Button from "../Generic/Button";
import { SHA256, AES, enc } from "crypto-js";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Note, NoteInfo } from "../../types/notes";
import { useActions } from "../../hooks/useActions";
import axios from "axios";
import Switcher from "../Generic/Switcher";
import SettingsTitle from "../Generic/SettingsTitle";

interface IExportData {
  title: string;
  is_encrypted: boolean;
  password_hash?: string;
  backup_date: string;
  notes: NoteInfo[];
}

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

  const serverUrl = "https://cs53547.tmweb.ru/";
  const currentBook = useTypedSelector((state) => state.books.currentBook);
  const password = useTypedSelector((state) => state.app.password);

  async function exportEncryptedNotes() {
    const response = await axios({
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

    const notes_data: NoteInfo[] = response.data.notes.map((note: Note) => {
      return {
        text: note.text,
        datetime: note.datetime,
      };
    });

    const data = {
      title: currentBook.title,
      is_encrypted: true,
      password_hash: SHA256(password).toString(),
      backup_date: new Date().toLocaleString(),
      notes: notes_data,
    };
    downloadJson(data);
  }

  async function exportDecryptedNotes() {
    const response = await axios({
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
    const notes_data: NoteInfo[] = response.data.notes.map((note: Note) => {
      return {
        text: AES.decrypt(note.text, password).toString(enc.Utf8),
        datetime: note.datetime,
      };
    });

    const data = {
      title: currentBook.title,
      is_encrypted: false,
      backup_date: new Date().toLocaleString(),
      notes: notes_data,
    };
    downloadJson(data);
  }

  function downloadJson(data: IExportData) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "file.json";
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
            onClick={exportEncryptedNotes}
            text="Скачать"
            className="button settings__button_inline"
          />
        </li>
        <li>
          Экспорт в чистом виде (небезопасно)
          <Button
            onClick={exportDecryptedNotes}
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
