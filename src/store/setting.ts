import { makeAutoObservable } from "mobx";

class Setting {
  noteActions: { isEditable?: boolean; isDeletable?: boolean };

  constructor() {
    makeAutoObservable(this);

    const noteActions = localStorage.getItem("noteActions");
    this.noteActions = noteActions
      ? JSON.parse(noteActions)
      : { isEditable: true, isDeletable: true };
  }

  setNoteActions(action: "isEditable" | "isDeletable") {
    this.noteActions[action] = !this.noteActions[action];
    localStorage.setItem("noteActions", JSON.stringify(this.noteActions));
  }
}

export default new Setting();
