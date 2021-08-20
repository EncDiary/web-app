import {
  SettingsState,
  SettingsActionTypes,
  SettingAction,
} from "../../types/settings";

const initialState: SettingsState = {
  displaying: {
    editAction: true,
    deleteAction: true,
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
        displaying: { ...state.displaying, editAction: action.payload },
      };

    case SettingsActionTypes.SET_DELETE_ACTION:
      return {
        ...state,
        displaying: { ...state.displaying, deleteAction: action.payload },
      };

    default:
      return state;
  }
};
