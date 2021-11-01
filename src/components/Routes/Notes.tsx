import { FC } from "react";
import Container from "../Generic/Container";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import Pagination from "../Generic/Pagination";
import Title from "../Generic/Title";
import NoteList from "../Note/NoteList";

const Notes: FC = () => {
  return (
    <>
      <Header />
      <MainContent type="note-list">
        <section className="history">
          <Title text="Список записей" />
          <Container>
            <Pagination />
            <NoteList />
            <Pagination />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default Notes;
