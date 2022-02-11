import AppStore from "./appStore";
import NoteStore from "./noteStore";
import SettingStore from "./settingStore";
import UserStore from "./userStore";
import CryptoStore from "./cryptoStore";

export class RootStore {
  appStore = new AppStore(this);
  noteStore = new NoteStore(this);
  settingStore = new SettingStore(this);
  userStore = new UserStore(this);
  cryptoStore = new CryptoStore(this);
}

export default new RootStore();
