import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { isValidNotesNumberPerPage, TNotesNumberPerPage } from "../types/note";

class SettingStore {
  noteActions = {
    isEditable: true,
    isDeletable: true,
  };
  editor = { isMenubarDisplayed: true };
  notesNumberPerPage: TNotesNumberPerPage = 10;

  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    const noteActions = localStorage.getItem("noteActions");
    if (noteActions) {
      this.noteActions = JSON.parse(noteActions);
    }

    const notesNumberPerPage = localStorage.getItem("notesNumberPerPage");
    if (notesNumberPerPage) {
      this.notesNumberPerPage = JSON.parse(notesNumberPerPage);
    }

    const editor = localStorage.getItem("editor");
    if (editor) {
      this.editor = JSON.parse(editor);
    }
  }

  setNoteActions(action: "isEditable" | "isDeletable") {
    this.noteActions[action] = !this.noteActions[action];
    localStorage.setItem("noteActions", JSON.stringify(this.noteActions));
  }

  setNotesNumberPerPage(notesNumber: number) {
    if (isValidNotesNumberPerPage(notesNumber)) {
      this.notesNumberPerPage = notesNumber;
      localStorage.setItem(
        "notesNumberPerPage",
        JSON.stringify(this.notesNumberPerPage)
      );
    }
  }

  setEditor() {
    this.editor.isMenubarDisplayed = !this.editor.isMenubarDisplayed;
    localStorage.setItem("editor", JSON.stringify(this.editor));
  }
}

export default SettingStore;
