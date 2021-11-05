import { FC, ReactElement, useState } from "react";
import parse from "html-react-parser";
import { DeleteIcon, EditIcon } from "../../assets/svg-icons";
import { INote } from "../../types/note";
import "./NoteItem.scss";
import EditNote from "./EditNote";
import store from "../../store";
import { confirmationPopup, errorPopup } from "../Generic/Popup";
import axios, { AxiosError } from "axios";

interface NoteItemProps {
  note: INote;
}

interface NoteActionButtonProps {
  onClick: () => void;
  content: ReactElement;
}

const NoteItem: FC<NoteItemProps> = ({ note }) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [isEdit, setIsEdit] = useState(false);
  const { isEditable, isDeletable } = store.setting.noteActions;

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
      `Восстановление удаленных записей невозможно!\n${sliceText(
        note.text.replace(/<[^>]+>/g, "")
      )}`
    );
    if (result.isConfirmed) {
      const data = await axios({
        method: "delete",
        url: serverUrl + "note/" + note.id,
        headers: { Authorization: `Bearer ${store.app.account?.token}` },
      }).catch((error: AxiosError) => {
        const errorText = error.response?.data.message ?? "Неизвестная ошибка";
        errorPopup(errorText);
      });

      if (data === undefined) return;

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
          {isEditable !== undefined && isEditable && (
            <NoteActionButton
              content={<EditIcon />}
              onClick={() => setIsEdit(!isEdit)}
            />
          )}
          {isDeletable !== undefined && isDeletable && (
            <NoteActionButton
              content={<DeleteIcon />}
              onClick={() => confirmDeleteHandler()}
            />
          )}
        </div>
      </div>
      <div className="note__content">{parse(note.text)}</div>

      {isEdit && <EditNote note={note} closeHandler={() => setIsEdit(false)} />}
    </article>
  );
};

const NoteActionButton: FC<NoteActionButtonProps> = ({ onClick, content }) => {
  return (
    <button className="note__header-actions-button" onClick={onClick}>
      <div className="note__header-actions-button-icon">{content}</div>
    </button>
  );
};

export default NoteItem;
