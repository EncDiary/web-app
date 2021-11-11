import JSEncrypt from "jsencrypt";
import { makeAutoObservable } from "mobx";
import { RootStore } from ".";

class AppStore {
  account:
    | {
        username: string;
        privateKey: JSEncrypt;
        token: string;
        passphrase: CryptoJS.lib.WordArray;
      }
    | undefined;

  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setAccount(
    username: string,
    privateKey: JSEncrypt,
    token: string,
    passphrase: CryptoJS.lib.WordArray
  ) {
    this.account = { username, privateKey, token, passphrase };
  }

  clearAccount() {
    this.account = undefined;
  }
}

export default AppStore;
