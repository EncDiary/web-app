import { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { aesDecrypt } from "../../modules/crypto";
import { INote } from "../../types/note";
import { ButtonLink } from "../Generic/Button";
import Container from "../Generic/Container";
import Title from "../Generic/Title";
import NoteList from "./NoteList";
import "./NoteToday.scss";
import { getTodayNotesRequest } from "../../modules/request";
import store from "../../store";

const NoteToday: FC = () => {
  const history = useHistory();

  useEffect(() => {
    const account = store.appStore.account;
    if (!account) {
      history.push("/login");
      return;
    }
    store.noteStore.clearNotes();

    const fetchNotes = async () => {
      const serverResponse = await getTodayNotesRequest(account.token);
      if (!serverResponse) return;

      const today = new Date();
      const todayMidnightTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      ).getTime();

      const notes: INote[] = [];
      serverResponse.data.notes.forEach(
        (note: {
          id: string;
          text: string;
          datetime: string;
          iv: string;
          salt: string;
        }) => {
          const datetime = +note.datetime * 1000;
          const text = aesDecrypt(
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
      store.noteStore.setNotes(notes);
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
