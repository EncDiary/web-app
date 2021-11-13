import { FC } from "react";
import { aesEncrypt } from "../../modules/crypto";
import { INote } from "../../types/note";
import Button from "../Generic/Button";
import Container from "../Generic/Container";
import { EditorPanel, SetEditor } from "../Generic/Editor";
import { errorAlert } from "../../modules/sweetalert";
import Title from "../Generic/Title";
import "./CreateNote.scss";
import "./EditNote.scss";
import { editNoteRequest } from "../../modules/request/noteRequest";
import store from "../../store";
import { IAccount } from "../../types/account";
import Modal from "../Generic/Modal";

interface EditNoteProps {
  account: IAccount;
  note: INote;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const EditNote: FC<EditNoteProps> = ({ account, note, isOpen, setIsOpen }) => {
  const editor = SetEditor(note.text);

  const submitHandler = async () => {
    const text = editor?.getHTML() || "";

    if (text.length < 8) {
      errorAlert("Сначала введите текст записи");
      return;
    }

    if (text === note.text) {
      setIsOpen(false);
      return;
    }

    const cipherNote = aesEncrypt(account.passphrase, text);
    const serverResponse = await editNoteRequest(note.id, cipherNote, account);
    if (!serverResponse) return;

    store.noteStore.edit(note.id, text);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
      <section className="edit-note">
        <Container>
          <Title text="Редактирование записи" />
          <EditorPanel editor={editor} />
          <div className="edit-note__buttons">
            <Button
              text="Отмена"
              colorTheme="secondary"
              onClick={() => setIsOpen(false)}
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
    </Modal>
  );
};

export default EditNote;
