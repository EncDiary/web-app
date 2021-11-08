import { observer } from "mobx-react-lite";
import store from "../../store";
import NoteItem from "./NoteItem";

const NoteList = observer(() => {
  const notes = store.noteStore.notes;
  return (
    <div className="notes">
      {notes.map((note) => {
        return <NoteItem note={note} key={note.id} />;
      })}
    </div>
  );
});

export default NoteList;
