import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { booksReducer } from "./booksReducer";
import { notesReducer } from "./notesReducer";
import { appReducer } from "./appReducer";
import { settingsReducer } from "./settingsReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["books", "settings"],
};

const rootReducer = combineReducers({
  books: booksReducer,
  notes: notesReducer,
  app: appReducer,
  settings: settingsReducer,
});

export default persistReducer(persistConfig, rootReducer);
