import { makeAutoObservable } from "mobx";

class App {
  account: { username: string; password: string } | undefined;
  constructor() {
    makeAutoObservable(this);
  }

  setAccount(username: string, password: string) {
    this.account = { username, password };
  }
}

export default new App();
