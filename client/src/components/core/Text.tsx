import styled from 'react-emotion';
import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  space,
  SpaceProps,
} from 'styled-system';

export type Props = ColorProps & FontSizeProps & FontWeightProps & LineHeightProps & SpaceProps;

export const Text = styled('span')<Props>(color, fontSize, fontWeight, lineHeight, space);
