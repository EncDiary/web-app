import { SettingsActionTypes } from "../../types/settings";

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
