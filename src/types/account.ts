import JSEncrypt from "jsencrypt";

export interface IAccount {
  username: string;
  privateKey: JSEncrypt;
  token: string;
  passphrase: CryptoJS.lib.WordArray;
}
