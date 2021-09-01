import React from "react";
import RemoveNote from "./RemoveNote";
import EditNote from "./EditNote";
import parse from "html-react-parser";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Note } from "../../types/notes";

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { deleteAction, editAction } = useTypedSelector(
    (state) => state.settings.noteActions
  );

  const note_time = new Date(note.datetime);

  function getDate() {
    return note_time.toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getWeekDay() {
    return note_time.toLocaleString("ru", { weekday: "short" }).toUpperCase();
  }

  function getTime() {
    return note_time.toLocaleString("ru", {
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <>
      <div className="note">
        <div className="note__header">
          <div className="note__title">
            <div className="note__date">
              <span className="note__date-number">{getDate()}</span>
              <span className="note__date-weekday">{getWeekDay()}</span>
            </div>
            <div className="note__time">{getTime()}</div>
          </div>
          <div className="note__management">
            {editAction && <EditNote note={note} />}
            {deleteAction && <RemoveNote note={note} />}
          </div>
        </div>

        <div className="note__text">{parse(note.text)}</div>
      </div>
    </>
  );
};

export default NoteItem;
