import React from "react";
import Swal from "sweetalert2";
import { DeleteIcon } from "../../assets/svg/AppIcons";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Note } from "../../types/notes";

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
    const result = await Swal.fire({
      title: "Удалить запись",
      text: getSlicedText(note.text.replace(/<[^>]+>/g, "")),
      icon: "error",
      showCloseButton: true,

      confirmButtonText: "Да",
      confirmButtonColor: "#51ac00",

      cancelButtonText: "Нет, не надо",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      focusCancel: true,
    });

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
