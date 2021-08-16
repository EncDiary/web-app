import React from "react";
import Button from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { SHA256 } from "crypto-js";
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

  function onClickExport() {
    exportEncyptNotes();
  }

  const serverUrl = "https://cj38001.tmweb.ru/";
  const currentBook = useSelector((state) => state.books.currentBook);
  const password = useSelector((state) => state.app.password);

  function exportEncyptNotes() {
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
        const myData = response["notes"];
        const fileName = "file";
        const json = JSON.stringify(myData);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
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
            onClick={onClickExport}
            text="Скачать"
            className="button settings__button_inline"
          />
        </li>
        <li>
          Экспорт в чистом виде (небезопасно)
          <Button
            onClick={onClickExport}
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
