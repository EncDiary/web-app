import * as BooksActionCreators from "./books";
import * as NotesActionCreators from "./notes";
import * as AppActionCreators from "./app";
import * as SettingsActionCreators from "./settings";

export default {
  ...BooksActionCreators,
  ...NotesActionCreators,
  ...AppActionCreators,
  ...SettingsActionCreators,
};
