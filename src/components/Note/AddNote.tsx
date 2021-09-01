import React from "react";
import { Container } from "react-bootstrap";
import Button from "../Generic/Button";
import { GoDownIcon } from "../../assets/svg/AppIcons";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { EditorPanel, SetEditor } from "../Generic/Editor";

interface AddNoteProps {
  scrollToNotes: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({ scrollToNotes }) => {
  const { createNoteRedux } = useActions();

  const {
    app: { password },
    books: { currentBook },
    settings: {
      additional: { goDownArrowAddNote },
    },
  } = useTypedSelector((state) => state);

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
            <EditorPanel editor={editor} />
            <div className="editor__actions">
              <Button
                onClick={submitHandler}
                text="Сохранить"
                className="editor__button button"
              />
            </div>
            {goDownArrowAddNote && (
              <div className="writer__go-down-icon" onClick={scrollToNotes}>
                {GoDownIcon}
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default AddNote;
