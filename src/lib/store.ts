import { load, Store } from "@tauri-apps/plugin-store";
import { lookup_cache } from "./constants";

class StoreManager {
  private storePath = "app-config.json";
  private store!: Store;

  stackName: string | undefined;
  location: string | undefined;
  lookupPath: string | undefined;

  constructor() {
    (async () => {
      this.store = await load(this.storePath, { autoSave: false });
      this.preloadStore();
    })();
  }

  get config() {
    const stackPath = `${this.location}/${this.stackName}`;
    const lookupPath = `${this.location}/${this.stackName}/${lookup_cache}`;

    return {
      stackName: this.stackName,
      location: this.location,
      stackPath,
      lookupPath,
    };
  }

  async preloadStore() {
    const [locationPath, stackName] = await Promise.all([
      this.getItem(storeKeys.location),
      this.getItem(storeKeys.stackName),
    ]);

    this.location = locationPath;
    this.stackName = stackName;
  }

  async addItem(key: string, value: string) {
    await this.store.set(key, JSON.stringify(value));
    await this.store.save();
  }

  async removeItem(key: string) {
    await this.store.delete(key);
    await this.store.save();
  }

  async updateItem(key: string, value: string) {
    await this.store.set(key, JSON.stringify(value));
    await this.store.save();
  }

  async getItem(key: string) {
    const item = await this.store.get(key);
    if (item) {
      return JSON.parse(item as string);
    }
    return null;
  }

  async setLocation(value: string) {
    if (!value) return;
    this.addItem(storeKeys.location, value);
    this.location = value;
  }

  async setStackName(value: string) {
    if (!value) return;
    this.addItem(storeKeys.stackName, value);
    this.stackName = value;
  }
}

export const storeKeys = {
  theme: "theme",
  font: "font",
  location: "location",
  stackName: "stackName",
};

const store = new StoreManager();

export default store;
