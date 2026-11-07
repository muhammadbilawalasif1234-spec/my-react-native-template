/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('react-native-google-mobile-ads', () => {
  const createAd = () => ({
    addAdEventListener: jest.fn(() => jest.fn()),
    load: jest.fn(),
    show: jest.fn(),
  });

  return {
    __esModule: true,
    AdEventType: { CLOSED: 'closed', LOADED: 'loaded' },
    BannerAd: () => null,
    BannerAdSize: { ANCHORED_ADAPTIVE_BANNER: 'anchored-adaptive-banner' },
    InterstitialAd: { createForAdRequest: jest.fn(createAd) },
    RewardedAd: { createForAdRequest: jest.fn(createAd) },
    RewardedAdEventType: { EARNED_REWARD: 'earned-reward', LOADED: 'loaded' },
    TestIds: { BANNER: 'banner', INTERSTITIAL: 'interstitial', REWARDED: 'rewarded' },
    default: () => ({ initialize: jest.fn().mockResolvedValue([]) }),
  };
});

jest.mock('@react-native-firebase/remote-config', () => ({
  fetchAndActivate: jest.fn().mockResolvedValue(true),
  getRemoteConfig: jest.fn(() => ({})),
  getValue: jest.fn(() => ({
    asBoolean: () => false,
    asString: () => 'Welcome to App-Kit!',
  })),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn().mockResolvedValue(undefined),
}));

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
