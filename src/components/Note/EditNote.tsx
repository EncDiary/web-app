import { FC } from "react";
import { aesEncrypt } from "../../modules/crypto";
import { INote } from "../../types/note";
import Button from "../Generic/Button";
import Container from "../Generic/Container";
import { EditorPanel, SetEditor } from "../Generic/Editor";
import { errorAlert } from "../../modules/sweetalert";
import Title from "../Generic/Title";
import UnderWindow from "../Generic/UnderWindow";
import "./CreateNote.scss";
import "./EditNote.scss";
import { editNoteRequest } from "../../modules/request";
import store from "../../store";

interface EditNoteProps {
  note: INote;
  closeHandler: () => void;
}

const EditNote: FC<EditNoteProps> = ({ note, closeHandler }) => {
  const editor = SetEditor(note.text);

  const submitHandler = async () => {
    const text = editor?.getHTML() || "";
    const account = store.appStore.account;
    if (!account) return;

    if (text.length < 8) {
      errorAlert("Сначала введите текст записи");
      return;
    }

    if (text === note.text) {
      closeHandler();
      return;
    }

    const cipherNote = aesEncrypt(account.password, text);
    const serverResponse = await editNoteRequest(
      note.id,
      cipherNote,
      account.token
    );
    if (!serverResponse) return;

    store.noteStore.edit(note.id, text);
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
