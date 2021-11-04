import { FC } from "react";
import { ButtonLink } from "../Generic/Button";
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
        <ButtonLink
          text="Все записи"
          link="/notes"
          className="today-notes__full-list-button"
        />
      </Container>
    </section>
  );
};

export default NoteToday;
