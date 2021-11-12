import JSEncrypt from "jsencrypt";
import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { IAccount } from "../types/account";

class AppStore {
  account?: IAccount;

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

  updateToken(token: string) {
    if (this.account) {
      this.account.token = token;
    }
  }

  clearAccount() {
    this.account = undefined;
  }
}

export default AppStore;
