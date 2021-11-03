import { makeAutoObservable } from "mobx";

class App {
  account: { username: string; password: string; token: string } | undefined;
  constructor() {
    makeAutoObservable(this);
  }

  setAccount(username: string, password: string, token: string) {
    this.account = { username, password, token };
  }
}

export default new App();
