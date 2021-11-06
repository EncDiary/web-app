import { makeAutoObservable } from "mobx";

class App {
  account: { username: string; password: string; token: string } | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setAccount(username: string, password: string, token: string) {
    this.account = { username, password, token };
  }

  clearAccount() {
    this.account = undefined;
  }
}

export default new App();
