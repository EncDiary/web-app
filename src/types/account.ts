import { lib } from "crypto-js";
import JSEncrypt from "jsencrypt";

export interface IAccount {
  username: string;
  privateKey: JSEncrypt;
  token: string;
  passphrase: lib.WordArray;
  salt: lib.WordArray;
}
