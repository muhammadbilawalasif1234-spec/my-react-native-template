// @ts-ignore
import analytics from '@react-native-firebase/analytics';

class AnalyticsManager {
  /**
   * Log a custom event with optional parameters
   */
  public async logEvent(eventName: string, params?: Record<string, any>): Promise<void> {
    try {
      await analytics().logEvent(eventName, params);
      console.log(`[AnalyticsManager] Event logged: "${eventName}"`, params || '');
    } catch (error) {
      console.error(`[AnalyticsManager] Error logging event "${eventName}":`, error);
    }
  }

  /**
   * Track specific screen views
   */
  public async logScreenView(screenName: string, screenClass: string): Promise<void> {
    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenClass,
      });
      console.log(`[AnalyticsManager] Screen tracked: "${screenName}"`);
    } catch (error) {
      console.error(`[AnalyticsManager] Error tracking screen "${screenName}":`, error);
    }
  }

  /**
   * Set User ID for tracking specific user sessions
   */
  public async setUserId(userId: string): Promise<void> {
    try {
      await analytics().setUserId(userId);
    } catch (error) {
      console.error('[AnalyticsManager] Error setting user ID:', error);
    }
  }

  /**
   * Set User Properties (e.g., premium status, theme preference)
   */
  public async setUserProperty(name: string, value: string): Promise<void> {
    try {
      await analytics().setUserProperty(name, value);
    } catch (error) {
      console.error(`[AnalyticsManager] Error setting user property "${name}":`, error);
    }
  }
}

export const analyticsManager = new AnalyticsManager();
