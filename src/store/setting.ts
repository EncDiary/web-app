import { makeAutoObservable } from "mobx";

class Setting {
  noteActions: { isEditable: boolean; isDeletable: boolean } = {
    isEditable: true,
    isDeletable: true,
  };
  notesNumberPerPage: 10 | 20 | 50 | 100 | 300 = 10;

  constructor() {
    makeAutoObservable(this);

    const noteActions = localStorage.getItem("noteActions");
    if (noteActions) {
      this.noteActions = JSON.parse(noteActions);
    }

    const notesNumberPerPage = localStorage.getItem("notesNumberPerPage");
    if (notesNumberPerPage) {
      this.notesNumberPerPage = JSON.parse(notesNumberPerPage);
    }
  }

  setNoteActions(action: "isEditable" | "isDeletable") {
    this.noteActions[action] = !this.noteActions[action];
    localStorage.setItem("noteActions", JSON.stringify(this.noteActions));
  }

  setNotesNumberPerPage(notesNumber: number) {
    if (
      notesNumber === 10 ||
      notesNumber === 20 ||
      notesNumber === 50 ||
      notesNumber === 100 ||
      notesNumber === 300
    ) {
      this.notesNumberPerPage = notesNumber;
      localStorage.setItem(
        "notesNumberPerPage",
        JSON.stringify(this.notesNumberPerPage)
      );
    }
  }
}

export default new Setting();
