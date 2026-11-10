import { storage } from '@/app-kit/storage/StorageManager';

class AppFlowManager {
  private readonly ONBOARDING_KEY = '@app_kit_has_seen_onboarding';

  /**
   * Check if the user has completed the onboarding flow
   */
  public async hasSeenOnboarding(): Promise<boolean> {
    try {
      const value = await storage.getItem<boolean>(this.ONBOARDING_KEY);
      return value === true;
    } catch (error) {
      console.error('[AppFlowManager] Error checking onboarding status:', error);
      return false;
    }
  }

  /**
   * Mark onboarding as completed
   */
  public async completeOnboarding(): Promise<void> {
    try {
      await storage.setItem(this.ONBOARDING_KEY, true);
      console.log('[AppFlowManager] Onboarding marked as completed.');
    } catch (error) {
      console.error('[AppFlowManager] Error saving onboarding status:', error);
    }
  }

  /**
   * Reset onboarding (useful for testing or logout flows)
   */
  public async resetOnboarding(): Promise<void> {
    try {
      await storage.removeItem(this.ONBOARDING_KEY);
      console.log('[AppFlowManager] Onboarding reset.');
    } catch (error) {
      console.error('[AppFlowManager] Error resetting onboarding:', error);
    }
  }
}

export const appFlowManager = new AppFlowManager();
