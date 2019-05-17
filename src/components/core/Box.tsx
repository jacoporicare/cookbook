import styled from 'react-emotion';
import {
  alignItems,
  AlignItemsProps,
  border,
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  borders,
  BordersProps,
  color,
  ColorProps,
  display,
  DisplayProps,
  flex,
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  flexWrap,
  FlexWrapProps,
  fontSize,
  FontSizeProps,
  height,
  HeightProps,
  justifyContent,
  JustifyContentProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  order,
  OrderProps,
  overflow,
  OverflowProps,
  ResponsiveValue,
  space,
  SpaceProps,
  style,
  textAlign,
  TextAlignProps,
  width,
  WidthProps,
} from 'styled-system';

export type Props = AlignItemsProps &
  BorderProps &
  BordersProps &
  BorderRadiusProps &
  ColorProps &
  DisplayProps &
  FlexDirectionProps &
  FlexProps &
  FlexWrapProps &
  FontSizeProps &
  HeightProps &
  JustifyContentProps &
  MaxHeightProps &
  MaxWidthProps &
  OrderProps &
  OverflowProps &
  SpaceProps &
  TextAlignProps &
  WidthProps;

export const Box = styled('div')<Props>(
  alignItems,
  border,
  borders,
  borderRadius,
  color,
  display,
  flex,
  flexDirection,
  flexWrap,
  fontSize,
  height,
  justifyContent,
  maxHeight,
  maxWidth,
  order,
  overflow,
  space,
  textAlign,
  width,
);
