import axios, { AxiosError } from "axios";
import qs from "qs";
import { FC } from "react";
import { aesEncrypt } from "../../modules/crypto";
import store from "../../store";
import { INote } from "../../types/note";
import Button from "../Generic/Button";
import Container from "../Generic/Container";
import { EditorPanel, SetEditor } from "../Generic/Editor";
import { errorPopup } from "../Generic/Popup";
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
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const submitHandler = async () => {
    const text = editor?.getHTML() || "";

    const account = store.app.account;
    if (!account) return;

    if (text.length < 8) {
      errorPopup("Сначала введите текст записи");
      return;
    }

    if (text === note.text) {
      closeHandler();
      return;
    }

    const cypherData = aesEncrypt(account.password, text);

    const data = await axios({
      method: "put",
      url: serverUrl + "note/" + note.id,
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
