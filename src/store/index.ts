import AppStore from "./appStore";
import NoteStore from "./noteStore";
import SettingStore from "./settingStore";

export class RootStore {
  appStore = new AppStore(this);
  noteStore = new NoteStore(this);
  settingStore = new SettingStore(this);
}

export default new RootStore();
