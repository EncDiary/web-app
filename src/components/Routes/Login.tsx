import { Link, useHistory } from "react-router-dom";
import { useFormState } from "../../hooks/useFormState";
import Button from "../Generic/Button";
import { FileInput, TextInput } from "../Generic/Input";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import UnauthorizedWrapper from "../Generic/UnauthorizedWrapper";
import "./Login.scss";
import { errorAlert } from "../../modules/sweetalert";
import {
  authUserRequest,
  getDisposableKeyRequest,
} from "../../modules/request";
import store from "../../store";
import JSEncrypt from "jsencrypt";
import { enc } from "crypto-js";
import { useFileInputState } from "../../hooks/useFileInputState";

const Login = () => {
  const history = useHistory();

  const [formValues, changeHandler] = useFormState({
    username: "",
  });

  const [fileText, fileName, setFileText, setFileName] = useFileInputState();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const serverResponse = await getDisposableKeyRequest(formValues.username);
    if (!serverResponse) return;

    const jse = new JSEncrypt();
    jse.setPrivateKey(fileText);

    const plaintext = jse.decrypt(serverResponse.data.ciphertext);

    if (!plaintext) {
      errorAlert("Неверный пароль");
      return;
    }

    const serverAuthResponse = await authUserRequest(
      formValues.username,
      plaintext
    );

    if (!serverAuthResponse) return;

    const privateKeyBase64 = jse.getPrivateKeyB64();
    const privateKey = enc.Base64.parse(privateKeyBase64);

    store.appStore.setAccount(
      formValues.username.toLowerCase(),
      jse,
      serverAuthResponse.data.token,
      privateKey
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
        <FileInput
          description="Приватный ключ"
          fileName={fileName}
          setFileName={setFileName}
          setFileText={setFileText}
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
