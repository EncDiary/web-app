import React from "react";
import Button from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { SHA256, AES, enc } from "crypto-js";
import {
  setDeleteActionRedux,
  setEditActionRedux,
} from "../redux/actions/settingsActions";

function MainSetting() {
  const dispatch = useDispatch();

  const editAction = useSelector(
    (state) => state.settings.displaying.editAction
  );
  const deleteAction = useSelector(
    (state) => state.settings.displaying.deleteAction
  );

  function handleCheckEdit() {
    dispatch(setEditActionRedux(!editAction));
  }

  function handleCheckDelete() {
    dispatch(setDeleteActionRedux(!deleteAction));
  }

  const serverUrl = "https://cj38001.tmweb.ru/";
  const currentBook = useSelector((state) => state.books.currentBook);
  const password = useSelector((state) => state.app.password);

  function exportEncryptedNotes() {
    fetch(serverUrl + "note/getAllNotes.php", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        id: currentBook.id,
        password_hash: SHA256(password).toString(),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const notes_data = response["notes"].map((note) => {
          delete note.id;
          return note;
        });

        const data = {
          title: currentBook.title,
          is_encrypted: true,
          password_hash: SHA256(password).toString(),
          backup_date: new Date().toLocaleString(),
          notes: notes_data,
        };
        downloadJson(data);
      });
  }

  function exportDecryptedNotes() {
    fetch(serverUrl + "note/getAllNotes.php", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        id: currentBook.id,
        password_hash: SHA256(password).toString(),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const notes_data = response["notes"].map((note) => {
          delete note.id;
          note.text = AES.decrypt(note.text, password).toString(enc.Utf8);
          return note;
        });

        const data = {
          title: currentBook.title,
          is_encrypted: false,
          backup_date: new Date().toLocaleString(),
          notes: notes_data,
        };
        downloadJson(data);
      });
  }

  function downloadJson(data) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "file.json";
    link.click();
  }

  return (
    <>
      <h1 className="title settings__title settings__title_primary">
        Основные настройки
      </h1>
      <h2 className="title settings__title settings__title_secondary">
        Экспорт записей
      </h2>
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

      <h2 className="title settings__title settings__title_secondary">
        Действия над записями
      </h2>
      <div className="switcher">
        <label className="checkbox-ios">
          <input
            type="checkbox"
            checked={editAction}
            onChange={handleCheckEdit}
          />
          <span className="checkbox-ios-switch"></span>
        </label>
        Редактирование
      </div>
      <div className="switcher">
        <label className="checkbox-ios">
          <input
            type="checkbox"
            checked={deleteAction}
            onChange={handleCheckDelete}
          />
          <span className="checkbox-ios-switch"></span>
        </label>
        Удаление
      </div>
    </>
  );
}

export default MainSetting;
