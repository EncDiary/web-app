import {
  AppState,
  AppActionTypes,
  AppAction,
  currentOpeningTabTypes,
  settingsTabTypes,
} from "../../types/app";

const initialState: AppState = {
  password: "",
  showSettings: settingsTabTypes.None,
  currentOpeningTab: currentOpeningTabTypes.Open,
  isNotesOver: false,
};

export const appReducer = (
  state = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case AppActionTypes.ENTER_PASSWORD:
      return { ...state, password: action.payload };

    case AppActionTypes.LOCK_BOOK:
      return { ...state, password: "" };

    case AppActionTypes.SET_SHOWING_SETTINGS:
      return { ...state, showSettings: action.payload };

    case AppActionTypes.SET_CURRENT_OPENING_TAB:
      return { ...state, currentOpeningTab: action.payload };

    case AppActionTypes.SET_NOTES_OVER:
      return { ...state, isNotesOver: action.payload };

    case AppActionTypes.CHANGE_PASSWORD:
      return { ...state, password: action.payload };

    default:
      return state;
  }
};
