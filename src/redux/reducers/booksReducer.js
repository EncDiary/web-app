import {
  CREATE_BOOK,
  FILL_BOOKS,
  FIND_BOOK,
  HIDE_BOOK,
  MOVE_BOOK_TO_TOP,
  SET_CURRENT_BOOK,
} from "../types";

const initialState = {
  books: [],
  currentBook: {},
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOOK:
      return {
        ...state,
        currentBook: action.payload,
        books: [action.payload, ...state.books],
      };
    case FIND_BOOK:
      return {
        ...state,
        currentBook: action.payload,
        books: [
          action.payload,
          ...state.books.filter((book) => book.id !== action.payload.id),
        ],
      };
    case HIDE_BOOK:
      const booksWithoutHidden = state.books.filter(
        (book) => book.id !== action.payload
      );
      return {
        ...state,
        currentBook:
          state.currentBook.id === action.payload
            ? booksWithoutHidden[0]
            : state.currentBook,
        books: booksWithoutHidden,
      };
    case FILL_BOOKS:
      return { ...state, books: action.payload };
    case SET_CURRENT_BOOK:
      return { ...state, currentBook: action.payload };
    case MOVE_BOOK_TO_TOP:
      return {
        ...state,
        books: [
          action.payload,
          ...state.books.filter((book) => book.id !== action.payload.id),
        ],
      };

    default:
      return state;
  }
};
