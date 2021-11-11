import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { aesDecrypt } from "../../modules/crypto";
import { INote } from "../../types/note";
import Container from "../Generic/Container";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import Pagination from "../Generic/Pagination";
import Title from "../Generic/Title";
import NoteList from "../Note/NoteList";
import { getNotesWithLimit } from "../../modules/request";
import store from "../../store";

const Notes: FC = () => {
  const history = useHistory();

  const [pageNumber, setPageNumber] = useState(1);
  const [areNotesOver, setAreNotesOver] = useState(false);
  const {
    settingStore: { notesNumberPerPage: limit },
    appStore: { account },
  } = store;

  const startNumber = (pageNumber - 1) * limit;
  const endNumber = pageNumber * limit;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    store.noteStore.clearNotes();
  }, []);

  useEffect(() => {
    if (!account) {
      history.push("/login");
      return;
    }

    const fetchNotes = async () => {
      const serverResponse = await getNotesWithLimit(
        limit,
        (pageNumber - 1) * limit,
        account.token
      );
      if (!serverResponse) return;

      const notes: INote[] = [];
      serverResponse.data.notes.forEach(
        (note: {
          id: string;
          ciphertext: string;
          datetime: string;
          iv: string;
          salt: string;
        }) => {
          const text = aesDecrypt(
            account.passphrase,
            note.ciphertext,
            note.salt,
            note.iv
          );
          notes.push({ id: note.id, text, datetime: +note.datetime * 1000 });
        }
      );
      store.noteStore.setNotes(notes);
      setIsLoading(false);
      setAreNotesOver(serverResponse.data.notes_is_over);
    };

    fetchNotes();
  }, [pageNumber, limit, history, account]);

  return (
    <>
      <Header />
      <MainContent type="note-list">
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
                <NoteList />
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
    </>
  );
};

export default Notes;
