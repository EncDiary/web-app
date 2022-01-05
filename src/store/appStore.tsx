import JSEncrypt from "jsencrypt";
import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { IAccount } from "../types/account";

class AppStore {
  account?: IAccount;
  isLoading = false;
  isAppBlur = false;
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
    this.rootStore.noteStore.clearNotes();
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsAppBlur(isBlur: boolean) {
    this.isAppBlur = isBlur;
  }
}

export default AppStore;
