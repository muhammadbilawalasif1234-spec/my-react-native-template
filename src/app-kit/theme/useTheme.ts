import { useColorScheme } from 'react-native';
import { Colors } from '@/app-kit/theme/colors';
import type { ColorThemeType } from '@/app-kit/theme/colors';
import { Spacing } from '@/app-kit/theme/spacing';

/** Returns theme colors and spacing based on the device color scheme. */
export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const themeColors: ColorThemeType = isDark ? Colors.dark : Colors.light;

  return {
    colors: themeColors,
    spacing: Spacing,
    isDark,
  };
};
