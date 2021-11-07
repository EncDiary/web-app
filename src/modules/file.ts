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
  password: string
) => {
  const notes: { text: string; datetime: number }[] = [];
  fetchedData.notes.forEach(
    (note: { text: string; datetime: string; iv: string; salt: string }) => {
      const text = aesDecrypt(password, note.text, note.salt, note.iv);
      notes.push({ text, datetime: +note.datetime });
    }
  );

  exportJson(
    {
      username: fetchedData.user.username,
      encryption_type: "none",
      backup_date: currentDate,
      notes,
    },
    "EncDiary_none"
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
    (note: { text: string; datetime: string; iv: string; salt: string }) => {
      notes.push({ ...note, datetime: +note.datetime });
    }
  );

  exportJson(
    {
      username: fetchedData.user.username,
      encryption_type: fetchedData.user.encryption_type,
      password_salt: fetchedData.user.password_salt,
      backup_date: currentDate,
      notes,
    },
    `EncDiary_${fetchedData.user.encryption_type}`
  );
};
