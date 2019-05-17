import styled, { css } from 'react-emotion';
import { darken } from 'polished';

import { colors, theme, colorYiq } from '../../styles/colors';
import { Box, BoxProps } from '../core';

type ButtonProps = {
  isAppendAddon?: boolean;
  isPrependAddon?: boolean;
};

type Props = BoxProps & ButtonProps;

const prepend = css`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: none;
`;

const append = css`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: none;
  margin-left: -1px;
`;

const buttonStyle = (props: ButtonProps) => css`
  display: inline-block;
  border: 1px solid;
  border-radius: 1em;
  box-shadow: 0 8px 8px -8px rgba(0, 0, 0, 0.2);
  padding: 0.5em 0.75em;
  font-size: 1rem;
  line-height: 1em;
  white-space: nowrap;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  ${props.isPrependAddon && prepend};
  ${props.isAppendAddon && append};

  &:hover {
    text-decoration: none;
  }

  .fa,
  .fas,
  .far {
    display: inline-block;
    margin-right: 0.5em;
  }
`;

export const createButton = (color: string, borderColor?: string) =>
  styled(Box)<Props>`
    ${buttonStyle};
    color: ${colorYiq(color)};
    background-color: ${color};
    border-color: ${borderColor || color};

    &:hover {
      color: ${colorYiq(darken(0.075, color))};
      background-color: ${darken(0.075, color)};
      border-color: ${darken(0.1, borderColor || color)};
    }

    &:disabled,
    &.disabled {
      opacity: 0.65;
      color: ${colorYiq(color)};
      background-color: ${color};
      border-color: ${borderColor || color};
    }

    &:not(:disabled):not(.disabled) {
      cursor: pointer;
    }
  `.withComponent('button');

export const Button = createButton(colors.white, colors.gray400);
export const SuccessButton = createButton(theme.success);
export const InfoButton = createButton(theme.info);
export const WarningButton = createButton(theme.warning);
export const DangerButton = createButton(theme.danger);
export const LightButton = createButton(theme.light);
export const DarkButton = createButton(theme.dark);

export const LinkButton = styled(Box)<BoxProps>({
  display: 'inline-block',
  fontWeight: 400,
  color: colors.blue,
  textAlign: 'center',
  verticalAlign: 'middle',
  userSelect: 'none',
  backgroundColor: 'transparent',
  border: '1px solid transparent',
  padding: '.375rem .75rem',
  fontSize: '1rem',
  lineHeight: 1.5,
  borderRadius: '.25rem',
  transition: 'color .15s ease-in-out',
  '&:hover': {
    color: darken(0.15, colors.blue),
    textDecoration: 'underline',
  },
  '&:not(:disabled)': {
    cursor: 'pointer',
  },
  '&:disabled': {
    color: colors.gray600,
    pointerEvents: 'none',
    opacity: 0.65,
  },
}).withComponent('button');
