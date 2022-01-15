export interface INote {
  id: string;
  text: string;
  datetime: number;
}

const possibleNotesNumber = [10, 20, 50, 100, 300];

export type TNotesNumberPerPage = typeof possibleNotesNumber[number];

export const isValidNotesNumberPerPage = (notesNumber: number) => {
  return possibleNotesNumber.indexOf(notesNumber) !== -1;
};
