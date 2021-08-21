import { AppAction } from "./app";
import { BookAction } from "./books";
import { NoteAction } from "./notes";
import { SettingAction } from "./settings";

export type Actions = BookAction | NoteAction | AppAction | SettingAction;
