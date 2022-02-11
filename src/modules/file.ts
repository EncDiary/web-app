import { lib } from "crypto-js";
import store from "../store";
import { aesDecrypt } from "./crypto";

export const exportFile = (
  data: string,
  filename: string,
  filetype: string
) => {
  const blob = new Blob([data], { type: filetype });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}`;
  link.click();
};

export const exportDecryptedBackup = async (
  fetchedData: any,
  currentDate: string,
  passphrase: lib.WordArray
) => {
  const notes: { text: string; datetime: number }[] = [];
  fetchedData.notes.forEach(
    (note: {
      ciphertext: string;
      datetime: number;
      iv: string;
      salt: string;
    }) => {
      const text = aesDecrypt(
        note.ciphertext,
        store.cryptoStore.findOrCalculateAesKey(note.salt, passphrase),
        note.iv
      );
      notes.push({ text, datetime: note.datetime });
    }
  );

  exportFile(
    JSON.stringify({
      username: fetchedData.username,
      is_encrypted: false,
      backup_date: currentDate,
      notes,
    }),
    `EncDiary_decrypt_${currentDate}.json`,
    "application/json"
  );
};

export const exportEncryptedBackup = async (
  fetchedData: any,
  currentDate: string
) => {
  const notes: {
    text: string;
    datetime: number;
    iv: string;
    salt: string;
  }[] = [];
  fetchedData.notes.forEach(
    (note: { text: string; datetime: number; iv: string; salt: string }) => {
      notes.push({ ...note, datetime: note.datetime });
    }
  );

  exportFile(
    JSON.stringify({
      username: fetchedData.username,
      is_encrypted: true,
      backup_date: currentDate,
      notes,
    }),
    `EncDiary_encrypt_${currentDate}.json`,
    "application/json"
  );
};
