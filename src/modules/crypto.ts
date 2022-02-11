import { AES, algo, enc, lib, PBKDF2, SHA512 } from "crypto-js";
import JSEncrypt from "jsencrypt";

export const aesDecrypt = (
  encrypted: string,
  key: lib.WordArray,
  ivString: string
) => {
  const iv = enc.Hex.parse(ivString);
  const decrypted = AES.decrypt(encrypted, key, { iv });
  try {
    return decrypted.toString(enc.Utf8);
  } catch (error) {
    return "";
  }
};

export const aesEncrypt = (plaintext: string, key: lib.WordArray) => {
  const iv = generateRandomBytes(128 / 8);
  const encrypted = AES.encrypt(plaintext, key, { iv });
  return {
    ciphertext: enc.Base64.stringify(encrypted.ciphertext),
    iv: enc.Hex.stringify(iv),
  };
};

export const generateRandomBytes = (bytesNumber: number) => {
  return lib.WordArray.random(bytesNumber);
};

export const passphraseToKey = (
  passphrase: lib.WordArray,
  salt: lib.WordArray
) => {
  return PBKDF2(passphrase, salt, {
    hasher: algo.SHA512,
    keySize: 256 / 32,
    iterations: 10000,
  });
};

export const createSignature = (jse: JSEncrypt, message: string) => {
  return (
    jse.sign(message, (text: string) => SHA512(text).toString(), "sha512") || ""
  );
};

export const checkKeypair = (privateKeyText: string, publicKeyText: string) => {
  const jsePrivKey = new JSEncrypt();
  const jsePubKey = new JSEncrypt();

  jsePrivKey.setPrivateKey(privateKeyText);
  jsePubKey.setPublicKey(publicKeyText);

  return {
    status: jsePrivKey.getPublicKeyB64() === jsePubKey.getPublicKeyB64(),
    jse: jsePrivKey,
  };
};

export const convertPrivKeyToPassphrase = (jse: JSEncrypt) =>
  enc.Base64.parse(jse.getPrivateKeyB64());
