import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { DeleteIcon } from "../assets/SvgIcons";
import { deleteNoteRedux } from "../redux/actions/notesActions";

function RemoveNote({ note }) {
  function getSlicedText(text) {
    var sliced = text.slice(0, 100);
    if (sliced.length < text.length) {
      sliced += "...";
    }
    return sliced;
  }

  const dispatch = useDispatch();

  const password = useSelector((state) => state.app.password);

  function getModalWindow() {
    Swal.fire({
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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNoteRedux(note.id, password));
      }
    });
  }

  return (
    <>
      <button className="button note__button" onClick={getModalWindow}>
        {DeleteIcon}
      </button>
    </>
  );
}

export default RemoveNote;
