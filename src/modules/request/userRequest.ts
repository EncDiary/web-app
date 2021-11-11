import axios, { AxiosError } from "axios";
import qs from "qs";
import { errorAlert } from "../sweetalert";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const getErrorMessage = (error: AxiosError) =>
  error.response?.data.message ?? "Неизвестная ошибка";

export const registerRequest = (username: string, publicKey: string) => {
  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/register",
    data: qs.stringify({
      username,
      public_key: publicKey,
    }),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const getDisposableKeyRequest = (username: string) => {
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

export const authUserRequest = (username: string, plaintext: string) => {
  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/auth",
    data: qs.stringify({
      username,
      plain: plaintext,
    }),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const getBackupRequest = (jwtToken: string) => {
  return axios({
    method: "get",
    baseURL: serverUrl,
    url: "/backup",
    headers: { Authorization: `Bearer ${jwtToken}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const deleteAccountRequest = (jwtToken: string) => {
  return axios({
    method: "delete",
    baseURL: serverUrl,
    url: `/delete_account`,
    headers: { Authorization: `Bearer ${jwtToken}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};