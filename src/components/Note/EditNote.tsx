import { FC } from "react";
import { aesEncrypt } from "../../modules/crypto";
import { INote } from "../../types/note";
import Button from "../Generic/Button";
import { EditorPanel, SetEditor } from "../Generic/Input/Editor";
import { errorAlert } from "../../modules/sweetalert";
import Title from "../Generic/Title";
import "./CreateNote.scss";
import "./EditNote.scss";
import { editNoteRequest } from "../../modules/request/noteRequest";
import store from "../../store";
import { IAccount } from "../../types/account";
import Modal from "../Generic/Modal";
import { spinnerCreator } from "../Generic/Spinner";
import { enc } from "crypto-js";

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
    spinnerCreator(async () => {
      const cipherNote = aesEncrypt(
        text,
        store.cryptoStore.findOrCalculateAesKey(
          enc.Hex.stringify(account.salt),
          account.passphrase
        )
      );
      const serverResponse = await editNoteRequest(
        note.id,
        {
          ciphertext: cipherNote.ciphertext,
          iv: cipherNote.iv,
          salt: enc.Hex.stringify(account.salt),
        },
        account
      );
      if (!serverResponse) return;

      store.noteStore.edit(note.id, text);
      setIsOpen(false);
    });
  };

  return (
    <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
      <Title size="medium">Редактирование записи</Title>
      <EditorPanel editor={editor} />
      <div className="edit-note__buttons">
        <Button
          colorTheme="secondary"
          onClick={() => setIsOpen(false)}
          className="edit-note__buttons-item"
        >
          Отмена
        </Button>
        <Button
          onClick={() => submitHandler()}
          className="edit-note__buttons-item"
        >
          Сохранить
        </Button>
      </div>
    </Modal>
  );
};

export default EditNote;
