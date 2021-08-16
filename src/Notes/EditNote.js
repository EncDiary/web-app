import React, { useState } from "react";
import ReactQuill from "react-quill";
import { EditIcon } from "../assets/SvgIcons";
import Button from "../Components/Button";
import Title from "../Components/Title";
import { useDispatch, useSelector } from "react-redux";
import { editNoteRedux } from "../redux/actions/notesActions";

function EditNote({ note }) {
  const [body, setBody] = useState(note.text);

  function handleChange(value) {
    setBody(value);
  }

  const dispatch = useDispatch();

  const password = useSelector((state) => state.app.password);

  function submitHandler() {
    console.log(body);
    handleClose();

    dispatch(editNoteRedux(body, note.id, password));
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
                  formats={["bold", "italic", "underline"]}
                  theme={null}
                  compatibilityMode={false}
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
}

export default EditNote;
