export interface SettingsState {
  displaying: {
    editAction: boolean;
    deleteAction: boolean;
  };
}

export enum SettingsActionTypes {
  SET_EDIT_ACTION = "SETTING/SET_EDIT_ACTION",
  SET_DELETE_ACTION = "SETTING/SET_DELETE_ACTION",
}

interface SetEditAction {
  type: SettingsActionTypes.SET_EDIT_ACTION;
  payload: boolean;
}

interface SetDeleteAction {
  type: SettingsActionTypes.SET_DELETE_ACTION;
  payload: boolean;
}

export type SettingAction = SetEditAction | SetDeleteAction;
