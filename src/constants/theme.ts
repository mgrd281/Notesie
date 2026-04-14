import { ThemeColors } from '@types/index';

// Color Palette - Premium, warm, elegant tones
export const Colors = {
  // Primary Colors
  cream: '#FFFBF5',
  softYellow: '#FFF8DC',
  warmGold: '#F5DEB3',
  darkGray: '#2D2D2D',
  
  // Semantic Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Status Colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  
  // Gray Scale
  gray100: '#F7F7F7',
  gray200: '#EFEFEF',
  gray300: '#E0E0E0',
  gray400: '#C0C0C0',
  gray500: '#A0A0A0',
  gray600: '#808080',
  gray700: '#606060',
  gray800: '#404040',
};

export const LightTheme: ThemeColors = {
  background: Colors.cream,
  surface: Colors.white,
  text: Colors.darkGray,
  textSecondary: Colors.gray600,
  border: Colors.gray200,
  accent: Colors.warmGold,
  success: Colors.success,
  warning: Colors.warning,
  error: Colors.error,
  cardBackground: Colors.white,
  shadowColor: Colors.black,
};

export const DarkTheme: ThemeColors = {
  background: Colors.darkGray,
  surface: '#1F1F1F',
  text: Colors.cream,
  textSecondary: Colors.gray400,
  border: Colors.gray700,
  accent: Colors.warmGold,
  success: '#30B84D',
  warning: '#FF9500',
  error: '#FF453A',
  cardBackground: '#2D2D2D',
  shadowColor: Colors.black,
};

export const DefaultCategories = [
  { id: 'personal', name: 'Personal', color: '#FF6B6B', emoji: '👤' },
  { id: 'work', name: 'Work', color: '#4ECDC4', emoji: '💼' },
  { id: 'ideas', name: 'Ideas', color: '#FFD93D', emoji: '💡' },
];

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },
};
