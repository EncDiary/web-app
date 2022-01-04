import { enc } from "crypto-js";
import JSEncrypt from "jsencrypt";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSignature } from "../../modules/crypto";
import {
  authUserRequest,
  getDisposableKeyRequest,
} from "../../modules/request/userRequest";
import { errorAlert } from "../../modules/sweetalert";
import store from "../../store";

const Demo: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
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

      const signature = createSignature(jse, serverResponse.data.message);

      const serverAuthResponse = await authUserRequest(username, signature);
      if (!serverAuthResponse) return;

      const privateKeyBase64 = jse.getPrivateKeyB64();
      const passphrase = enc.Base64.parse(privateKeyBase64);

      store.appStore.setAccount(
        username.toLowerCase(),
        jse,
        serverAuthResponse.data.token,
        passphrase
      );

      navigate("/write");
    };

    demoAuth();
  }, [navigate]);

  return <></>;
};

export default Demo;
