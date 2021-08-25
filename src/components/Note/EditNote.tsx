import React, { useState } from "react";
import { EditIcon } from "../../assets/svg/AppIcons";
import Button from "../Generic/Button";
import Title from "../Generic/Title";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Note } from "../../types/notes";
import { useActions } from "../../hooks/useActions";
import { EditorContent } from "@tiptap/react";
import { MenuBar, SetEditor } from "../Generic/Editor";

interface EditNoteProps {
  note: Note;
}

const EditNote: React.FC<EditNoteProps> = ({ note }) => {
  const { editNoteRedux } = useActions();

  const password = useTypedSelector((state) => state.app.password);

  function submitHandler() {
    const text = editor?.getHTML() ?? "";
    editNoteRedux(text, note.id, password, handleClose);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editor = SetEditor(note.text);

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
                <MenuBar editor={editor} />
                <EditorContent editor={editor} className="wysiwyg__editor" />

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
