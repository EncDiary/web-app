import {
  SettingsState,
  SettingsActionTypes,
  SettingAction,
} from "../../types/settings";

const initialState: SettingsState = {
  noteActions: {
    editAction: true,
    deleteAction: true,
  },
  additional: {
    goDownArrowAddNote: true,
  },
};

export const settingsReducer = (
  state = initialState,
  action: SettingAction
): SettingsState => {
  switch (action.type) {
    case SettingsActionTypes.SET_EDIT_ACTION:
      return {
        ...state,
        noteActions: { ...state.noteActions, editAction: action.payload },
      };

    case SettingsActionTypes.SET_DELETE_ACTION:
      return {
        ...state,
        noteActions: { ...state.noteActions, deleteAction: action.payload },
      };

    case SettingsActionTypes.SET_GO_DOWN_ARRAY:
      return {
        ...state,
        additional: { ...state.additional, goDownArrowAddNote: action.payload },
      };

    default:
      return state;
  }
};
