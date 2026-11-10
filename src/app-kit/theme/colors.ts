export const Colors = {
  light: {
    primary: '#012E4F',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    card: '#FFFFFF',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    accent: '#38BDF8',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
  },
  dark: {
    primary: '#38BDF8',
    background: '#0D1117',
    surface: '#161B22',
    card: '#161B22',
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#30363D',
    accent: '#0284C7',
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
  },
};

export type ColorThemeType = typeof Colors.light;
