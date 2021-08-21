import { SHA256, AES, enc } from "crypto-js";
import Swal from "sweetalert2";
import { Dispatch } from "redux";
import { AppActionTypes } from "../../types/app";
import { Book, BooksActionTypes } from "../../types/books";
import { Note, NotesActionTypes } from "../../types/notes";
import { Actions } from "../../types";

const serverUrl = "https://cs53547.tmweb.ru/";

export function unlockBookRedux(password: string, currentBook: Book) {
  return async (dispatch: Dispatch<Actions>) => {
    await fetch(serverUrl + "checkPassword.php", {
      method: "POST",
      headers: {
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
            type: AppActionTypes.ENTER_PASSWORD,
            payload: password,
          });
          dispatch({
            type: BooksActionTypes.MOVE_BOOK_TO_TOP,
            payload: currentBook,
          });
        } else {
          var input_field = document.getElementById("enter_password");
          input_field?.classList.add("input-shake", "input-error");
          setTimeout(function () {
            input_field?.classList.remove("input-shake");
          }, 1000);
        }
      });
  };
}

export function lockBookRedux() {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: AppActionTypes.LOCK_BOOK,
    });
    dispatch({
      type: NotesActionTypes.CLEAR_NOTES,
    });
    dispatch({
      type: AppActionTypes.SET_NOTES_OVER,
      payload: false,
    });
  };
}

export function setShowingSettingsRedux(currentSettingsTab: string | boolean) {
  return {
    type: AppActionTypes.SET_SHOWING_SETTINGS,
    payload: currentSettingsTab,
  };
}

export function setCurrentOpeningTabRedux(openingTab: string) {
  return {
    type: AppActionTypes.SET_CURRENT_OPENING_TAB,
    payload: openingTab,
  };
}

export function setNotesOverRedux(isNotesOver: boolean) {
  return {
    type: AppActionTypes.SET_NOTES_OVER,
    payload: isNotesOver,
  };
}

export function changePasswordRedux(
  currentBook: Book,
  password: string,
  formFields: { new_password: string }
) {
  return async (dispatch: Dispatch<Actions>) => {
    await fetch(serverUrl + "note/getAllNotes.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        id: currentBook.id,
        password_hash: SHA256(password).toString(),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        var notesWithNewPassword = response["notes"].map((note: Note) => {
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
        return notesWithNewPassword;
      })
      .then((notesWithNewPassword) => {
        fetch(serverUrl + "changePassword.php", {
          method: "POST",
          headers: {
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
                type: AppActionTypes.CHANGE_PASSWORD,
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