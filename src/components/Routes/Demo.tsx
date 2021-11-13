import { enc } from "crypto-js";
import JSEncrypt from "jsencrypt";
import { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { disableIsLoading } from "../../modules/loading";
import {
  authUserRequest,
  getDisposableKeyRequest,
} from "../../modules/request/userRequest";
import { errorAlert } from "../../modules/sweetalert";
import store from "../../store";

const Demo: FC = () => {
  const history = useHistory();

  const demoAuth = async () => {
    const username = process.env.REACT_APP_DEMO_USERNAME || "";
    const privateKey = process.env.REACT_APP_DEMO_PRIVATE_KEY || "";

    if (!username || !privateKey) {
      errorAlert("Невозможно открыть демоверсию");
      return;
    }

    const serverResponse = await getDisposableKeyRequest(username);
    if (!serverResponse) return;

    const jse = new JSEncrypt();
    jse.setPrivateKey(privateKey);

    const plaintext = jse.decrypt(serverResponse.data.ciphertext);

    if (!plaintext) {
      disableIsLoading();
      errorAlert("Неверный пароль");
      return;
    }

    const serverAuthResponse = await authUserRequest(username, plaintext);
    if (!serverAuthResponse) return;

    const privateKeyBase64 = jse.getPrivateKeyB64();
    const passpharase = enc.Base64.parse(privateKeyBase64);

    store.appStore.setAccount(
      username.toLowerCase(),
      jse,
      serverAuthResponse.data.token,
      passpharase
    );

    history.push("/write");
  };

  useEffect(() => {
    demoAuth();
  }, []);

  return <></>;
};

export default Demo;
