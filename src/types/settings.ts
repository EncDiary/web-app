export interface SettingsState {
  noteActions: {
    editAction: boolean;
    deleteAction: boolean;
  };
  additional: {
    goDownArrowAddNote: boolean;
  };
}

export enum SettingsActionTypes {
  SET_EDIT_ACTION = "SETTING/SET_EDIT_ACTION",
  SET_DELETE_ACTION = "SETTING/SET_DELETE_ACTION",
  SET_GO_DOWN_ARRAY = "SETTING/SET_GO_DOWN_ARRAY",
}

interface SetEditAction {
  type: SettingsActionTypes.SET_EDIT_ACTION;
  payload: boolean;
}

interface SetDeleteAction {
  type: SettingsActionTypes.SET_DELETE_ACTION;
  payload: boolean;
}

interface SetGoDownArrowAddNote {
  type: SettingsActionTypes.SET_GO_DOWN_ARRAY;
  payload: boolean;
}

export type SettingAction =
  | SetEditAction
  | SetDeleteAction
  | SetGoDownArrowAddNote;
