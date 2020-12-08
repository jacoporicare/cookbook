import { blue, cyan, green, grey, red, yellow } from '@material-ui/core/colors';
import { parseToRgb } from 'polished';

export const colors = {
  white: '#fff',
  gray100: grey[100],
  gray200: grey[200],
  gray300: grey[300],
  gray400: grey[400],
  gray500: grey[500],
  gray600: grey[600],
  gray700: grey[700],
  gray800: grey[800],
  gray900: grey[900],
  black: '#000',
  blue: blue[500],
  red: red[700],
};

export const theme = {
  primary: blue[500],
  success: green[800],
  info: cyan[600],
  warning: yellow[500],
  danger: red[700],
  dark: grey[900],
  light: grey[100],
};

export function colorYiq(color: string) {
  const { red, green, blue } = parseToRgb(color);
  const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

  return yiq >= 150 ? grey[900] : 'white';
}
