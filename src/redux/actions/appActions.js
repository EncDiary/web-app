import {
  ENTER_PASSWORD,
  LOCK_BOOK,
  SET_CURRENT_OPENING_TAB,
  SET_NOTES_OVER,
  SET_SHOWING_SETTINGS,
} from "../types";
import { SHA256 } from "crypto-js";
import { clearNotesRedux } from "./notesActions";
import { moveBookToTopRedux } from "./booksActions";

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
