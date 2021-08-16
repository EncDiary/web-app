import {
  CLEAR_NOTES,
  CREATE_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  FETCH_NOTES,
} from "../types";

const initialState = {
  notes: [],
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return { ...state, notes: [...state.notes, ...action.payload] };
    case CREATE_NOTE:
      return { ...state, notes: [action.payload, ...state.notes] };
    case EDIT_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.id) {
            note.text = action.payload.text;
          }
          return note;
        }),
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case CLEAR_NOTES:
      return { ...state, notes: [] };
    default:
      return state;
  }
};
