import { Link, Navigate } from "react-router-dom";
import { useFormState } from "../../hooks/useFormState";
import Button from "../Generic/Button";
import FileInput from "../Generic/Input/FileInput";
import TextInput from "../Generic/Input/TextInput";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import "./Login.scss";
import {
  authUserRequest,
  getAuthMessageRequest,
} from "../../modules/request/userRequest";
import store from "../../store";
import JSEncrypt from "jsencrypt";
import { useFileInputState } from "../../hooks/useFileInputState";
import { useMemo } from "react";
import {
  checkPrivateKeyValidity,
  checkUsernameValidity,
} from "../../modules/validator";
import {
  convertPrivKeyToPassphrase,
  createSignature,
} from "../../modules/crypto";
import { errorAlert } from "../../modules/sweetalert";
import { spinnerCreator } from "../Generic/Spinner";

const Login = () => {
  const account = store.userStore.account;

  const [formValues, changeHandler] = useFormState({
    username: "",
  });

  const [fileText, fileName, setFileText, setFileName] = useFileInputState();

  const isFormValid = useMemo(() => {
    return (
      checkUsernameValidity(formValues.username.trim()) &&
      checkPrivateKeyValidity(fileText)
    );
  }, [formValues.username, fileText]);

  const auth = (username: string, privateKey: string) =>
    spinnerCreator(async () => {
      const serverGetMessageResponse = await getAuthMessageRequest(username);
      if (!serverGetMessageResponse) return;

      const jse = new JSEncrypt();
      jse.setPrivateKey(privateKey);

      const signature = createSignature(
        jse,
        serverGetMessageResponse.data.message
      );

      const serverAuthResponse = await authUserRequest(username, signature);
      if (!serverAuthResponse) return;

      const passphrase = convertPrivKeyToPassphrase(jse);
      store.userStore.setAccount(
        username.toLowerCase(),
        jse,
        serverAuthResponse.data.token,
        passphrase
      );
    });

  const authDemo = async () => {
    const username = process.env.REACT_APP_DEMO_USERNAME || "";
    const privateKey = process.env.REACT_APP_DEMO_PRIVATE_KEY || "";

    if (!username || !privateKey) {
      errorAlert("Невозможно открыть демоверсию");
      return;
    }
    await auth(username, privateKey);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) return;
    await auth(formValues.username.trim(), fileText);
  };

  return account ? (
    <Navigate to="/write" />
  ) : (
    <>
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
          id="login-upload-privkey"
          description="Приватный ключ"
          fileName={fileName}
          setFileName={setFileName}
          setFileText={setFileText}
        />
        <TextBlock size="small">
          Your private key won't be uploaded to the servers.
        </TextBlock>
        <Button
          size="large"
          type="submit"
          className="login__button"
          disabled={!isFormValid}
        >
          Login
        </Button>
      </form>
      <hr />
      <TextBlock size="small">
        Don't have account? <Link to="/register">Register</Link>
      </TextBlock>
      <Button
        colorTheme="secondary"
        className="login__demo-version"
        onClick={authDemo}
      >
        Попробовать Демоверсию
      </Button>
    </>
  );
};

export default Login;
