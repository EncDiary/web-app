import {
  CHANGE_PASSWORD,
  ENTER_PASSWORD,
  LOCK_BOOK,
  SET_CURRENT_OPENING_TAB,
  SET_NOTES_OVER,
  SET_SHOWING_SETTINGS,
} from "../types";
import { SHA256, AES, enc } from "crypto-js";
import { clearNotesRedux } from "./notesActions";
import { moveBookToTopRedux } from "./booksActions";
import Swal from "sweetalert2";

const serverUrl = "https://cj38001.tmweb.ru/";

export function unlockBookRedux(password, currentBook) {
  return async (dispatch) => {
    await fetch(serverUrl + "checkPassword.php", {
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
        if (response["status"]) {
          dispatch({
            type: ENTER_PASSWORD,
            payload: password,
          });
          dispatch(moveBookToTopRedux(currentBook));
        } else {
          var input_field = document.getElementById("enter_password");
          input_field.classList.add("input-shake", "input-error");
          setTimeout(function () {
            input_field.classList.remove("input-shake");
          }, 1000);
        }
      });
  };
}

export function lockBookRedux() {
  return (dispatch) => {
    dispatch({
      type: LOCK_BOOK,
    });
    dispatch(clearNotesRedux());
    dispatch(setShowingSettingsRedux(false));
    dispatch(setNotesOverRedux(false));
  };
}

export function setShowingSettingsRedux(currentSettingsTab) {
  return {
    type: SET_SHOWING_SETTINGS,
    payload: currentSettingsTab,
  };
}

export function setCurrentOpeningTabRedux(openingTab) {
  return {
    type: SET_CURRENT_OPENING_TAB,
    payload: openingTab,
  };
}

export function setNotesOverRedux(isNotesOver) {
  return {
    type: SET_NOTES_OVER,
    payload: isNotesOver,
  };
}

export function changePasswordRedux(currentBook, password, formFields) {
  return async (dispatch) => {
    await fetch(serverUrl + "note/getAllNotes.php", {
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
        var notesWithNewPassword = response["notes"].map((note) => {
          const decryptedText = AES.decrypt(note.text, password).toString(
            enc.Utf8
          );
          const encryptedText = AES.encrypt(
            decryptedText,
            formFields.new_password
          ).toString();

          return {
            id: note.id,
            text: encryptedText,
          };
        });
        console.log(notesWithNewPassword);

        // Отправка запроса на сервер

        fetch(serverUrl + "changePassword.php", {
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify({
            book_id: currentBook.id,
            old_password_hash: SHA256(password).toString(),
            new_password_hash: SHA256(formFields.new_password).toString(),
            notes: notesWithNewPassword,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              Swal.fire({
                title: "Пароль успешно изменен",
                icon: "success",
                timer: 1000,
              });
              dispatch({
                type: CHANGE_PASSWORD,
                payload: formFields.new_password,
              });
            } else {
              Swal.fire({
                title: "Ошибка смены пароля",
                icon: "error",
                timer: 1000,
              });
            }
          });
      });
  };
}