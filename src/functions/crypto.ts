import CryptoJS from "crypto-js";

export const AesDecrypt = (
  passphrase: string,
  encrypted: string,
  salt_str: string,
  iv_str: string
) => {
  var salt = CryptoJS.enc.Hex.parse(salt_str);
  var iv = CryptoJS.enc.Hex.parse(iv_str);

  var key = CryptoJS.PBKDF2(passphrase, salt, {
    hasher: CryptoJS.algo.SHA512,
    keySize: 64 / 8,
    iterations: 999,
  });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });
  try {
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return "";
  }
};

export const dec2hex = (dec: number) => {
  return dec.toString(16).padStart(2, "0");
};

export const generateId = (len: number) => {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
};

export const textToHex = (text: string) => {
  const passwordHexByte = CryptoJS.enc.Utf8.parse(text);
  return CryptoJS.enc.Hex.stringify(passwordHexByte);
};
