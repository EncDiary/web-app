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
