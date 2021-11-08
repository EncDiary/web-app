import CryptoJS from "crypto-js";

export const aesDecrypt = (
  passphrase: string,
  encrypted: string,
  saltString: string,
  ivString: string
) => {
  const salt = CryptoJS.enc.Hex.parse(saltString);
  const iv = CryptoJS.enc.Hex.parse(ivString);

  const key = CryptoJS.PBKDF2(passphrase, salt, {
    hasher: CryptoJS.algo.SHA512,
    keySize: 64 / 8,
    iterations: 999,
  });

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv });
  try {
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return "";
  }
};

export const aesEncrypt = (passphrase: string, plaintext: string) => {
  const salt = CryptoJS.lib.WordArray.random(256);
  const iv = CryptoJS.lib.WordArray.random(16);

  const key = CryptoJS.PBKDF2(passphrase, salt, {
    hasher: CryptoJS.algo.SHA512,
    keySize: 64 / 8,
    iterations: 999,
  });

  const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv });

  return {
    ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
    salt: CryptoJS.enc.Hex.stringify(salt),
    iv: CryptoJS.enc.Hex.stringify(iv),
  };
};

export const generateRandomByte = (byteLength: number) => {
  const randomByte = CryptoJS.lib.WordArray.random(byteLength);
  return CryptoJS.enc.Hex.stringify(randomByte);
};

export const textToHex = (text: string) => {
  const hexByte = CryptoJS.enc.Utf8.parse(text);
  return CryptoJS.enc.Hex.stringify(hexByte);
};

export const getHashText = (text: string) => {
  const hashByte = CryptoJS.SHA256(text);
  return CryptoJS.enc.Hex.stringify(hashByte);
};
