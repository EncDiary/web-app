import { Formik, Field, Form } from "formik";
import React, { useState } from "react";
import Title from "../Generic/Title";
import { useActions } from "../../hooks/useActions";

const ImportBook: React.FC = () => {
  interface MyFormValues {
    title: string;
    password: string;
  }

  const [file, setFile] = useState("");

  const { importBookRedux } = useActions();

  function submitForm(values: MyFormValues) {
    if (typeof file !== "string") {
      importBookRedux(values.title, values.password, file);
    }
  }

  function readFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const fileText = fileReader.result;
      if (typeof fileText === "string") {
        setFile(JSON.parse(fileText));
      }
    };
    if (e.currentTarget.files !== null) {
      fileReader.readAsText(e.currentTarget.files[0]);
    }
  }

  return (
    <div className="open__import">
      <Title text="Импортировать книгу" className="open__import-title" />

      <Formik
        initialValues={{
          title: "",
          password: "",
        }}
        onSubmit={submitForm}
      >
        <Form>
          <label htmlFor="title">Название</label>
          <Field id="title" name="title" type="text" />
          <br />

          <label htmlFor="password">Пароль</label>
          <Field id="password" name="password" type="text" />
          <br />

          <input name="file" type="file" onChange={readFile} />
          <hr />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ImportBook;
