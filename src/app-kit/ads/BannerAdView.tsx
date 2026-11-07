import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

interface BannerAdViewProps {
  size?: BannerAdSize;
  unitId?: string;
}

export const BannerAdView: React.FC<BannerAdViewProps> = ({
  size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
  unitId = TestIds.BANNER,
}) => {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={unitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
});