import { combineReducers } from "redux";
import { booksReducer } from "./booksReducer";
import { notesReducer } from "./notesReducer";
import { appReducer } from "./appReducer";
import { settingsReducer } from "./settingsReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export const rootReducer = combineReducers({
  books: booksReducer,
  notes: notesReducer,
  app: appReducer,
  settings: settingsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["books", "settings"],
};

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
