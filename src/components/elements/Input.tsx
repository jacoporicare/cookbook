import styled, { css } from 'react-emotion';

import { colors } from '../../styles/colors';
import { Box, BoxProps } from '../core';
import { lighten, transparentize } from 'polished';

type InputProps = {
  hasPrependAddon?: boolean;
  hasAppendAddon?: boolean;
  hasError?: boolean;
};

type Props = BoxProps & InputProps;

const prepend = css`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: -1px;
  z-index: 1;
`;

const append = css`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

export const getInputStyle = (props: InputProps = {}) => css`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${colors.gray700};
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${props.hasError ? colors.red : colors.gray400};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  position: relative;
  z-index: 1;
  ${props.hasPrependAddon && prepend};
  ${props.hasAppendAddon && append};

  &:focus {
    color: ${colors.gray700};
    background-color: #fff;
    border-color: ${props.hasError ? colors.red : lighten(0.25, colors.blue)};
    outline: 0;
    box-shadow: 0 0 0 0.2rem
      ${props.hasError ? transparentize(0.75, colors.red) : transparentize(0.75, colors.blue)};
  }
`;

export const Input = styled(Box)<Props>(getInputStyle).withComponent('input');

export const Textarea = styled(Box)<Props>(getInputStyle).withComponent('textarea');
