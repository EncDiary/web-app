import { SHA256, AES, enc } from "crypto-js";
import { Dispatch } from "redux";
import { Actions } from "../../types";
import { AppActionTypes } from "../../types/app";
import { Book } from "../../types/books";
import { Note, NotesActionTypes } from "../../types/notes";
import axios from "axios";
import { setLoading } from "./app";
import {
  errorAlert,
  serverErrorAlert,
  successAlert,
} from "../../components/Generic/SweetAlert";
import qs from "qs";

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
      url: serverUrl + "note",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        book_id: currentBook.id,
        password_hash: SHA256(password).toString(),
      }),
      params: {
        limit: limit,
        offset: offset,
      },
    });

    if (response.data.status) {
      const notes = await response.data.notes.map((note: Note) => {
        note["text"] = AES.decrypt(note["text"], password).toString(enc.Utf8);
        note.datetime = note.datetime * 1000;
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
    } else {
      errorAlert(response.data.message);
    }
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
        url: serverUrl + "note/create",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          text: AES.encrypt(text, password).toString(),
          book_id: currentBook_id,
          password_hash: SHA256(password).toString(),
        }),
      });

      const newNote = {
        text,
        id: response.data.note.id,
        datetime: response.data.note.datetime,
      };

      dispatch({
        type: NotesActionTypes.CREATE_NOTE,
        payload: newNote,
      });
      successAlert("Запись успешно добавлена");
      clearForm();
    } catch (error) {
      serverErrorAlert();
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
        url: serverUrl + `note/edit/${note_id}`,
        data: qs.stringify({
          text: AES.encrypt(text, password).toString(),
          password_hash: SHA256(password).toString(),
        }),
      });

      if (response.data.status) {
        dispatch({
          type: NotesActionTypes.EDIT_NOTE,
          payload: {
            id: note_id,
            text,
          },
        });
        successAlert("Запись успешно отредактирована");
        handleClose();
      } else {
        errorAlert(response.data.message);
      }
    } catch (error) {
      serverErrorAlert();
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
        url: serverUrl + `note/delete/${note_id}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          password_hash: SHA256(password).toString(),
        }),
      });

      if (response.data.status) {
        dispatch({
          type: NotesActionTypes.DELETE_NOTE,
          payload: note_id,
        });
        successAlert("Запись успешно удалена");
      } else {
        errorAlert(response.data.message);
      }
    } catch (error) {
      serverErrorAlert();
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
