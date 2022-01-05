import { aesDecrypt } from "./crypto";

export const exportJson = (data: any, filename: string) => {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.json`;
  link.click();
};

export const exportDecryptedBackup = async (
  fetchedData: any,
  currentDate: string,
  passphrase: string | CryptoJS.lib.WordArray
) => {
  const notes: { text: string; datetime: number }[] = [];
  fetchedData.notes.forEach(
    (note: {
      ciphertext: string;
      datetime: number;
      iv: string;
      salt: string;
    }) => {
      const text = aesDecrypt(passphrase, note.ciphertext, note.salt, note.iv);
      notes.push({ text, datetime: note.datetime });
    }
  );

  exportJson(
    {
      username: fetchedData.username,
      is_encrypted: false,
      backup_date: currentDate,
      notes,
    },
    `EncDiary_decrypt_${currentDate}`
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

  exportJson(
    {
      username: fetchedData.username,
      is_encrypted: true,
      backup_date: currentDate,
      notes,
    },
    `EncDiary_encrypt_${currentDate}`
  );
};
