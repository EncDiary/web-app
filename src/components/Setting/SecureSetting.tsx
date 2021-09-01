import { Formik, Field, Form } from "formik";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import SettingsTitle from "../Generic/SettingsTitle";
import Button from "../Generic/Button";
import { confirmationAlert } from "../Generic/SweetAlert";
import { FC } from "react";

interface IFormValues {
  old_password: string;
  new_password: string;
  new_password_again: string;
}

const SecureSetting: React.FC = () => {
  return (
    <>
      <SettingsTitle text="Безопасность" level={1} />
      <ExportBookSetting />
      <ChangePasswordSetting />
    </>
  );
};

const ExportBookSetting: FC = () => {
  const {
    books: { currentBook },
    app: { password },
  } = useTypedSelector((state) => state);

  const { exportNotesRedux } = useActions();

  const confirmGetDecryptedBackup = async () => {
    const result = await confirmationAlert({
      title: "Создать незашифрованный бэкап",
      text: "Хранение такого файла может быть не безопасно",
    });
    if (result.isConfirmed) {
      exportNotesRedux(currentBook, password, false);
    }
  };

  return (
    <>
      <SettingsTitle text="Экспорт записей" level={2} />
      <ul>
        <li>
          Экспорт в зашифрованном виде
          <Button
            onClick={() => exportNotesRedux(currentBook, password, true)}
            text="Скачать"
            className="button settings__button_inline"
          />
        </li>
        <li>
          Экспорт в чистом виде (небезопасно)
          <Button
            onClick={() => confirmGetDecryptedBackup()}
            text="Скачать"
            className="button settings__button_inline"
          />
        </li>
      </ul>
    </>
  );
};

const ChangePasswordSetting: FC = () => {
  const {
    app: { password },
    books: { currentBook },
  } = useTypedSelector((state) => state);

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
