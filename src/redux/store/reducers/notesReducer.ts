import { NotesState, NotesActionTypes, NoteAction } from "../../types/notes";

const initialState: NotesState = {
  notes: [],
};

export const notesReducer = (
  state = initialState,
  action: NoteAction
): NotesState => {
  switch (action.type) {
    case NotesActionTypes.FETCH_NOTES:
      return { ...state, notes: [...state.notes, ...action.payload] };

    case NotesActionTypes.CREATE_NOTE:
      return { ...state, notes: [action.payload, ...state.notes] };

    case NotesActionTypes.EDIT_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.id) {
            note.text = action.payload.text;
          }
          return note;
        }),
      };

    case NotesActionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(
          (note: { id: number }) => note.id !== action.payload
        ),
      };

    case NotesActionTypes.CLEAR_NOTES:
      return { ...state, notes: [] };

    default:
      return state;
  }
};
