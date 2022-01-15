import { AES, algo, enc, lib, PBKDF2, SHA512 } from "crypto-js";
import JSEncrypt from "jsencrypt";

export const aesDecrypt = (
  passphrase: string | lib.WordArray,
  encrypted: string,
  saltString: string,
  ivString: string
) => {
  const salt = enc.Hex.parse(saltString);
  const iv = enc.Hex.parse(ivString);
  const key = passphraseToKey(passphrase, salt);

  const decrypted = AES.decrypt(encrypted, key, { iv });
  try {
    return decrypted.toString(enc.Utf8);
  } catch (error) {
    return "";
  }
};

export const aesEncrypt = (
  passphrase: string | lib.WordArray,
  plaintext: string
) => {
  const salt = generateRandomBytes(256);
  const iv = generateRandomBytes(16);
  const key = passphraseToKey(passphrase, salt);

  const encrypted = AES.encrypt(plaintext, key, { iv });

  return {
    ciphertext: enc.Base64.stringify(encrypted.ciphertext),
    salt: enc.Hex.stringify(salt),
    iv: enc.Hex.stringify(iv),
  };
};

const generateRandomBytes = (bytesNumber: number) => {
  return lib.WordArray.random(bytesNumber);
};

const passphraseToKey = (
  passphrase: string | lib.WordArray,
  salt: lib.WordArray
) => {
  return PBKDF2(passphrase, salt, {
    hasher: algo.SHA512,
    keySize: 64 / 8,
    iterations: 200,
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
