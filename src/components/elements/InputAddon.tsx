import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors } from '../../styles/colors';
import { Box, BoxProps } from '../core';

type Props = BoxProps & {
  isPrepend?: boolean;
  isAppend?: boolean;
};

const prepend = css`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: -1px;
`;

const append = css`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: -1px;
`;

export const InputAddon = styled(Box)<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  white-space: nowrap;
  color: ${colors.gray700};
  background-color: ${colors.gray200};
  border: 1px solid ${colors.gray400};
  border-radius: 0.25rem;
  ${props => props.isPrepend && prepend};
  ${props => props.isAppend && append};
`.withComponent('span');
