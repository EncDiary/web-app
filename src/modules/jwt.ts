import jwt from "jsonwebtoken";
import store from "../store";
import { IAccount } from "../types/account";
import {
  authUserRequest,
  getDisposableKeyRequest,
} from "./request/userRequest";
import { errorAlert } from "./sweetalert";

export const updateJwtToken = async (account: IAccount) => {
  const decodeToken = jwt.decode(account.token);

  if (
    !decodeToken ||
    typeof decodeToken === "string" ||
    typeof decodeToken.exp !== "number" ||
    Date.now() < (decodeToken.exp - 30) * 1000
  ) {
    return;
  }

  const serverResponse = await getDisposableKeyRequest(account.username);
  if (!serverResponse) return;

  const plaintext = account.privateKey.decrypt(serverResponse.data.ciphertext);
  if (!plaintext) {
    errorAlert("Неверный ключ");
    return;
  }

  const serverAuthResponse = await authUserRequest(account.username, plaintext);
  if (!serverAuthResponse) return;

  store.appStore.updateToken(serverAuthResponse.data.token);
};
