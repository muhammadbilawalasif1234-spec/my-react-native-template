import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageManager {
  public async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      if (jsonValue === undefined) {
        throw new TypeError('Storage values must be JSON serializable.');
      }
      await AsyncStorage.setItem(`@app_kit_${key}`, jsonValue);
    } catch (error) {
      console.error(`[StorageManager] Error saving key "${key}":`, error);
      throw error;
    }
  }

  public async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(`@app_kit_${key}`);
      if (jsonValue == null) return null;
      return JSON.parse(jsonValue) as T;
    } catch (error) {
      console.error(`[StorageManager] Error reading key "${key}":`, error);
      throw error;
    }
  }

  public async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`@app_kit_${key}`);
    } catch (error) {
      console.error(`[StorageManager] Error removing key "${key}":`, error);
      throw error;
    }
  }

  public async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const appKitKeys = keys.filter(key => key.startsWith('@app_kit_'));
      await Promise.all(appKitKeys.map(key => AsyncStorage.removeItem(key)));
    } catch (error) {
      console.error('[StorageManager] Error clearing storage:', error);
      throw error;
    }
  }
}

export const storage = new StorageManager();