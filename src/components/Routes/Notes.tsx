import axios, { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AesDecrypt } from "../../functions/crypto";
import store from "../../store";
import { INote } from "../../types/note";
import Container from "../Generic/Container";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import Pagination from "../Generic/Pagination";
import { errorPopup } from "../Generic/Popup";
import Title from "../Generic/Title";
import NoteList from "../Note/NoteList";

const Notes: FC = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const history = useHistory();

  const [pageNumber, setPageNumber] = useState(1);
  const [areNotesOver, setAreNotesOver] = useState(false);
  const limit = store.setting.notesNumberPerPage;

  const startNumber = (pageNumber - 1) * limit;
  const endNumber = pageNumber * limit;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    store.note.clearNotes();
  }, []);

  useEffect(() => {
    const account = store.app.account;

    if (!account) {
      history.push("/login");
      return;
    }

    const fetchNotes = async () => {
      const fetchedData = await axios({
        method: "get",
        url:
          serverUrl + `notes?limit=${limit}&offset=${(pageNumber - 1) * limit}`,
        headers: { Authorization: `Bearer ${account.token}` },
      })
        .then((response) => {
          return response.data;
        })
        .catch((error: AxiosError) => {
          const errorText =
            error.response?.data.message ?? "Неизвестная ошибка";
          errorPopup(errorText);
        });

      if (fetchedData === undefined) return;

      const notes: INote[] = [];
      fetchedData.notes.forEach(
        (note: {
          id: string;
          text: string;
          datetime: string;
          iv: string;
          salt: string;
        }) => {
          const text = AesDecrypt(
            account.password,
            note.text,
            note.salt,
            note.iv
          );
          notes.push({ id: note.id, text, datetime: +note.datetime * 1000 });
        }
      );
      store.note.setNotes(notes);
      setIsLoading(false);
      setAreNotesOver(fetchedData.notes_is_over);
    };

    fetchNotes();
  }, [pageNumber, limit, serverUrl, history]);

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
