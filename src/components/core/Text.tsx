import styled from '@emotion/styled';
import {
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  space,
  SpaceProps,
} from 'styled-system';

export type Props = FontSizeProps & FontWeightProps & LineHeightProps & SpaceProps;

export const Text = styled.span<Props>(fontSize, fontWeight, lineHeight, space);
