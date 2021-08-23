import { SHA256, AES, enc } from "crypto-js";
import { Dispatch } from "redux";
import Swal from "sweetalert2";
import { Actions } from "../../types";
import { AppActionTypes } from "../../types/app";
import { Book } from "../../types/books";
import { Note, NotesActionTypes } from "../../types/notes";

const serverUrl = "https://cs53547.tmweb.ru/";

export function fetchNotesRedux(
  currentBook: Book,
  password: string,
  limit: number,
  offset: number,
  unsetFetching: () => void
) {
  return async (dispatch: Dispatch<Actions>) => {
    await fetch(serverUrl + "note/getNotes.php", {
      method: "POST",
      headers: {
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
        response["notes"].forEach((element: Note) => {
          element["text"] = AES.decrypt(element["text"], password).toString(
            enc.Utf8
          );
        });
        dispatch({
          type: NotesActionTypes.FETCH_NOTES,
          payload: response["notes"],
        });

        if (response["notes"].length < limit) {
          dispatch({
            type: AppActionTypes.SET_NOTES_OVER,
            payload: true,
          });
        }
      });
    unsetFetching();
  };
}

export function createNoteRedux(
  text: string,
  currentBook_id: number,
  password: string,
  clearForm: () => void
) {
  return async (dispatch: Dispatch<Actions>) => {
    await fetch(serverUrl + "note/addNote.php", {
      method: "POST",
      headers: {
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
          type: NotesActionTypes.CREATE_NOTE,
          payload: newNote,
        });

        Swal.fire({
          title: "Запись успешно добавлена",
          icon: "success",
          timer: 1000,
        });
        clearForm();
      });
  };
}

export function editNoteRedux(
  text: string,
  note_id: number,
  password: string,
  handleClose: () => void
) {
  return async (dispatch: Dispatch<Actions>) => {
    fetch(serverUrl + "note/editNote.php", {
      method: "POST",
      headers: {
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
            type: NotesActionTypes.EDIT_NOTE,
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
          handleClose();
        }
      });
  };
}

export function deleteNoteRedux(note_id: number, password: string) {
  return async (dispatch: Dispatch<Actions>) => {
    await fetch(serverUrl + "note/deleteNote.php", {
      method: "POST",
      headers: {
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
            type: NotesActionTypes.DELETE_NOTE,
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
    type: NotesActionTypes.CLEAR_NOTES,
  };
}
