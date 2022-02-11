import { FC } from "react";
import { aesEncrypt } from "../../modules/crypto";
import Button from "../Generic/Button";
import Container from "../Generic/Container/Container";
import { EditorPanel, SetEditor } from "../Generic/Input/Editor";
import { errorAlert } from "../../modules/sweetalert";
import "./CreateNote.scss";
import { createNoteRequest } from "../../modules/request/noteRequest";
import store from "../../store";
import { IAccount } from "../../types/account";
import { spinnerCreator } from "../Generic/Spinner";
import { enc } from "crypto-js";

interface CreateNoteProps {
  account: IAccount;
}

const CreateNote: FC<CreateNoteProps> = ({ account }) => {
  const editor = SetEditor("");

  const submitHandler = async () => {
    const text = editor?.getHTML() || "";
    if (text.length < 8) {
      errorAlert("Сначала введите текст записи");
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
      const serverResponse = await createNoteRequest(
        {
          ciphertext: cipherNote.ciphertext,
          iv: cipherNote.iv,
          salt: enc.Hex.stringify(account.salt),
        },
        account
      );
      if (!serverResponse) return;

      store.noteStore.create({
        id: serverResponse.data.id,
        text,
        datetime: serverResponse.data.datetime * 1000,
      });
      editor?.commands.clearContent();
    });
    window.scrollTo(0, 0);
  };

  return (
    <section className="writer">
      <Container>
        <EditorPanel editor={editor} />
        <Button className="writer__save-button" onClick={() => submitHandler()}>
          Сохранить
        </Button>
      </Container>
    </section>
  );
};

export default CreateNote;
