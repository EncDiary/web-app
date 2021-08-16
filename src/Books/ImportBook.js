import { Formik, Field, Form } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Title from "../Components/Title";
import { importBookRedux } from "../redux/actions/booksActions";

function ImportBook() {
  const [file, setFile] = useState("");
  const dispatch = useDispatch();

  function submitForm(values) {
    console.log(values);
    console.log(file);
    dispatch(importBookRedux(values.title, values.password, file));
  }

  function readFile(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log(JSON.parse(e.target.result));
      setFile(JSON.parse(e.target.result));
    };
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
}

export default ImportBook;
