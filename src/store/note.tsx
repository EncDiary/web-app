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
}

export default new Note();
