import store from "../../store";
import NoteItem from "./NoteItem";

const NoteList = () => {
  const notes = store.note.notes;
  return (
    <div className="notes">
      {notes.map((note) => {
        return <NoteItem note={note} key={note.id} />;
      })}
    </div>
  );
};

export default NoteList;
