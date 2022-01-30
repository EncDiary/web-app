import jwt_decode from "jwt-decode";
import store from "../store";
import { IAccount } from "../types/account";
import { createSignature } from "./crypto";
import { authUserRequest, getAuthMessageRequest } from "./request/userRequest";

export const updateJwtToken = async (account: IAccount) => {
  const decodedToken: { exp: number } = jwt_decode(account.token);
  if (Date.now() < (decodedToken.exp - 30) * 1000) return;

  const serverResponse = await getAuthMessageRequest(account.username);
  if (!serverResponse) return;

  const signature = createSignature(
    account.privateKey,
    serverResponse.data.message
  );

  const serverAuthResponse = await authUserRequest(account.username, signature);
  if (!serverAuthResponse) return;

  store.userStore.updateToken(serverAuthResponse.data.token);
};
