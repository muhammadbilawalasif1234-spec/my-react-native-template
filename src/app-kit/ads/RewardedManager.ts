import mobileAds, {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxx~xxxxxxxx';

class RewardedManager {
  private rewardedAd: RewardedAd | null = null;
  private isLoaded = false;
  private isLoading = false;
  private pendingRewardCallback: ((reward: { amount: number; type: string }) => void) | null = null;

  public async loadAd() {
    if (this.isLoaded || this.isLoading) return;

    this.isLoading = true;
    try {
      await mobileAds().initialize();

      this.rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
      });

      this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
        this.isLoaded = true;
        this.isLoading = false;

        if (this.pendingRewardCallback && this.rewardedAd) {
          const callback = this.pendingRewardCallback;
          this.pendingRewardCallback = null;
          this.showAd(callback);
        }
      });

      this.rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
        this.isLoaded = false;
        this.isLoading = false;
        this.loadAd();
      });

      this.rewardedAd.load();
    } catch (error) {
      console.error('[RewardedManager] Error loading rewarded ad:', error);
      this.isLoading = false;
    }
  }

  public showAd(onRewardEarned: (reward: { amount: number; type: string }) => void) {
    if (this.isLoaded && this.rewardedAd) {
      const unsubscribeEarned = this.rewardedAd.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          onRewardEarned(reward);
        }
      );

      const unsubscribeClosed = this.rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
        unsubscribeEarned();
        unsubscribeClosed();
      });

      this.rewardedAd.show();
      this.isLoaded = false;
    } else {
      this.pendingRewardCallback = onRewardEarned;
      this.loadAd();
    }
  }
}

export const rewardedManager = new RewardedManager();
