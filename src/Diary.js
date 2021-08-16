import React, { useRef, useEffect, useState } from "react";
import NotesList from "./Notes/NotesList";
import Header from "./Components/Header";
import AddNote from "./Notes/AddNote";
import { Container } from "react-bootstrap";
import Settings from "./Diary/Settings";
import Title from "./Components/Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotesRedux } from "./redux/actions/notesActions";

function Diary() {
  const notesRef = useRef(null);
  const mainContentRef = useRef(null);

  function scrollToNotes() {
    mainContentRef.current.scrollTo({
      top: notesRef.current.offsetTop,
      behavior: "smooth",
    });
  }

  const dispatch = useDispatch();

  const [fetching, setFetching] = useState(true);

  const currentBook = useSelector((state) => state.books.currentBook);
  const password = useSelector((state) => state.app.password);
  const notes = useSelector((state) => state.notes.notes);
  const isNotesOver = useSelector((state) => state.app.notesOver);

  useEffect(() => {
    if (fetching && !isNotesOver) {
      dispatch(fetchNotesRedux(currentBook, password, 5, notes.length)).finally(
        () => setFetching(false)
      );
    }
  }, [fetching]);

  useEffect(() => {
    mainContentRef.current.addEventListener("scroll", scrollHandler);
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.scrollHeight -
        e.target.scrollTop -
        mainContentRef.current.offsetHeight <
      200
    ) {
      setFetching(true);
    }
  };

  const notesRedux = useSelector((state) => {
    return state.notes.notes;
  });

  const settings = useSelector((state) => state.app.showSettings);

  return (
    <>
      <Header settings={settings} />

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
}

export default Diary;
