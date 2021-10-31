import { makeAutoObservable } from "mobx";
import { INote } from "../types/note";

class Note {
  notes: INote[] = [
    {
      id: "3",
      text: "Third Note",
      datetime: 3,
    },
    {
      id: "2",
      text: "Second Note",
      datetime: 2,
    },
    {
      id: "1",
      text: "First Note",
      datetime: 1,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  create(text: string) {
    const datetime = new Date().getTime();
    this.notes.unshift({
      id: datetime.toString(),
      text: text,
      datetime: datetime,
    });
  }

  edit(id: string, text: string) {
    const note = this.notes.find((item) => {
      return item.id === id;
    });
    if (note) {
      note.text = text;
    }
  }

  delete(id: string) {
    console.log("DELETE");
    this.notes = this.notes.filter((item) => {
      return item.id !== id;
    });
  }
}

export default new Note();
