import { FC } from "react";
import { aesEncrypt } from "../../modules/crypto";
import Button from "../Generic/Button";
import Container from "../Generic/Container";
import { EditorPanel, SetEditor } from "../Generic/Editor";
import { errorAlert } from "../../modules/sweetalert";
import "./CreateNote.scss";
import { createNoteRequest } from "../../modules/request";
import store from "../../store";

const CreateNote: FC = () => {
  const editor = SetEditor("");

  const submitHandler = async () => {
    const account = store.appStore.account;
    if (!account) return;

    const text = editor?.getHTML() || "";
    if (text.length < 8) {
      errorAlert("Сначала введите текст записи");
      return;
    }

    const cipherNote = aesEncrypt(account.passphrase, text);
    const serverResponse = await createNoteRequest(cipherNote, account.token);
    if (!serverResponse) return;

    store.noteStore.create({
      id: serverResponse.data.id,
      text,
      datetime: serverResponse.data.datetime * 1000,
    });
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
