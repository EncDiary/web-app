import { observer } from "mobx-react-lite";
import { FC } from "react";
import store from "../../store";
import { IAccount } from "../../types/account";
import NoteItem from "./NoteItem";

interface NoteListProps {
  account: IAccount;
}

const NoteList: FC<NoteListProps> = observer(({ account }) => {
  const notes = store.noteStore.notes;

  return (
    <div className="notes">
      {notes.map((note) => {
        return <NoteItem note={note} key={note.id} account={account} />;
      })}
    </div>
  );
});

export default NoteList;
