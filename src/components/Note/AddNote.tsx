import React from "react";
import { Container } from "react-bootstrap";
import Button from "../Generic/Button";
import { GoDownIcon } from "../../assets/svg/AppIcons";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { EditorContent } from "@tiptap/react";
import { MenuBar, SetEditor } from "../Generic/Editor";

interface AddNoteProps {
  scrollToNotes: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({ scrollToNotes }) => {
  const { createNoteRedux } = useActions();

  const password = useTypedSelector((state) => state.app.password);
  const currentBook = useTypedSelector((state) => state.books.currentBook);

  function submitHandler() {
    const text = editor?.getHTML() ?? "";
    createNoteRedux(text, currentBook.id, password, clearForm);
  }

  const clearForm = () => {
    editor?.commands.setContent("");
  };

  const editor = SetEditor("");

  return (
    <>
      <section className="writer">
        <Container>
          <div className="container-wrapper writer__wrapper">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="wysiwyg__editor" />

            <div className="editor__actions">
              <Button
                onClick={submitHandler}
                text="Сохранить"
                className="editor__button button"
              />
            </div>
            <div className="writer__go-down-icon" onClick={scrollToNotes}>
              {GoDownIcon}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AddNote;
