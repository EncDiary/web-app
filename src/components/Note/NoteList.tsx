import { useTypedSelector } from "../../hooks/useTypedSelector";
import NoteItem from "./NoteItem";

const NoteList: React.FC = () => {
  const notes = useTypedSelector((state) => {
    return state.notes.notes;
  });

  return (
    <>
      {notes.map((note) => {
        return <NoteItem note={note} key={note.id} />;
      })}
    </>
  );
};

export default NoteList;
