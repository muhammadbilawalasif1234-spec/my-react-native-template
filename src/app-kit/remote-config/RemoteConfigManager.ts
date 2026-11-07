// @ts-ignore
import remoteConfig from '@react-native-firebase/remote-config';

class RemoteConfigManager {
  private isInitialized = false;

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Set minimum fetch interval for dev/prod
      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: __DEV__ ? 0 : 3600000,
      });

      // Set default values
      await remoteConfig().setDefaults({
        maintenance_mode: false,
        welcome_message: 'Welcome to App-Kit!',
        banner_ad_enabled: true,
      });

      // Fetch and activate remote config values
      await remoteConfig().fetchAndActivate();
      this.isInitialized = true;
      console.log('[RemoteConfigManager] Initialized successfully.');
    } catch (error) {
      console.error('[RemoteConfigManager] Error initializing remote config:', error);
    }
  }

  public getBoolean(key: string): boolean {
    try {
      return remoteConfig().getValue(key).asBoolean();
    } catch (error) {
      console.error(`[RemoteConfigManager] Error getting boolean for "${key}":`, error);
      return false;
    }
  }

  public getString(key: string): string {
    try {
      return remoteConfig().getValue(key).asString();
    } catch (error) {
      console.error(`[RemoteConfigManager] Error getting string for "${key}":`, error);
      return 'Welcome to App-Kit!';
    }
  }
}

export const remoteConfigManager = new RemoteConfigManager();