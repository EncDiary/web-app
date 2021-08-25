import { SHA256, AES } from "crypto-js";
import Swal from "sweetalert2";
import { Dispatch } from "redux";
import { Book, BooksActionTypes } from "../../types/books";
import { AppActionTypes, currentOpeningTabTypes } from "../../types/app";
import { Note } from "../../types/notes";
import { Actions } from "../../types";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export function createBookRedux(title: string, password: string) {
  return async (dispatch: Dispatch<Actions>) => {
    const response = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: serverUrl + "book/addBook.php",
      data: {
        title: title,
        password_hash: SHA256(password).toString(),
      },
    });

    const newBook = {
      id: response.data.id,
      title,
    };
    Swal.fire({
      title: "Новая книга успешно добавлена",
      icon: "success",
      timer: 1000,
    });
    dispatch({
      type: BooksActionTypes.CREATE_BOOK,
      payload: newBook,
    });
    dispatch({
      type: AppActionTypes.SET_CURRENT_OPENING_TAB,
      payload: currentOpeningTabTypes.Open,
    });
  };
}

export function findBookRedux(title: string) {
  return async (dispatch: Dispatch<Actions>) => {
    const response = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: serverUrl + "book/findBook.php",
      data: {
        title: title,
      },
    });

    if (response.data.status) {
      Swal.fire({
        title: "Книга найдена и готова к расшифровке",
        icon: "success",
        timer: 1000,
      });
      dispatch({
        type: BooksActionTypes.FIND_BOOK,
        payload: response.data.book,
      });
      dispatch({
        type: AppActionTypes.SET_CURRENT_OPENING_TAB,
        payload: currentOpeningTabTypes.Open,
      });
    } else {
      Swal.fire({
        title: "Такой книги нет",
        icon: "error",
        timer: 1000,
      });
    }
  };
}

export function hideBookRedux(book_id: number) {
  return {
    type: BooksActionTypes.HIDE_BOOK,
    payload: book_id,
  };
}

export function setCurrentBookRedux(book: Book) {
  return {
    type: BooksActionTypes.SET_CURRENT_BOOK,
    payload: book,
  };
}

export function moveBookToTopRedux(book: Book) {
  return {
    type: BooksActionTypes.MOVE_BOOK_TO_TOP,
    payload: book,
  };
}

export function importBookRedux(title: string, password: string, file: Note[]) {
  return async (dispatch: Dispatch<Actions>) => {
    const notes = file.map((note) => {
      note.text = AES.encrypt(note.text, password).toString();
      return note;
    });

    const response = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: serverUrl + "book/importBook.php",
      data: {
        title: title,
        password_hash: SHA256(password).toString(),
        notes: notes,
      },
    });

    if (response.data.status) {
      Swal.fire({
        title: "Книга успешно импортирована",
        icon: "success",
        timer: 1000,
      });
      dispatch({
        type: BooksActionTypes.IMPORT_BOOK,
        payload: {
          id: response.data.book.id,
          title: title,
        },
      });
      dispatch({
        type: AppActionTypes.SET_CURRENT_OPENING_TAB,
        payload: currentOpeningTabTypes.Open,
      });
    } else {
      Swal.fire({
        title: "Произошла ошибка",
        icon: "error",
        timer: 1000,
      });
    }
  };
}
