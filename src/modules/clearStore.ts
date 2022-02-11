import store from "../store";

export const clearStore = () => {
  store.userStore.clearAccount();
  store.noteStore.clearNotes();
  store.cryptoStore.clearAesKeys();
};
