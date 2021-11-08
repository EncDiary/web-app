import { Link, useHistory } from "react-router-dom";
import { useFormState } from "../../hooks/useFormState";
import Button from "../Generic/Button";
import { TextInput } from "../Generic/Input";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import UnauthorizedWrapper from "../Generic/UnauthorizedWrapper";
import "./Login.scss";
import { aesDecrypt, getHashText, textToHex } from "../../modules/crypto";
import { errorAlert } from "../../modules/sweetalert";
import {
  authUserRequest,
  getDisposableKeyRequest,
} from "../../modules/request";
import store from "../../store";

const Login = () => {
  const history = useHistory();

  const [formValues, changeHandler] = useFormState({
    username: "",
    password: "",
  });

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const serverResponse = await getDisposableKeyRequest(formValues.username);
    if (!serverResponse) return;

    const passwordHexText = textToHex(formValues.password);
    const saltHexText = serverResponse.data.password_salt;
    const saltyPasswordHashText = getHashText(passwordHexText + saltHexText);

    const plaintext = aesDecrypt(
      saltyPasswordHashText,
      serverResponse.data.ciphertext,
      serverResponse.data.salt,
      serverResponse.data.iv
    );

    if (!plaintext.length) {
      errorAlert("Неверный пароль");
      return;
    }

    const serverAuthResponse = await authUserRequest(
      formValues.username,
      plaintext
    );

    if (!serverAuthResponse) return;

    store.appStore.setAccount(
      formValues.username.toLowerCase(),
      formValues.password,
      serverAuthResponse.data.token
    );
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
