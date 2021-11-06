import axios, { AxiosError } from "axios";
import qs from "qs";
import { FC } from "react";
import { aesEncrypt } from "../../modules/crypto";
import store from "../../store";
import Button from "../Generic/Button";
import Container from "../Generic/Container";
import { EditorPanel, SetEditor } from "../Generic/Editor";
import { errorPopup } from "../Generic/Popup";
import "./CreateNote.scss";

const CreateNote: FC = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const editor = SetEditor("");

  const submitHandler = async () => {
    const account = store.app.account;
    if (!account) return;

    const text = editor?.getHTML() || "";
    if (text.length < 8) {
      errorPopup("Сначала введите текст записи");
      return;
    }

    const cypherData = aesEncrypt(account.password, text);

    const data = await axios({
      method: "post",
      url: serverUrl + "note",
      headers: { Authorization: `Bearer ${account.token}` },
      data: qs.stringify({
        text: cypherData.ciphertext,
        iv: cypherData.iv,
        salt: cypherData.salt,
      }),
    }).catch((error: AxiosError) => {
      const errorText = error.response?.data.message ?? "Неизвестная ошибка";
      errorPopup(errorText);
    });

    if (data === undefined) return;

    store.note.create({
      id: data.data.id,
      text,
      datetime: data.data.datetime * 1000,
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
