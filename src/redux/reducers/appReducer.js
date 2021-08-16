import {
  ENTER_PASSWORD,
  LOCK_BOOK,
  SET_CURRENT_OPENING_TAB,
  SET_NOTES_OVER,
  SET_SHOWING_SETTINGS,
} from "../types";

const initialState = {
  app: [],
  password: "",
  showSettings: false,
  currentOpeningTab: "open",
  notesOver: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENTER_PASSWORD:
      return { ...state, password: action.payload };
    case LOCK_BOOK:
      return { ...state, password: "" };
    case SET_SHOWING_SETTINGS:
      return { ...state, showSettings: action.payload };
    case SET_CURRENT_OPENING_TAB:
      return { ...state, currentOpeningTab: action.payload };
    case SET_NOTES_OVER:
      return { ...state, notesOver: action.payload };
    default:
      return state;
  }
};
