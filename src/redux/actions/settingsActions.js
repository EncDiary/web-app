import { SET_DELETE_ACTION, SET_EDIT_ACTION } from "../types";

export function setEditActionRedux(isEnabled) {
  return {
    type: SET_EDIT_ACTION,
    payload: isEnabled,
  };
}

export function setDeleteActionRedux(isEnabled) {
  return {
    type: SET_DELETE_ACTION,
    payload: isEnabled,
  };
}
