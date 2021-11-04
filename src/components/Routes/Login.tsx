import axios, { AxiosError } from "axios";
import qs from "qs";
import { Link, useHistory } from "react-router-dom";
import { useFormState } from "../../hooks/useFormState";
import store from "../../store";
import Button from "../Generic/Button";
import { TextInput } from "../Generic/Input";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import UnauthorizedWrapper from "../Generic/UnauthorizedWrapper";
import "./Login.scss";
import { AesDecrypt } from "../../functions/crypto";
import { errorPopup } from "../Generic/Popup";

const Login = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const history = useHistory();

  const [formValues, changeHandler] = useFormState({
    username: "",
    password: "",
  });

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const plaintext = await axios({
      method: "post",
      url: serverUrl + "request",
      data: qs.stringify({
        username: formValues.username,
      }),
    })
      .then((response) => {
        const plaintext = AesDecrypt(
          formValues.password,
          response.data.ciphertext,
          response.data.salt,
          response.data.iv
        );
        return plaintext;
      })
      .catch((error: AxiosError) => {
        const errorText = error.response?.data.message ?? "Неизвестная ошибка";
        errorPopup(errorText);
      });

    if (plaintext === undefined) return;

    if (!plaintext.length) {
      errorPopup("Неверный пароль");
      return;
    }

    const token = await axios({
      method: "post",
      url: serverUrl + "auth",
      data: qs.stringify({
        username: formValues.username,
        plain: plaintext,
      }),
    })
      .then((response) => {
        return response.data.token;
      })
      .catch((error: AxiosError) => {
        const errorText = error.response?.data.message ?? "Неизвестная ошибка";
        errorPopup(errorText);
      });

    if (token === undefined) return;

    store.app.setAccount(formValues.username, formValues.password, token);
    history.push("/write");
  };

  return (
    <UnauthorizedWrapper>
      <Title text="Login" size="largest" />
      <form onSubmit={submitHandler}>
        <TextInput
          placeholder="Username"
          value={formValues.username}
          name="username"
          onChange={changeHandler}
          size="large"
        />
        <TextInput
          placeholder="Password"
          type="password"
          value={formValues.password}
          name="password"
          onChange={changeHandler}
          size="large"
        />
        <TextBlock size="small">
          Your private key won't be uploaded to the servers.
        </TextBlock>
        <Button
          text="Login"
          size="large"
          type="submit"
          className="login__button"
        />
      </form>
      <hr />
      <TextBlock size="small">
        Don't have account? <Link to="/register">Register</Link>
      </TextBlock>
    </UnauthorizedWrapper>
  );
};

export default Login;
