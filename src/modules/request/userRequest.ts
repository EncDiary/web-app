import axios, { AxiosError } from "axios";
import qs from "qs";
import { getErrorMessage } from ".";
import { IAccount } from "../../types/account";
import { updateJwtToken } from "../jwt";
import { errorAlert } from "../sweetalert";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const registerRequest = (
  username: string,
  publicKey: string,
  salt: string
) => {
  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/register",
    data: qs.stringify({
      username,
      public_key: publicKey,
      salt,
    }),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const getAuthMessageRequest = (username: string) => {
  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/request",
    data: qs.stringify({
      username,
    }),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const authUserRequest = (username: string, signature: string) => {
  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/auth",
    data: qs.stringify({
      username,
      signature,
    }),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const getBackupRequest = async (account: IAccount) => {
  await updateJwtToken(account);

  return axios({
    method: "get",
    baseURL: serverUrl,
    url: "/backup",
    headers: { Authorization: `Bearer ${account.token}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const deleteAccountRequest = async (account: IAccount) => {
  await updateJwtToken(account);

  return axios({
    method: "post",
    baseURL: serverUrl,
    url: `/delete_account`,
    headers: { Authorization: `Bearer ${account.token}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};
