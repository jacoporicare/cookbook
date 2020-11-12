import styled from '@emotion/styled';
import {
  alignItems,
  AlignItemsProps,
  border,
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  borders,
  BordersProps,
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
  minHeight,
  MinHeightProps,
  minWidth,
  MinWidthProps,
  order,
  OrderProps,
  overflow,
  OverflowProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  width,
  WidthProps,
} from 'styled-system';

export type Props = AlignItemsProps &
  BorderProps &
  BordersProps &
  BorderRadiusProps &
  DisplayProps &
  FlexDirectionProps &
  FlexProps &
  FlexWrapProps &
  FontSizeProps &
  HeightProps &
  JustifyContentProps &
  MaxHeightProps &
  MaxWidthProps &
  MinHeightProps &
  MinWidthProps &
  OrderProps &
  OverflowProps &
  SpaceProps &
  TextAlignProps &
  WidthProps;

export const Box = styled.div<Props>(
  alignItems,
  border,
  borders,
  borderRadius,
  display,
  flex,
  flexDirection,
  flexWrap,
  fontSize,
  height,
  justifyContent,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  order,
  overflow,
  space,
  textAlign,
  width,
);

export const BoxSection = Box.withComponent('section');
export const BoxAside = Box.withComponent('aside');
