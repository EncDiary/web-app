import React from "react";
import { DeleteIcon } from "../../assets/svg/AppIcons";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Note } from "../../types/notes";
import { confirmationAlert } from "../Generic/SweetAlert";

interface RemoveNoteProps {
  note: Note;
}

const RemoveNote: React.FC<RemoveNoteProps> = ({ note }) => {
  function getSlicedText(text: string) {
    let sliced = text.slice(0, 100);
    if (sliced.length < text.length) {
      sliced += "...";
    }
    return sliced;
  }

  const { deleteNoteRedux } = useActions();

  const password = useTypedSelector((state) => state.app.password);

  async function getModalWindow() {
    const result = await confirmationAlert(
      "Удалить запись",
      getSlicedText(note.text.replace(/<[^>]+>/g, " "))
    );

    if (result.isConfirmed) {
      deleteNoteRedux(note.id, password);
    }
  }

  return (
    <>
      <button className="button note__button" onClick={getModalWindow}>
        {DeleteIcon}
      </button>
    </>
  );
};

export default RemoveNote;
