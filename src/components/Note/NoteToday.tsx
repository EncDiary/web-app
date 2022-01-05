import { FC, useEffect } from "react";
import { aesDecrypt } from "../../modules/crypto";
import { INote } from "../../types/note";
import { ButtonLink } from "../Generic/Button";
import Container from "../Generic/Container";
import Title from "../Generic/Title";
import NoteList from "./NoteList";
import "./NoteToday.scss";
import { getTodayNotesRequest } from "../../modules/request/noteRequest";
import store from "../../store";
import { IAccount } from "../../types/account";
import { getTodayMidnightTime } from "../../modules/datetime";
import { spinnerCreator } from "../Generic/Spinner";

interface NoteTodayProps {
  account: IAccount;
}

const NoteToday: FC<NoteTodayProps> = ({ account }) => {
  useEffect(() => {
    store.noteStore.clearNotes();

    const fetchNotes = async () => {
      const serverResponse = await getTodayNotesRequest(account);
      if (!serverResponse) return;

      const todayMidnightTime = getTodayMidnightTime();

      const notes: INote[] = [];
      serverResponse.data.notes.forEach(
        (note: {
          id: string;
          ciphertext: string;
          datetime: number;
          iv: string;
          salt: string;
        }) => {
          const datetime = note.datetime * 1000;
          const text = aesDecrypt(
            account.passphrase,
            note.ciphertext,
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

    spinnerCreator(fetchNotes);
  }, [account]);

  return (
    <section className="today-notes">
      <Container>
        <Title text="Сегодняшние записи" />
        <NoteList account={account} />
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
