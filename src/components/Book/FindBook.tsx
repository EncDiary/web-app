import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Title from "../Generic/Title";
import Button from "../Generic/Button";
import { useActions } from "../../hooks/useActions";

const FindBook: React.FC = () => {
  const [title, setTitle] = useState("");

  const { findBookRedux } = useActions();

  function onChangeTitle(value: string) {
    setTitle(value);
  }

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    findBookRedux(title);
  }

  return (
    <div className="open__find">
      <Title text="Найти книгу" className="open__find-title" />

      <Form className="open__find-form" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="book_title">
          <Form.Label>Название книги</Form.Label>
          <Form.Control
            className="open__find-input input form-control"
            type="text"
            onChange={(e) => onChangeTitle(e.target.value)}
            autoFocus
          />
        </Form.Group>

        <Button text="Добавить" className="open__find-submit button" />
      </Form>
    </div>
  );
};

export default FindBook;
