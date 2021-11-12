import axios, { AxiosError } from "axios";
import qs from "qs";
import { errorAlert } from "../sweetalert";
import { IAccount } from "../../types/account";
import { updateJwtToken } from "../jwt";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const getErrorMessage = (error: AxiosError) =>
  error.response?.data.message ?? "Неизвестная ошибка";

export const createNoteRequest = async (
  cipherNote: {
    ciphertext: string;
    iv: string;
    salt: string;
  },
  account: IAccount
) => {
  await updateJwtToken(account);

  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/note",
    headers: { Authorization: `Bearer ${account.token}` },
    data: qs.stringify(cipherNote),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const editNoteRequest = async (
  noteId: string,
  cipherNote: {
    ciphertext: string;
    iv: string;
    salt: string;
  },
  account: IAccount
) => {
  await updateJwtToken(account);

  return axios({
    method: "put",
    baseURL: serverUrl,
    url: `/note/${noteId}`,
    headers: { Authorization: `Bearer ${account.token}` },
    data: qs.stringify(cipherNote),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const deleteNoteRequest = async (noteId: string, account: IAccount) => {
  await updateJwtToken(account);

  return axios({
    method: "delete",
    baseURL: serverUrl,
    url: `/note/${noteId}`,
    headers: { Authorization: `Bearer ${account.token}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const getTodayNotesRequest = async (account: IAccount) => {
  await updateJwtToken(account);

  return axios({
    method: "get",
    baseURL: serverUrl,
    url: "/notes/today",
    headers: { Authorization: `Bearer ${account.token}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const getNotesWithLimit = async (
  limit: number,
  offset: number,
  account: IAccount
) => {
  await updateJwtToken(account);

  return axios({
    method: "get",
    baseURL: serverUrl,
    url: "/notes",
    params: { limit, offset },
    headers: { Authorization: `Bearer ${account.token}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};
