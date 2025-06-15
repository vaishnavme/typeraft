import { load, Store } from "@tauri-apps/plugin-store";

// StoreManager class to handle store operations
class StoreManager {
  private storePath = "config.json";
  private store!: Store;

  async init() {
    this.store = await load(this.storePath, { autoSave: false });
  }

  async addItem(key: string, value: string) {
    await this.store.set(key, JSON.stringify(value));
    await this.store.save();
  }

  async removeItem(key: string) {
    await this.store.delete(key);
    await this.store.save();
  }

  // Update an item by id
  async updateItem(key: string, value: string) {
    await this.store.set(key, JSON.stringify(value));
    await this.store.save();
  }

  // Get all items
  async getItem(key: string) {
    const item = await this.store.get(key);
    if (item) {
      return JSON.parse(item as string);
    }
    return null;
  }
}

export const storeKeys = {
  theme: "theme",
  font: "font",
};

const store = new StoreManager();

export default store;
