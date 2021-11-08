import { makeAutoObservable } from "mobx";
import { RootStore } from ".";

class AppStore {
  account: { username: string; password: string; token: string } | undefined;

  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setAccount(username: string, password: string, token: string) {
    this.account = { username, password, token };
  }

  clearAccount() {
    this.account = undefined;
  }
}

export default AppStore;
