import { FC } from "react";
import Container from "../Generic/Container";
import Title from "../Generic/Title";
import NoteList from "./NoteList";
import "./NoteToday.scss";

const NoteToday: FC = () => {
  return (
    <section className="today-notes">
      <Container>
        <Title text="Сегодняшние записи" />
        <NoteList />
      </Container>
    </section>
  );
};

export default NoteToday;
