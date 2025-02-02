export const LIGHT_COLORS = {
  primary: '#22ff00',
  background: '#1eb696',
  card: '#8f3f3f',
  text: '#000000',
  border: '#C6C6C8',
  error: '#DC3545',
  white: '#FFFFFF',
  shadow: '#000000',
  textLight: '#6C757D',
};

export const DARK_COLORS = {
  primary: '#0A84FF',
  background: '#000000',
  card: '#1C1C1E',
  text: '#FFFFFF',
  border: '#38383A',
  error: '#FF453A',
  white: '#FFFFFF',
  shadow: '#000000',
  textLight: '#8E8E93',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONTS = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  xlarge: 20,
};

export type Theme = {
  dark: boolean;
  colors: typeof LIGHT_COLORS;
};