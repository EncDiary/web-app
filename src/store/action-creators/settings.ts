import axios from "axios";
import { AES, enc, SHA256 } from "crypto-js";
import { Dispatch } from "redux";
import { serverErrorAlert } from "../../components/Generic/SweetAlert";
import { Actions } from "../../types";
import { Book } from "../../types/books";
import { Note } from "../../types/notes";
import { SettingsActionTypes } from "../../types/settings";
import { setLoading } from "./app";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export function setEditActionRedux(isEnabled: boolean) {
  return {
    type: SettingsActionTypes.SET_EDIT_ACTION,
    payload: isEnabled,
  };
}

export function setDeleteActionRedux(isEnabled: boolean) {
  return {
    type: SettingsActionTypes.SET_DELETE_ACTION,
    payload: isEnabled,
  };
}

export function exportNotesRedux(
  currentBook: Book,
  password: string,
  isEncrypted: boolean
) {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch(setLoading(true) as Actions);
    try {
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

      const data = isEncrypted
        ? getEncryptedData(response.data.notes, currentBook, password)
        : getDecryptedData(response.data.notes, currentBook, password);

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
    } catch {
      serverErrorAlert();
    } finally {
      dispatch(setLoading(false) as Actions);
    }
  };
}

const getEncryptedData = (
  notes: Note[],
  currentBook: Book,
  password: string
) => {
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

const getDecryptedData = (
  notes: Note[],
  currentBook: Book,
  password: string
) => {
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
