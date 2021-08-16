import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { EnterIcon } from "../assets/SvgIcons";
import { unlockBookRedux } from "../redux/actions/appActions";

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function EnterPassword() {
  const dispatch = useDispatch();

  const input = useInputValue("");

  const currentBook = useSelector((state) => state.books.currentBook);

  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      dispatch(unlockBookRedux(input.value(), currentBook));
      input.clear();
    }
  }

  function enterPasswordPlaceholder() {
    if (currentBook) {
      return "Пароль для " + currentBook.title;
    } else {
      return "Следуйте инструкции";
    }
  }

  return (
    <div className="open__pass">
      <Form onSubmit={submitHandler} className="open__pass-form">
        <Form.Group className="mb-3">
          <Form.Control
            {...input.bind}
            type="password"
            placeholder={enterPasswordPlaceholder()}
            id="enter_password"
            className="input open__pass-input"
            autoFocus
          />
          {!currentBook && (
            <div>
              Список книг пуст. Создайте или найдите книгу используя кноки выше
            </div>
          )}
        </Form.Group>

        <button type="submit" className="open__pass-submit button">
          {EnterIcon}
        </button>
      </Form>
    </div>
  );
}

export default EnterPassword;
