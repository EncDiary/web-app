import {
  CREATE_BOOK,
  FILL_BOOKS,
  FIND_BOOK,
  HIDE_BOOK,
  IMPORT_BOOK,
  MOVE_BOOK_TO_TOP,
  SET_CURRENT_BOOK,
} from "../types";
import { SHA256, AES } from "crypto-js";
import Swal from "sweetalert2";
import { setCurrentOpeningTabRedux } from "./appActions";

const serverUrl = "https://cj38001.tmweb.ru/";

export function createBookRedux(title, password) {
  return async (dispatch) => {
    await fetch(serverUrl + "book/addBook.php", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        title: title,
        password_hash: SHA256(password).toString(),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        var newBook = {
          id: response["id"],
          title,
        };
        Swal.fire({
          title: "Новая книга успешно добавлена",
          icon: "success",
          timer: 1000,
        });
        dispatch({
          type: CREATE_BOOK,
          payload: newBook,
        });
        dispatch(setCurrentOpeningTabRedux("open"));
      });
  };
}

export function findBookRedux(title) {
  return async (dispatch) => {
    await fetch(serverUrl + "book/findBook.php", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["status"]) {
          Swal.fire({
            title: "Книга найдена и готова к расшифровке",
            icon: "success",
            timer: 1000,
          });
          dispatch({
            type: FIND_BOOK,
            payload: response["book"],
          });
          dispatch(setCurrentOpeningTabRedux("open"));
        } else {
          Swal.fire({
            title: "Такой книги нет",
            icon: "error",
            timer: 1000,
          });
        }
      });
  };
}

export function hideBookRedux(book_id) {
  return {
    type: HIDE_BOOK,
    payload: book_id,
  };
}

export function fillBooksRedux(books) {
  return {
    type: FILL_BOOKS,
    payload: books,
  };
}

export function setCurrentBookRedux(book) {
  return {
    type: SET_CURRENT_BOOK,
    payload: book,
  };
}

export function moveBookToTopRedux(book) {
  return {
    type: MOVE_BOOK_TO_TOP,
    payload: book,
  };
}

export function importBookRedux(title, password, file) {
  return async (dispatch) => {
    const notes = file.map((note) => {
      note.text = AES.encrypt(note.text, password).toString();
      return note;
    });

    await fetch(serverUrl + "book/importBook.php", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        title: title,
        password_hash: SHA256(password).toString(),
        notes: notes,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["status"]) {
          Swal.fire({
            title: "Книга успешно импортирована",
            icon: "success",
            timer: 1000,
          });
          dispatch({
            type: IMPORT_BOOK,
            payload: {
              id: response.book.id,
              title: title,
            },
          });
          dispatch(setCurrentOpeningTabRedux("open"));
        } else {
          Swal.fire({
            title: "Произошла ошибка",
            icon: "error",
            timer: 1000,
          });
        }
      });
  };
}
