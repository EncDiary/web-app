import { FC } from "react";
import store from "../../store";
import { INote } from "../../types/note";
import Button from "../Generic/Button";
import Container from "../Generic/Container";
import { EditorPanel, SetEditor } from "../Generic/Editor";
import Title from "../Generic/Title";
import UnderWindow from "../Generic/UnderWindow";
import "./CreateNote.scss";
import "./EditNote.scss";

interface EditNoteProps {
  note: INote;
  closeHandler: () => void;
}

const EditNote: FC<EditNoteProps> = ({ note, closeHandler }) => {
  const editor = SetEditor(note.text);

  const submitHandler = () => {
    const text = editor?.getHTML() || "";
    store.note.edit(note.id, text);
    closeHandler();
  };

  return (
    <UnderWindow>
      <section className="edit-note">
        <Container>
          <Title text="Редактирование записи" />
          <EditorPanel editor={editor} />
          <div className="edit-note__buttons">
            <Button
              text="Отмена"
              colorTheme="secondary"
              onClick={closeHandler}
              className="edit-note__buttons-item"
            />
            <Button
              text="Сохранить"
              onClick={() => submitHandler()}
              className="edit-note__buttons-item"
            />
          </div>
        </Container>
      </section>
    </UnderWindow>
  );
};

export default EditNote;
