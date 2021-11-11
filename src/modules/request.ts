import axios, { AxiosError } from "axios";
import qs from "qs";
import { errorAlert } from "./sweetalert";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const getErrorMessage = (error: AxiosError) =>
  error.response?.data.message ?? "Неизвестная ошибка";

export const createNoteRequest = (
  cipherNote: {
    ciphertext: string;
    iv: string;
    salt: string;
  },
  jwtToken: string
) => {
  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/note",
    headers: { Authorization: `Bearer ${jwtToken}` },
    data: qs.stringify(cipherNote),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const editNoteRequest = (
  noteId: string,
  cipherNote: {
    ciphertext: string;
    iv: string;
    salt: string;
  },
  jwtToken: string
) => {
  return axios({
    method: "put",
    baseURL: serverUrl,
    url: `/note/${noteId}`,
    headers: { Authorization: `Bearer ${jwtToken}` },
    data: qs.stringify(cipherNote),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const deleteNoteRequest = (noteId: string, jwtToken: string) => {
  return axios({
    method: "delete",
    baseURL: serverUrl,
    url: `/note/${noteId}`,
    headers: { Authorization: `Bearer ${jwtToken}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const getTodayNotesRequest = (jwtToken: string) => {
  return axios({
    method: "get",
    baseURL: serverUrl,
    url: "/notes/today",
    headers: { Authorization: `Bearer ${jwtToken}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

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

export const getNotesWithLimit = async (
  limit: number,
  offset: number,
  jwtToken: string
) => {
  return axios({
    method: "get",
    baseURL: serverUrl,
    url: "/notes",
    params: { limit, offset },
    headers: { Authorization: `Bearer ${jwtToken}` },
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
