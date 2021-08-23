import React, { useState } from "react";
import ReactQuill from "react-quill";
import { EditIcon } from "../../assets/SvgIcons";
import Button from "../Generic/Button";
import Title from "../Generic/Title";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Note } from "../../types/notes";
import { useActions } from "../../hooks/useActions";

interface EditNoteProps {
  note: Note;
}

const EditNote: React.FC<EditNoteProps> = ({ note }) => {
  const [body, setBody] = useState(note.text);

  function handleChange(value: string) {
    setBody(value);
  }

  const { editNoteRedux } = useActions();

  const password = useTypedSelector((state) => state.app.password);

  function submitHandler() {
    editNoteRedux(body, note.id, password, handleClose);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="button note__button" onClick={handleShow}>
        {EditIcon}
      </button>

      {show && (
        <div className="modal-window editor">
          <div className="container">
            <div className="container-wrapper">
              <Title text="Редактирование записи" className="editor__title" />
              <div className="editor__close" onClick={handleClose}>
                &times;
              </div>
              <div>
                <ReactQuill
                  onChange={handleChange}
                  value={body}
                  modules={{}}
                  formats={["bold", "italic"]}
                  placeholder="Напишите здесь что-нибудь..."
                />

                <div className="editor__actions">
                  <Button
                    onClick={submitHandler}
                    text="Сохранить изменения"
                    className="editor__button"
                  />
                  <Button
                    onClick={handleClose}
                    text="Отмена"
                    className="editor__button"
                    isPrimary={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditNote;
