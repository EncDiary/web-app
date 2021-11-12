import { FC, ReactElement, useState } from "react";
import parse from "html-react-parser";
import { DeleteIcon, EditIcon } from "../../assets/svg-icons";
import { INote } from "../../types/note";
import "./NoteItem.scss";
import EditNote from "./EditNote";
import { confirmationAlert } from "../../modules/sweetalert";
import { getLongDate, getShortWeekDay, getTime } from "../../modules/datetime";
import { deleteNoteRequest } from "../../modules/request/noteRequest";
import store from "../../store";
import { IAccount } from "../../types/account";

interface NoteItemProps {
  account: IAccount;
  note: INote;
}

interface NoteActionButtonProps {
  onClick: () => void;
  content: ReactElement;
}

const NoteItem: FC<NoteItemProps> = ({ account, note }) => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    settingStore: {
      noteActions: { isEditable, isDeletable },
    },
  } = store;

  const noteDatetime = new Date(note.datetime);

  const sliceText = (text: string, length: number = 100) => {
    let sliced = text.slice(0, length);
    if (sliced.length < text.length) {
      sliced += "...";
    }
    return sliced;
  };

  const confirmDeleteHandler = async () => {
    const result = await confirmationAlert(
      "Удаление записи",
      `Восстановление удаленных записей невозможно!\n${sliceText(
        note.text.replace(/<[^>]+>/g, "")
      )}`
    );
    if (result.isConfirmed) {
      const serverResponse = await deleteNoteRequest(note.id, account);
      if (!serverResponse) return;
      store.noteStore.delete(note.id);
    }
  };

  return (
    <article className="note">
      <div className="note__header">
        <div className="note__header-title">
          <div className="note__header-title-date">
            <div className="note__header-title-date-numeric">
              {getLongDate(noteDatetime)}
            </div>
            <div className="note__header-title-date-weekday">
              {getShortWeekDay(noteDatetime)}
            </div>
          </div>
          <div className="note__header-title-time">{getTime(noteDatetime)}</div>
        </div>
        <div className="note__header-actions">
          {isEditable && (
            <NoteActionButton
              content={<EditIcon />}
              onClick={() => setIsEdit(!isEdit)}
            />
          )}
          {isDeletable && (
            <NoteActionButton
              content={<DeleteIcon />}
              onClick={() => confirmDeleteHandler()}
            />
          )}
        </div>
      </div>
      <div className="note__content">{parse(note.text)}</div>

      {isEdit && (
        <EditNote
          account={account}
          note={note}
          closeHandler={() => setIsEdit(false)}
        />
      )}
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
