import { FC, useEffect } from "react";
import { aesDecrypt } from "../../modules/crypto";
import { INote } from "../../types/note";
import { ButtonLink } from "../Generic/Button";
import Container from "../Generic/Container/Container";
import Title from "../Generic/Title";
import NoteList from "./NoteList";
import "./NoteToday.scss";
import { getTodayNotesRequest } from "../../modules/request/noteRequest";
import store from "../../store";
import { IAccount } from "../../types/account";
import { getTodayMidnightTime } from "../../modules/datetime";
import { spinnerCreator } from "../Generic/Spinner";
import { observer } from "mobx-react-lite";

interface NoteTodayProps {
  account: IAccount;
}

const NoteToday: FC<NoteTodayProps> = observer(({ account }) => {
  const notes = store.noteStore.notes;
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
        <Title>Сегодняшние записи</Title>
        {notes.length !== 0 ? (
          <NoteList account={account} />
        ) : (
          <div className="today-notes__no-notes">
            За сегодняшний день не было сделано ни одной записи
          </div>
        )}
        <ButtonLink link="/notes" className="today-notes__full-list-button">
          Все записи
        </ButtonLink>
      </Container>
    </section>
  );
});

export default NoteToday;
