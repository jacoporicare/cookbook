import styled, { Interpolation } from '@emotion/styled';
import { css } from '@emotion/core';
import { lighten, transparentize } from 'polished';

import { colors } from '../../styles/colors';
import { Box, BoxProps } from '../core';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getInputStyle = (css: (...args: Array<Interpolation>) => any) => (
  props: InputProps = {},
) =>
  css(
    {
      display: 'block',
      width: '100%',
      padding: '0.375rem 0.75rem',
      fontSize: '1rem',
      lineHeight: '1.5',
      color: colors.gray700,
      backgroundColor: '#fff',
      backgroundClip: 'padding-box',
      border: `1px solid ${props.hasError ? colors.red : colors.gray400}`,
      borderRadius: '0.25rem',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
      position: 'relative',
      zIndex: 1,

      '&:focus': {
        color: colors.gray700,
        backgroundColor: '#fff',
        borderColor: props.hasError ? colors.red : lighten(0.25, colors.blue),
        outline: 0,
        boxShadow: `0 0 0 0.2rem ${
          props.hasError ? transparentize(0.75, colors.red) : transparentize(0.75, colors.blue)
        }`,
      },

      '&:disabled, &[readonly]': {
        backgroundColor: colors.gray200,
        opacity: 1,
      },
    },

    props.hasPrependAddon && prepend,
    props.hasAppendAddon && append,
  );

export const Input = styled(Box)<Props>(getInputStyle(css)).withComponent('input');

export const Textarea = styled(Box)<Props>(getInputStyle(css)).withComponent('textarea');
