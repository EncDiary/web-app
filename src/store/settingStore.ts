import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import {
  checkIsEditorConfigValid,
  checkIsNoteActionsConfigValid,
  checkNotesPerPageConfigValid,
} from "../modules/typeChecker";
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

    const noteActionsData = localStorage.getItem("noteActions");
    if (noteActionsData) {
      try {
        const noteActions = JSON.parse(noteActionsData);
        if (checkIsNoteActionsConfigValid(noteActions)) {
          this.noteActions = noteActions;
        }
      } catch {}
    }

    const notesPerPageData = localStorage.getItem("notesNumberPerPage");
    if (notesPerPageData) {
      try {
        const notesPerPage = JSON.parse(notesPerPageData);
        if (checkNotesPerPageConfigValid(notesPerPage)) {
          this.notesNumberPerPage = notesPerPage;
        }
      } catch {}
    }

    const editorData = localStorage.getItem("editor");
    if (editorData) {
      try {
        const editor = JSON.parse(editorData);
        if (checkIsEditorConfigValid(editor)) {
          this.editor = editor;
        }
      } catch {}
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
