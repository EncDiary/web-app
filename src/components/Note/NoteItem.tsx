import { FC, useState } from "react";
import parse from "html-react-parser";
import { DeleteIcon, EditIcon } from "../../assets/svg-icons";
import { INote } from "../../types/note";
import "./NoteItem.scss";
import EditNote from "./EditNote";
import store from "../../store";
import { confirmationPopup } from "../Generic/Popup";

interface NoteItemProps {
  note: INote;
}

const NoteItem: FC<NoteItemProps> = ({ note }) => {
  const [isEdit, setIsEdit] = useState(false);

  const noteDatetime = new Date(note.datetime);

  const getDate = noteDatetime.toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getWeekDay = noteDatetime
    .toLocaleString("ru", { weekday: "short" })
    .toUpperCase();

  const getTime = noteDatetime.toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  });

  const sliceText = (text: string, length: number = 100) => {
    let sliced = text.slice(0, length);
    if (sliced.length < text.length) {
      sliced += "...";
    }
    return sliced;
  };

  const confirmDeleteHandler = async () => {
    const result = await confirmationPopup(
      "Удаление записи",
      `Восстановление удаленных записей невозможно!\n${sliceText(note.text)}`
    );
    if (result.isConfirmed) {
      store.note.delete(note.id);
    }
  };

  return (
    <article className="note">
      <div className="note__header">
        <div className="note__header-title">
          <div className="note__header-title-date">
            <div className="note__header-title-date-numeric">{getDate}</div>
            <div className="note__header-title-date-weekday">{getWeekDay}</div>
          </div>
          <div className="note__header-title-time">{getTime}</div>
        </div>
        <div className="note__header-actions">
          <button
            className="note__header-actions-button"
            onClick={() => setIsEdit(!isEdit)}
          >
            <div className="note__header-actions-button-icon">
              <EditIcon />
            </div>
          </button>
          <button
            className="note__header-actions-button"
            onClick={() => confirmDeleteHandler()}
          >
            <div className="note__header-actions-button-icon">
              <DeleteIcon />
            </div>
          </button>
        </div>
      </div>
      <div className="note__content">{parse(note.text)}</div>

      {isEdit && <EditNote note={note} closeHandler={() => setIsEdit(false)} />}
    </article>
  );
};

export default NoteItem;
