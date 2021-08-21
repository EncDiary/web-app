import React, { useState } from "react";
import ReactQuill from "react-quill";
import "../../assets/styles/quill_custom_theme.scss";
import { Container } from "react-bootstrap";
import Button from "../Generic/Button";
import { GoDownIcon } from "../../assets/SvgIcons";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

interface AddNoteProps {
  scrollToNotes: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({ scrollToNotes }) => {
  const { createNoteRedux } = useActions();

  const [body, setBody] = useState("");

  function handleChange(value: string) {
    setBody(value);
  }

  const password = useTypedSelector((state) => state.app.password);
  const currentBook = useTypedSelector((state) => state.books.currentBook);

  function submitHandler() {
    createNoteRedux(body, currentBook.id, password, clearForm);
  }

  const clearForm = () => {
    setBody("");
  };

  return (
    <>
      <section className="writer">
        <Container>
          <div className="container-wrapper writer__wrapper">
            <ReactQuill
              onChange={handleChange}
              value={body}
              modules={{}}
              formats={["bold", "italic", "underline"]}
              placeholder="Напишите здесь что-нибудь..."
            />
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
