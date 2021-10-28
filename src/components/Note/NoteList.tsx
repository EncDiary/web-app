import store from "../../store";
import NoteItem from "./NoteItem";

const NoteList = () => {
  const notes = store.note.notes;
  return (
    <div className="notes">
      {notes.map((note) => {
        return <NoteItem note={note} />;
      })}
    </div>
  );
};

export default NoteList;
