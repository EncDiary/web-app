export interface Note {
  id: number;
  text: string;
  datetime: number;
}

export interface NoteInfo {
  text: string;
  datetime: number;
}

export interface NotesState {
  notes: Note[];
}

export enum NotesActionTypes {
  FETCH_NOTES = "NOTES/FETCH_NOTES",
  CREATE_NOTE = "NOTE/CREATE_NOTE",
  EDIT_NOTE = "NOTE/EDIT_NOTE",
  DELETE_NOTE = "NOTE/DELETE_NOTE",
  CLEAR_NOTES = "NOTE/CLEAR_NOTES",
}

interface FetchNotesAction {
  type: NotesActionTypes.FETCH_NOTES;
  payload: Note[];
}

interface CreateNoteAction {
  type: NotesActionTypes.CREATE_NOTE;
  payload: Note;
}

interface EditNoteAction {
  type: NotesActionTypes.EDIT_NOTE;
  payload: { id: number; text: string };
}

interface DeleteNoteAction {
  type: NotesActionTypes.DELETE_NOTE;
  payload: number;
}

interface ClearNotesAction {
  type: NotesActionTypes.CLEAR_NOTES;
}

export type NoteAction =
  | FetchNotesAction
  | CreateNoteAction
  | EditNoteAction
  | DeleteNoteAction
  | ClearNotesAction;
