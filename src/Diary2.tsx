import { useRef, useEffect, useState } from "react";
import NotesList from "./Notes/NotesList";
import Header from "./Components/Header";
import AddNote from "./Notes/AddNote";
import { Container } from "react-bootstrap";
import Settings from "./Diary/Settings";
import Title from "./Components/Title";
import { useTypedSelector } from "./redux/hooks/useTypedSelector";
import { useActions } from "./redux/hooks/useActions";

const Diary2: React.FC = () => {
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
  const { password, isNotesOver } = useTypedSelector((state) => state.app);
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

  const notesRedux = useTypedSelector((state) => {
    return state.notes.notes;
  });

  const settings = useTypedSelector((state) => state.app.showSettings);

  return (
    <>
      <Header />

      <div id="main-content" ref={mainContentRef}>
        {
          <>
            <AddNote scrollToNotes={scrollToNotes} />
            <section className="notes" ref={notesRef}>
              <Container>
                <div className="container-wrapper">
                  <Title text="Список записей" className="notes__title" />

                  {notesRedux.length ? <NotesList /> : <p>Записей пока нет</p>}
                </div>
                {isNotesOver && <div>Записей больше нет!</div>}
              </Container>
            </section>
            {settings && <Settings />}
          </>
        }
      </div>
    </>
  );
};

export default Diary2;
