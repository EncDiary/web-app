import React from "react";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordRedux } from "../redux/actions/appActions";

function SecureSetting() {
  const password = useSelector((state) => state.app.password);
  const currentBook = useSelector((state) => state.books.currentBook);

  const dispatch = useDispatch();

  function changePassword(values) {
    if (password === values.old_password) {
      if (values.new_password === values.new_password_again) {
        dispatch(changePasswordRedux(currentBook, password, values));
      } else {
        console.log("Пароли не совпадают");
      }
    } else {
      console.log("Не верный пароль");
    }
  }

  return (
    <>
      <h1 className="title settings__title settings__title_primary">
        Безопасность
      </h1>
      <h2 className="title settings__title settings__title_secondary">
        Изменение пароля
      </h2>
      <div>
        Во избежание потерь перед изменением пароля сохраните бэкап всех записей
      </div>

      <Formik
        initialValues={{
          old_password: "",
          new_password: "",
          new_password_again: "",
        }}
        onSubmit={changePassword}
      >
        <Form>
          <Field name="old_password" type="text" placeholder="Старый пароль" />
          <Field name="new_password" type="text" placeholder="Новый пароль" />
          <Field
            name="new_password_again"
            type="text"
            placeholder="Повторите пароль"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
}

export default SecureSetting;
