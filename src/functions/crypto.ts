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

export const AesEncrypt = (passphrase: string, plaintext: string) => {
  var salt = CryptoJS.lib.WordArray.random(256);
  var iv = CryptoJS.lib.WordArray.random(16);

  var key = CryptoJS.PBKDF2(passphrase, salt, {
    hasher: CryptoJS.algo.SHA512,
    keySize: 64 / 8,
    iterations: 999,
  });

  var encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv: iv });

  var data = {
    ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
    salt: CryptoJS.enc.Hex.stringify(salt),
    iv: CryptoJS.enc.Hex.stringify(iv),
  };
  return data;
};

export const decToHex = (decimalNumber: number) => {
  return decimalNumber.toString(16).padStart(2, "0");
};

export const generateId = (len: number) => {
  var randomNumbers = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(randomNumbers);
  return Array.from(randomNumbers, decToHex).join("");
};

export const textToHex = (text: string) => {
  const hexByte = CryptoJS.enc.Utf8.parse(text);
  return CryptoJS.enc.Hex.stringify(hexByte);
};

export const getHashText = (text: string) => {
  const hashByte = CryptoJS.SHA256(text);
  return CryptoJS.enc.Hex.stringify(hashByte);
};
