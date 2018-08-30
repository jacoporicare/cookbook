import styled from 'react-emotion';
import {
  alignItems,
  AlignItemsProps,
  borderRadius,
  BorderRadiusProps,
  borders,
  BordersProps,
  color,
  ColorProps,
  DisplayValue,
  flex,
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  flexWrap,
  FlexWrapProps,
  fontSize,
  FontSizeProps,
  GlobalStyleValues,
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
  ResponsiveValue,
  space,
  SpaceProps,
  style,
  textAlign,
  TextAlignProps,
  width,
  WidthProps,
} from 'styled-system';

type ExtendedDisplayValue = DisplayValue | 'inline-flex' | 'none';
type OverflowValue = GlobalStyleValues | 'visible' | 'hidden' | 'scroll' | 'auto';

export type Props = {
  display?: ResponsiveValue<ExtendedDisplayValue>;
  overflow?: ResponsiveValue<OverflowValue>;
} & AlignItemsProps &
  BordersProps &
  BorderRadiusProps &
  ColorProps &
  FlexDirectionProps &
  FlexProps &
  FlexWrapProps &
  FontSizeProps &
  HeightProps &
  JustifyContentProps &
  MaxHeightProps &
  MaxWidthProps &
  OrderProps &
  SpaceProps &
  TextAlignProps &
  WidthProps;

const display = style({ prop: 'display' });
const overflow = style({ prop: 'overflow' });

export const Box = styled.div<Props>(
  alignItems,
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
