import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { 
  useTheme, 
  PrimaryButton, 
  BannerAdView, 
  interstitialManager, 
  rewardedManager,
  remoteConfigManager,
  analyticsManager,
  localizationManager 
} from '@app-kit';

export default function App() {
  const { colors, spacing } = useTheme();
  const [currentText, setCurrentText] = useState(localizationManager.t('welcome'));

  useEffect(() => {
    interstitialManager.loadAd();
    rewardedManager.loadAd();
    
    const initApp = async () => {
      await remoteConfigManager.initialize();
      await analyticsManager.logScreenView('HomeScreen', 'App');
    };
    initApp();
  }, []);

  const handleToggleLanguage = () => {
    const newLang = localizationManager.getCurrentLocale() === 'en' ? 'ur' : 'en';
    localizationManager.setLocale(newLang);
    setCurrentText(localizationManager.t('welcome'));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.content, { padding: spacing.xl }]}>
        <Text style={[styles.title, { color: colors.textPrimary, marginBottom: spacing.lg }]}>
          {currentText}
        </Text>

        <PrimaryButton 
          title="Switch Language (EN / UR)" 
          onPress={handleToggleLanguage} 
        />
        
        <View style={{ height: spacing.md }} />
        
        <PrimaryButton 
          title="Show Interstitial Ad" 
          onPress={() => interstitialManager.showAd(() => console.log('Closed'))} 
        />
      </View>

      <BannerAdView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
});