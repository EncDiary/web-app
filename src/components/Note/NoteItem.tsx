import { FC } from "react";
import { DeleteIcon, EditIcon } from "../../assets/svg-icons";
import { INote } from "../../types/note";
import "./NoteItem.scss";

interface NoteItemProps {
  note: INote;
}

const NoteItem: FC<NoteItemProps> = ({ note }) => {
  const note_time = new Date(note.datetime);

  const getDate = () => {
    return note_time.toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getWeekDay = () => {
    return note_time.toLocaleString("ru", { weekday: "short" }).toUpperCase();
  };

  const getTime = () => {
    return note_time.toLocaleString("ru", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <article className="note">
      <div className="note__header">
        <div className="note__header-title">
          <div className="note__header-title-date">
            <div className="note__header-title-date-numeric">{getDate()}</div>
            <div className="note__header-title-date-weekday">
              {getWeekDay()}
            </div>
          </div>
          <div className="note__header-title-time">{getTime()}</div>
        </div>
        <div className="note__header-actions">
          <button className="note__header-actions-button">
            <div className="note__header-actions-button-icon">
              <EditIcon />
            </div>
          </button>
          <button className="note__header-actions-button">
            <div className="note__header-actions-button-icon">
              <DeleteIcon />
            </div>
          </button>
        </div>
      </div>
      <div className="note__content">{note.text}</div>
    </article>
  );
};

export default NoteItem;
