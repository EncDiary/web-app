import { makeAutoObservable } from "mobx";

class App {
  hello = 0;
  account: { username: string; password: string } | undefined;
  constructor() {
    makeAutoObservable(this);
  }

  incrementHello() {
    ++this.hello;
  }

  checkPassword(username: string, password: string) {
    if (username === "admin" && password === "admin") {
      this.account = { username: username, password: password };
      return true;
    }
  }
}

export default new App();
