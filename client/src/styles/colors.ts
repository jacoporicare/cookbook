import { parseToRgb } from 'polished';

export const colors = {
  white: '#fff',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
  gray1000: '#1d2029',
  black: '#000',
  blue: '#007bff',
  indigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#e83e8c',
  red: '#dc3545',
  orange: '#fd7e14',
  yellow: '#ffc107',
  green: '#28a745',
  teal: '#20c997',
  cyan: '#17a2b8',
};

export const theme = {
  primary: 'dodgerblue',
  success: colors.green,
  info: colors.cyan,
  warning: colors.yellow,
  danger: colors.red,
  dark: colors.gray900,
  light: colors.gray100,
};

export function colorYiq(color: string) {
  const { red, green, blue } = parseToRgb(color);
  const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

  return yiq >= 150 ? colors.gray900 : colors.white;
}
