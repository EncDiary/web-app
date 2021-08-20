import { BooksState, BooksActionTypes, BookAction } from "../../types/books";

const initialState: BooksState = {
  books: [],
  currentBook: { id: 0, title: "" },
};

export const booksReducer = (
  state = initialState,
  action: BookAction
): BooksState => {
  switch (action.type) {
    case BooksActionTypes.CREATE_BOOK:
      return {
        ...state,
        currentBook: action.payload,
        books: [action.payload, ...state.books],
      };

    case BooksActionTypes.FIND_BOOK:
      return {
        ...state,
        currentBook: action.payload,
        books: [
          action.payload,
          ...state.books.filter(
            (book: { id: number }) => book.id !== action.payload.id
          ),
        ],
      };

    case BooksActionTypes.HIDE_BOOK:
      const booksWithoutHidden = state.books.filter(
        (book: { id: number }) => book.id !== action.payload
      );
      return {
        ...state,
        currentBook:
          state.currentBook.id === action.payload
            ? booksWithoutHidden[0]
            : state.currentBook,
        books: booksWithoutHidden,
      };

    case BooksActionTypes.SET_CURRENT_BOOK:
      return { ...state, currentBook: action.payload };

    case BooksActionTypes.MOVE_BOOK_TO_TOP:
      return {
        ...state,
        books: [
          action.payload,
          ...state.books.filter(
            (book: { id: number }) => book.id !== action.payload.id
          ),
        ],
      };

    case BooksActionTypes.IMPORT_BOOK:
      return {
        ...state,
        currentBook: action.payload,
        books: [action.payload, ...state.books],
      };

    default:
      return state;
  }
};
