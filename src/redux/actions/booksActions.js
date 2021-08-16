import {
  CREATE_BOOK,
  FILL_BOOKS,
  FIND_BOOK,
  HIDE_BOOK,
  MOVE_BOOK_TO_TOP,
  SET_CURRENT_BOOK,
} from "../types";
import { SHA256 } from "crypto-js";
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

// export function unlockBookRedux(password, currentBook_id) {
//   return async (dispatch) => {
//     await fetch(serverUrl + "checkPassword.php", {
//       method: "POST",
//       header: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: JSON.stringify({
//         id: currentBook_id,
//         password_hash: SHA256(password).toString(),
//       }),
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         if (response["status"]) {
//           dispatch({
//             type: ENTER_PASSWORD,
//             payload: password,
//           });
//           console.log("login");
//         } else {
//           var input_field = document.getElementById("enter_password");
//           input_field.classList.add("input-shake", "input-error");
//           setTimeout(function () {
//             input_field.classList.remove("input-shake");
//           }, 1000);
//         }
//       });
//   };
// }

// export function lockBookRedux() {
//   return {
//     type: LOCK_BOOK,
//   };
// }

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
