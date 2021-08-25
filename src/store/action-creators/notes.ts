import { SHA256, AES, enc } from "crypto-js";
import { Dispatch } from "redux";
import Swal from "sweetalert2";
import { Actions } from "../../types";
import { AppActionTypes } from "../../types/app";
import { Book } from "../../types/books";
import { Note, NotesActionTypes } from "../../types/notes";
import axios from "axios";
import { setLoading } from "./app";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export function fetchNotesRedux(
  currentBook: Book,
  password: string,
  limit: number,
  offset: number,
  unsetFetching: () => void
) {
  return async (dispatch: Dispatch<Actions>) => {
    const response = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: serverUrl + "note/getNotes.php",
      data: {
        id: currentBook.id,
        password_hash: SHA256(password).toString(),
        notes_list: { limit: limit, offset: offset },
      },
    });

    const notes = await response.data.notes.map((note: Note) => {
      note["text"] = AES.decrypt(note["text"], password).toString(enc.Utf8);
      return note;
    });

    dispatch({
      type: NotesActionTypes.FETCH_NOTES,
      payload: notes,
    });

    if (notes.length < limit) {
      dispatch({
        type: AppActionTypes.SET_NOTES_OVER,
        payload: true,
      });
    }
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
    dispatch(setLoading(true) as Actions);

    try {
      const response = await axios({
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: serverUrl + "note/addNote.php",
        data: {
          text: AES.encrypt(text, password).toString(),
          book_id: currentBook_id,
          password_hash: SHA256(password).toString(),
        },
      });

      const newNote = {
        text,
        id: response.data.id,
        datetime: response.data.datetime,
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
    } catch (error) {
      console.log("Сервер не доступен");
      console.log(error);
    } finally {
      dispatch(setLoading(false) as Actions);
    }
  };
}

export function editNoteRedux(
  text: string,
  note_id: number,
  password: string,
  handleClose: () => void
) {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch(setLoading(true) as Actions);

    try {
      const response = await axios({
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: serverUrl + "note/editNote.php",
        data: {
          id: note_id,
          text: AES.encrypt(text, password).toString(),
          password_hash: SHA256(password).toString(),
        },
      });

      if (response.data.status) {
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
    } catch (error) {
      console.log("Сервер не доступен");
      console.log(error);
    } finally {
      dispatch(setLoading(false) as Actions);
    }
  };
}

export function deleteNoteRedux(note_id: number, password: string) {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch(setLoading(true) as Actions);

    try {
      const response = await axios({
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: serverUrl + "note/deleteNote.php",
        data: {
          id: note_id,
          password_hash: SHA256(password).toString(),
        },
      });

      if (response.data.status) {
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
    } catch (error) {
      console.log("Сервер не доступен");
      console.log(error);
    } finally {
      dispatch(setLoading(false) as Actions);
    }
  };
}

export function clearNotesRedux() {
  return {
    type: NotesActionTypes.CLEAR_NOTES,
  };
}
