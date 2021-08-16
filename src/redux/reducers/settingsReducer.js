import { SET_DELETE_ACTION, SET_EDIT_ACTION } from "../types";

const initialState = {
  displaying: {
    editAction: true,
    deleteAction: true,
  },
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDIT_ACTION:
      return {
        ...state,
        displaying: { ...state.displaying, editAction: action.payload },
      };
    case SET_DELETE_ACTION:
      return {
        ...state,
        displaying: { ...state.displaying, deleteAction: action.payload },
      };
    default:
      return state;
  }
};
