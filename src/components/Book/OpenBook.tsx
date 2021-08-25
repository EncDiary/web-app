import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { EnterIcon } from "../../assets/svg/AppIcons";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

const OpenBook: React.FC = () => {
  const { unlockBookRedux } = useActions();

  const input = useInputValue("");

  const currentBook = useTypedSelector((state) => state.books.currentBook);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    if (input.value().trim()) {
      unlockBookRedux(input.value(), currentBook);
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
};

export default OpenBook;
