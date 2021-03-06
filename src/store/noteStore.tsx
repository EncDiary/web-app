import { makeAutoObservable } from "mobx";
import { INote } from "../types/note";
import { RootStore } from ".";

class NoteStore {
  notes: INote[] = [];

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setNotes(notes: INote[]) {
    this.notes = notes;
  }

  clearNotes() {
    this.notes = [];
  }

  create(note: INote) {
    this.notes.unshift(note);
  }

  edit(id: string, text: string) {
    const note = this.notes.find((item) => item.id === id);
    if (note) {
      note.text = text;
    }
  }

  delete(id: string) {
    this.notes = this.notes.filter((item) => {
      return item.id !== id;
    });
  }
}

export default NoteStore;
