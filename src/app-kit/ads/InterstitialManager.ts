import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxx~xxxxxxxx';

class InterstitialManager {
  private interstitial: InterstitialAd | null = null;
  private isLoaded = false;
  private isLoading = false;

  public loadAd() {
    if (this.isLoaded || this.isLoading) return;

    this.isLoading = true;
    try {
      this.interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
      });

      this.interstitial.addAdEventListener(AdEventType.LOADED, () => {
        this.isLoaded = true;
        this.isLoading = false;
      });

      this.interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        this.isLoaded = false;
        this.isLoading = false;
        this.loadAd();
      });

      this.interstitial.load();
    } catch (error) {
      console.error('[InterstitialManager] Error loading interstitial ad:', error);
      this.isLoading = false;
    }
  }

  public showAd(onAdClosed?: () => void) {
    if (this.isLoaded && this.interstitial) {
      if (onAdClosed) {
        const unsubscribe = this.interstitial.addAdEventListener(AdEventType.CLOSED, () => {
          unsubscribe();
          onAdClosed();
        });
      }
      this.interstitial.show();
    } else {
      this.loadAd();
    }
  }
}

export const interstitialManager = new InterstitialManager();
