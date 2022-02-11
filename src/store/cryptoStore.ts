import { enc, lib } from "crypto-js";
import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { passphraseToKey } from "../modules/crypto";

class CryptoStore {
  rootStore: RootStore;
  aesKeys: { [key: string]: lib.WordArray } = {};

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  findOrCalculateAesKey(salt: string, passphrase: lib.WordArray) {
    const foundedKey = this.aesKeys[salt];
    if (foundedKey) return foundedKey;
    const calculatedKey = passphraseToKey(passphrase, enc.Hex.parse(salt));
    this.aesKeys[salt] = calculatedKey;
    return calculatedKey;
  }

  clearAesKeys() {
    this.aesKeys = {};
  }
}

export default CryptoStore;
