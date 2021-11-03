import axios, { AxiosError } from "axios";
import qs from "qs";
import { FC } from "react";
import store from "../../store";
import Button from "../Generic/Button";
import Container from "../Generic/Container";
import { EditorPanel, SetEditor } from "../Generic/Editor";
import "./CreateNote.scss";

const CreateNote: FC = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const editor = SetEditor("");

  const submitHandler = async () => {
    const text = editor?.getHTML() || "";
    if (text.length < 8) {
      console.log("Сначала введите текст записи");
      return;
    }

    const data = await axios({
      method: "post",
      url: serverUrl + "note",
      headers: { Authorization: `Bearer ${store.app.account?.token}` },
      data: qs.stringify({
        text: text,
      }),
    }).catch((error: AxiosError) => {
      console.log(error.response?.data.message ?? "Неизвестная ошибка");
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
