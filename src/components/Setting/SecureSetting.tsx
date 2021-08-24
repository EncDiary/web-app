import { Formik, Field, Form } from "formik";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import SettingsTitle from "../Generic/SettingsTitle";

interface IFormValues {
  old_password: string;
  new_password: string;
  new_password_again: string;
}

const SecureSetting: React.FC = () => {
  const password = useTypedSelector((state) => state.app.password);
  const currentBook = useTypedSelector((state) => state.books.currentBook);

  const { changePasswordRedux } = useActions();

  function changePassword(values: IFormValues) {
    if (password === values.old_password) {
      if (values.new_password === values.new_password_again) {
        changePasswordRedux(currentBook, password, values);
      } else {
        console.log("Пароли не совпадают");
      }
    } else {
      console.log("Не верный пароль");
    }
  }

  return (
    <>
      <SettingsTitle text="Безопасность" level={1} />
      <SettingsTitle text="Изменение пароля" level={2} />
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
};

export default SecureSetting;
