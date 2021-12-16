import jwt from "jsonwebtoken";
import store from "../store";
import { IAccount } from "../types/account";
import {
  authUserRequest,
  getDisposableKeyRequest,
} from "./request/userRequest";
import { errorAlert } from "./sweetalert";

export const updateJwtToken = async (account: IAccount) => {
  const decodedToken = jwt.decode(account.token);
  if (!checkIsTokenExpired(decodedToken)) return;

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

const checkIsTokenExpired = (token: string | jwt.JwtPayload | null) => {
  return !(
    token &&
    typeof token !== "string" &&
    typeof token.exp === "number" &&
    Date.now() < (token.exp - 30) * 1000
  );
};
