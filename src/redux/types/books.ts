export interface Book {
  id: number;
  title: string;
}

export interface BooksState {
  books: Book[];
  currentBook: Book;
}

export enum BooksActionTypes {
  CREATE_BOOK = "BOOK/CREATE_BOOK",
  FIND_BOOK = "BOOK/FIND_BOOK",
  HIDE_BOOK = "BOOK/HIDE_BOOK",
  SET_CURRENT_BOOK = "BOOK/SET_CURRENT_BOOK",
  MOVE_BOOK_TO_TOP = "BOOK/MOVE_BOOK_TO_TOP",
  IMPORT_BOOK = "BOOK/IMPORT_BOOK",
}

interface CreateBookAction {
  type: BooksActionTypes.CREATE_BOOK;
  payload: Book;
}

interface FindBookAction {
  type: BooksActionTypes.FIND_BOOK;
  payload: Book;
}

interface HideBookAction {
  type: BooksActionTypes.HIDE_BOOK;
  payload: number;
}

interface SetCurrentBookAction {
  type: BooksActionTypes.SET_CURRENT_BOOK;
  payload: Book;
}

interface MoveBookToTopAction {
  type: BooksActionTypes.MOVE_BOOK_TO_TOP;
  payload: Book;
}

interface ImportBookAction {
  type: BooksActionTypes.IMPORT_BOOK;
  payload: Book;
}

export type BookAction =
  | CreateBookAction
  | FindBookAction
  | HideBookAction
  | SetCurrentBookAction
  | MoveBookToTopAction
  | ImportBookAction;
