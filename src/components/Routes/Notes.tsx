import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { aesDecrypt } from "../../modules/crypto";
import { INote } from "../../types/note";
import Container from "../Generic/Container";
import MainContent from "../Generic/MainContent";
import Pagination from "../Generic/Pagination";
import Title from "../Generic/Title";
import NoteList from "../Note/NoteList";
import { getNotesWithLimit } from "../../modules/request/noteRequest";
import store from "../../store";
import { IAccount } from "../../types/account";
import { spinnerCreator } from "../Generic/Spinner";

const Notes: FC = () => {
  const {
    settingStore: { notesNumberPerPage: limit },
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
            account.passphrase,
            note.ciphertext,
            note.salt,
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

  return (
    <MainContent>
      <section className="history">
        <Container>
          <Title text="Список записей" />
          {!isLoading && (
            <>
              <Pagination
                content={`${startNumber} – ${endNumber}`}
                onClickBack={() => setPageNumber(pageNumber - 1)}
                onClickNext={() => setPageNumber(pageNumber + 1)}
                isBackDisabled={pageNumber < 2}
                isNextDisabled={areNotesOver}
              />
              <NoteList account={account} />
              <Pagination
                content={`${startNumber} – ${endNumber}`}
                onClickBack={() => setPageNumber(pageNumber - 1)}
                onClickNext={() => setPageNumber(pageNumber + 1)}
                isBackDisabled={pageNumber < 2}
                isNextDisabled={areNotesOver}
              />
            </>
          )}
        </Container>
      </section>
    </MainContent>
  );
};

export default Notes;
