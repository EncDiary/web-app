import React from "react";
import { useSelector } from "react-redux";
import NoteItem from "./NoteItem";

function NotesList() {
  const notes = useSelector((state) => {
    return state.notes.notes;
  });

  return (
    <>
      {notes.map((note) => {
        return <NoteItem note={note} key={note.id} />;
      })}
    </>
  );
}

export default NotesList;
