import { FC } from "react";
import store from "../../store";
import Button from "../Generic/Button";
import Container from "../Generic/Container";
import { EditorPanel, SetEditor } from "../Generic/Editor";
import "./CreateNote.scss";

const CreateNote: FC = () => {
  const editor = SetEditor("");

  const submitHandler = () => {
    const text = editor?.getHTML() || "";
    store.note.create(text);
    editor?.commands.clearContent();
  };

  return (
    <section className="writer">
      <Container>
        <EditorPanel editor={editor} />
        <Button
          text="Сохранить"
          className="writer__save-button"
          onClick={() => submitHandler()}
        />
      </Container>
    </section>
  );
};

export default CreateNote;
