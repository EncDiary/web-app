import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { aesDecrypt } from "../../modules/crypto";
import { INote } from "../../types/note";
import Container from "../Generic/Container/Container";
import MainContent from "../Generic/Container/MainContent";
import Pagination from "../Generic/Pagination";
import Title from "../Generic/Title";
import NoteList from "../Note/NoteList";
import { getNotesWithLimit } from "../../modules/request/noteRequest";
import store from "../../store";
import { IAccount } from "../../types/account";
import { spinnerCreator } from "../Generic/Spinner";
import "./HistoryNotes.scss";
import { ButtonLink } from "../Generic/Button";

const HistoryNotes: FC = () => {
  const {
    settingStore: { notesNumberPerPage: limit },
    noteStore: { notes },
  } = store;

  const account: IAccount = useOutletContext();

  const [pageNumber, setPageNumber] = useState(1);
  const [areNotesOver, setAreNotesOver] = useState(false);

  const startNumber = (pageNumber - 1) * limit;
  const endNumber = pageNumber * limit;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    store.noteStore.clearNotes();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNotes = async () => {
      const serverResponse = await getNotesWithLimit(
        limit,
        (pageNumber - 1) * limit,
        account
      );
      if (!serverResponse) return;

      const notes: INote[] = [];
      serverResponse.data.notes.forEach(
        (note: {
          id: string;
          ciphertext: string;
          datetime: number;
          iv: string;
          salt: string;
        }) => {
          const text = aesDecrypt(
            note.ciphertext,
            store.cryptoStore.findOrCalculateAesKey(
              note.salt,
              account.passphrase
            ),
            note.iv
          );
          notes.push({ id: note.id, text, datetime: note.datetime * 1000 });
        }
      );
      store.noteStore.setNotes(notes);
      setIsLoading(false);
      setAreNotesOver(serverResponse.data.notes_is_over);
    };

    spinnerCreator(fetchNotes);
  }, [pageNumber, limit, account]);

  useEffect(() => {
    if (notes.length === 0 && pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  }, [setPageNumber, notes.length, pageNumber]);

  const paginationElement = (
    <Pagination
      content={`${startNumber} – ${endNumber}`}
      onClickBack={() => setPageNumber(pageNumber - 1)}
      onClickNext={() => setPageNumber(pageNumber + 1)}
      isBackDisabled={pageNumber < 2}
      isNextDisabled={areNotesOver}
    />
  );

  return (
    <MainContent>
      <section className="history-notes">
        <Container>
          <Title>История записей</Title>
          {!isLoading &&
            (notes.length === 0 && pageNumber === 1 ? (
              <>
                <div className="history-notes__no-notes">
                  Записей еще нет. Нажмите на кнопку ниже, чтобы создать новую
                </div>
                <ButtonLink
                  link="/write"
                  className="history-notes__write-button"
                >
                  Создать запись
                </ButtonLink>
              </>
            ) : (
              <>
                {paginationElement}
                <NoteList account={account} />
                {paginationElement}
              </>
            ))}
        </Container>
      </section>
    </MainContent>
  );
};

export default HistoryNotes;
