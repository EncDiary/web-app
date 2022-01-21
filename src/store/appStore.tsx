import { makeAutoObservable } from "mobx";
import { RootStore } from ".";

class AppStore {
  isLoading = false;
  isAppBlur = false;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsAppBlur(isBlur: boolean) {
    this.isAppBlur = isBlur;
  }
}

export default AppStore;
