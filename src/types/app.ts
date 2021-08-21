export enum currentOpeningTabTypes {
  Open = "Open",
  Create = "Create",
  Find = "Find",
  Import = "Import",
}

export enum settingsTabTypes {
  None = "None",
  Main = "Main",
  Secure = "Secure",
  Hotkeys = "Hotkeys",
  About = "About",
}

export interface AppState {
  password: string;
  showSettings: settingsTabTypes;
  currentOpeningTab: currentOpeningTabTypes;
  isNotesOver: boolean;
}

export enum AppActionTypes {
  ENTER_PASSWORD = "APP/ENTER_PASSWORD",
  LOCK_BOOK = "APP/LOCK_BOOK",
  SET_SHOWING_SETTINGS = "APP/SET_SHOWING_SETTINGS",
  SET_CURRENT_OPENING_TAB = "APP/SET_CURRENT_OPENING_TAB",
  SET_NOTES_OVER = "APP/SET_NOTES_OVER",
  CHANGE_PASSWORD = "APP/CHANGE_PASSWORD",
}

interface EnterPasswordAction {
  type: AppActionTypes.ENTER_PASSWORD;
  payload: string;
}

interface LockBookAction {
  type: AppActionTypes.LOCK_BOOK;
}

interface SetShowingSettingsAction {
  type: AppActionTypes.SET_SHOWING_SETTINGS;
  payload: settingsTabTypes;
}

interface SetCurrentTabAction {
  type: AppActionTypes.SET_CURRENT_OPENING_TAB;
  payload: currentOpeningTabTypes;
}

interface SetNotesOverAction {
  type: AppActionTypes.SET_NOTES_OVER;
  payload: boolean;
}

interface ChangePasswordAction {
  type: AppActionTypes.CHANGE_PASSWORD;
  payload: string;
}

export type AppAction =
  | EnterPasswordAction
  | LockBookAction
  | SetShowingSettingsAction
  | SetCurrentTabAction
  | SetNotesOverAction
  | ChangePasswordAction;
