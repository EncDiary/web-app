import {
  CLEAR_NOTES,
  CREATE_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  FETCH_NOTES,
} from "../types";
import { SHA256, AES, enc } from "crypto-js";
import Swal from "sweetalert2";
import { setNotesOverRedux } from "./appActions";

const serverUrl = "https://cj38001.tmweb.ru/";

export function fetchNotesRedux(currentBook, password, limit, offset) {
  return async (dispatch) => {
    await fetch(serverUrl + "note/getNotes.php", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        id: currentBook.id,
        password_hash: SHA256(password).toString(),
        notes_list: { limit: limit, offset: offset },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        response["notes"].forEach((element) => {
          element["text"] = AES.decrypt(element["text"], password).toString(
            enc.Utf8
          );
        });
        dispatch({
          type: FETCH_NOTES,
          payload: response["notes"],
        });

        if (response["notes"].length < limit) {
          dispatch(setNotesOverRedux(true));
        }
      });
  };
}

export function createNoteRedux(text, currentBook_id, password) {
  return async (dispatch) => {
    await fetch(serverUrl + "note/addNote.php", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        text: AES.encrypt(text, password).toString(),
        book_id: currentBook_id,
        password_hash: SHA256(password).toString(),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        var newNote = {
          text,
          id: response["id"],
          datetime: response["datetime"],
        };

        dispatch({
          type: CREATE_NOTE,
          payload: newNote,
        });

        Swal.fire({
          title: "Запись успешно добавлена",
          icon: "success",
          timer: 1000,
        });
      });
  };
}

export function editNoteRedux(text, note_id, password) {
  return async (dispatch) => {
    fetch(serverUrl + "note/editNote.php", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        id: note_id,
        text: AES.encrypt(text, password).toString(),
        password_hash: SHA256(password).toString(),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["status"]) {
          dispatch({
            type: EDIT_NOTE,
            payload: {
              id: note_id,
              text,
            },
          });

          Swal.fire({
            title: "Запись успешно отредактирована",
            icon: "success",
            timer: 1000,
          });
        }
      });
  };
}

export function deleteNoteRedux(note_id, password) {
  return async (dispatch) => {
    await fetch(serverUrl + "note/deleteNote.php", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        id: note_id,
        password_hash: SHA256(password).toString(),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["status"]) {
          dispatch({
            type: DELETE_NOTE,
            payload: note_id,
          });
          Swal.fire({
            title: "Запись успешно удалена",
            icon: "success",
            timer: 1000,
          });
        } else {
          Swal.fire({
            title: "Что-то пошло не так",
            icon: "error",
            timer: 1000,
          });
        }
      });
  };
}

export function clearNotesRedux() {
  return {
    type: CLEAR_NOTES,
  };
}
