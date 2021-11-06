import axios, { AxiosError } from "axios";
import { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { AesDecrypt } from "../../functions/crypto";
import store from "../../store";
import { INote } from "../../types/note";
import { ButtonLink } from "../Generic/Button";
import Container from "../Generic/Container";
import { errorPopup } from "../Generic/Popup";
import Title from "../Generic/Title";
import NoteList from "./NoteList";
import "./NoteToday.scss";

const NoteToday: FC = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const history = useHistory();

  useEffect(() => {
    const account = store.app.account;

    if (!account) {
      history.push("/login");
      return;
    }

    store.note.clearNotes();

    const fetchNotes = async () => {
      const notesData = await axios({
        method: "get",
        url: serverUrl + "notes/today",
        headers: { Authorization: `Bearer ${account.token}` },
      })
        .then((response) => {
          return response.data.notes;
        })
        .catch((error: AxiosError) => {
          const errorText =
            error.response?.data.message ?? "Неизвестная ошибка";
          errorPopup(errorText);
        });
      if (notesData === undefined) return;

      const today = new Date();

      const todayMidnightTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      ).getTime();

      const notes: INote[] = [];
      notesData.forEach(
        (note: {
          id: string;
          text: string;
          datetime: string;
          iv: string;
          salt: string;
        }) => {
          const datetime = +note.datetime * 1000;
          const text = AesDecrypt(
            account.password,
            note.text,
            note.salt,
            note.iv
          );
          if (datetime >= todayMidnightTime) {
            notes.push({ id: note.id, text, datetime });
          }
        }
      );
      store.note.setNotes(notes);
    };

    fetchNotes();
  });

  return (
    <section className="today-notes">
      <Container>
        <Title text="Сегодняшние записи" />
        <NoteList />
        <ButtonLink
          text="Все записи"
          link="/notes"
          className="today-notes__full-list-button"
        />
      </Container>
    </section>
  );
};

export default NoteToday;
