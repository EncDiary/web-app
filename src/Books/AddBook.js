import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Title from "../Components/Title";
import Button from "../Components/Button";
import { useDispatch } from "react-redux";
import { createBookRedux } from "../redux/actions/booksActions";

function AddBook() {
  // const { addBook } = useContext(Context);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const dispatch = useDispatch();

  function onChangeTitle(value) {
    setTitle(value);
  }

  function onChangePassword(value) {
    setPassword(value);
  }

  function onChangePasswordAgain(value) {
    setPasswordAgain(value);
  }

  function submitHandler(event) {
    event.preventDefault();
    if (password === passwordAgain) {
      if (!title.trim()) {
        // Если название пустое
        return;
      }

      dispatch(createBookRedux(title, password)); // Заменить на хук
    } else {
      console.log("Пароли отличаются");
    }
  }

  return (
    <div className="open__add">
      <Title text="Создание новой книги" className="open__add-title" />

      <Form className="open__add-form" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="book_title">
          <Form.Label>Название книги</Form.Label>
          <Form.Control
            className="open__add-input input form-control"
            type="text"
            onChange={(e) => onChangeTitle(e.target.value)}
            autoFocus
          />
          <Form.Text className="text-muted">
            Запишите название книги! Оно пригодится вам при открытии книги. Без
            него вы рискуете потерять доступ к записям. Название должно быть
            уникальным
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="book_password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            className="open__add-input input form-control"
            type="text"
            onChange={(e) => onChangePassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="book_password_again">
          <Form.Label>Повторите пароль</Form.Label>
          <Form.Control
            className="open__add-input input form-control"
            type="text"
            onChange={(e) => onChangePasswordAgain(e.target.value)}
          />
        </Form.Group>

        <Button text="Добавить" className="open__add-submit button" />
      </Form>
    </div>
  );
}

export default AddBook;
