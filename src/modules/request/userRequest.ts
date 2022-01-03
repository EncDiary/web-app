import axios, { AxiosError } from "axios";
import qs from "qs";
import { IAccount } from "../../types/account";
import { updateJwtToken } from "../jwt";
import { disableIsLoading, enableIsLoading } from "../loading";
import { errorAlert } from "../sweetalert";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const getErrorMessage = (error: AxiosError) =>
  error.response?.data.message ?? "Неизвестная ошибка";

export const registerRequest = (username: string, publicKey: string) => {
  enableIsLoading();

  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/register",
    data: qs.stringify({
      username,
      public_key: publicKey,
    }),
  })
    .catch((error: AxiosError) => {
      errorAlert(getErrorMessage(error));
    })
    .finally(disableIsLoading);
};

export const getDisposableKeyRequest = (username: string) => {
  enableIsLoading();

  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/request",
    data: qs.stringify({
      username,
    }),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
    disableIsLoading();
  });
};

export const authUserRequest = (username: string, signature: string) => {
  enableIsLoading();

  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/auth",
    data: qs.stringify({
      username,
      signature,
    }),
  })
    .catch((error: AxiosError) => {
      errorAlert(getErrorMessage(error));
    })
    .finally(disableIsLoading);
};

export const getBackupRequest = async (account: IAccount) => {
  enableIsLoading();
  await updateJwtToken(account);

  return axios({
    method: "get",
    baseURL: serverUrl,
    url: "/backup",
    headers: { Authorization: `Bearer ${account.token}` },
  })
    .catch((error: AxiosError) => {
      errorAlert(getErrorMessage(error));
    })
    .finally(disableIsLoading);
};

export const deleteAccountRequest = async (account: IAccount) => {
  enableIsLoading();
  await updateJwtToken(account);

  return axios({
    method: "delete",
    baseURL: serverUrl,
    url: `/delete_account`,
    headers: { Authorization: `Bearer ${account.token}` },
  })
    .catch((error: AxiosError) => {
      errorAlert(getErrorMessage(error));
    })
    .finally(disableIsLoading);
};
