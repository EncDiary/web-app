import { useRef, useEffect, useState } from "react";
import NoteList from "./Note/NoteList";
import Header from "./Generic/Header";
import AddNote from "./Note/AddNote";
import { Container } from "react-bootstrap";
import Setting from "./Setting/Setting";
import Title from "./Generic/Title";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { settingsTabTypes } from "../types/app";

const Diary: React.FC = () => {
  const notesRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  function scrollToNotes() {
    if (mainContentRef.current !== null) {
      mainContentRef.current.scrollTo({
        top: notesRef.current?.offsetTop,
        behavior: "smooth",
      });
    }
  }

  const { fetchNotesRedux } = useActions();

  const [fetching, setFetching] = useState(true);

  const currentBook = useTypedSelector((state) => state.books.currentBook);
  const { password, isNotesOver, showSettings, isLoading } = useTypedSelector(
    (state) => state.app
  );
  const notes = useTypedSelector((state) => state.notes.notes);

  useEffect(() => {
    async function fetchData() {
      if (fetching && !isNotesOver) {
        fetchNotesRedux(currentBook, password, 5, notes.length, () =>
          setFetching(false)
        );
      }
    }
    fetchData();
  }, [fetching]);

  useEffect(() => {
    mainContentRef.current?.addEventListener("scroll", scrollHandler);
  }, []);

  const scrollHandler = (e: any) => {
    if (e.target.scrollTopMax - e.target.scrollTop < 200) {
      setFetching(true);
    }
  };

  return (
    <>
      <Header />

      <div id="main-content" ref={mainContentRef}>
        {
          <>
            {/* <div className="lds-dual-ring"></div> */}
            <AddNote scrollToNotes={scrollToNotes} />
            <section className="notes" ref={notesRef}>
              <Container>
                <div className="container-wrapper">
                  <Title text="Список записей" className="notes__title" />

                  {notes.length ? <NoteList /> : <p>Записей пока нет</p>}
                </div>
                {isNotesOver && <div>Записей больше нет!</div>}
              </Container>
            </section>
            {showSettings !== settingsTabTypes.None && <Setting />}
          </>
        }
      </div>
    </>
  );
};

export default Diary;
