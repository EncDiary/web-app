import { FC } from "react";
import Button from "../Generic/Button";
import Container from "../Generic/Container";
import { EditorPanel, SetEditor } from "../Generic/Editor";
import "./CreateNote.scss";

const CreateNote: FC = () => {
  const editor = SetEditor("");

  return (
    <section className="writer">
      <Container>
        <EditorPanel editor={editor} />
        <Button text="Сохранить" className="writer__save-button" />
      </Container>
    </section>
  );
};

export default CreateNote;
