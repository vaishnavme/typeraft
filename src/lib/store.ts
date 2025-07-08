import { load, Store } from "@tauri-apps/plugin-store";
import { lookup_cache } from "./constants";
import type { Font, Theme } from "../provider/theme-provider";

class StoreManager {
  private storePath = "typeraft-config.json";
  private store!: Store;

  stackName: string | undefined;
  location: string | undefined;
  lookupPath: string | undefined;
  theme: Theme | undefined;
  font: Font | undefined;

  constructor() {
    (async () => {
      this.store = await load(this.storePath, { autoSave: false });
      this.preloadStore();
    })();
  }

  get config() {
    let stackPath;
    let lookupPath;

    if (this.location && this.stackName) {
      stackPath = `${this.location}/${this.stackName}`;
      lookupPath = `${this.location}/${this.stackName}/${lookup_cache}`;
    }

    return {
      stackName: this.stackName,
      location: this.location,
      stackPath,
      lookupPath,
    };
  }

  async preloadStore() {
    const [locationPath, stackName, theme, font] = await Promise.all([
      this.getItem(storeKeys.location),
      this.getItem(storeKeys.stackName),
      this.getItem(storeKeys.theme),
      this.getItem(storeKeys.font),
    ]);

    this.location = locationPath;
    this.stackName = stackName;
    this.theme = theme;
    this.font = font;
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

  async setTheme(value: Theme) {
    if (!value) return;
    this.addItem(storeKeys.theme, value);
    this.theme = value;
  }

  async setFont(value: Font) {
    if (!value) return;
    this.addItem(storeKeys.font, value);
    this.font = value;
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
