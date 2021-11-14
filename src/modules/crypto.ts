import CryptoJS from "crypto-js";

export const aesDecrypt = (
  passphrase: string | CryptoJS.lib.WordArray,
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

export const aesEncrypt = (
  passphrase: string | CryptoJS.lib.WordArray,
  plaintext: string
) => {
  const salt = generateRandomBytes(256);
  const iv = generateRandomBytes(16);

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

export const generateRandomBytes = (bytesNumber: number) => {
  return CryptoJS.lib.WordArray.random(bytesNumber);
};
