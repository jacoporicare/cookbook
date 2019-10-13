import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors } from '../../styles/colors';
import { Box, BoxProps } from '../core';

type Props = BoxProps & {
  isPrepend?: boolean;
  isAppend?: boolean;
};

export const InputAddon = styled(Box)<Props>(props => [
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    whiteSpace: 'nowrap',
    color: colors.gray700,
    backgroundColor: colors.gray200,
    border: `1px solid ${colors.gray400}`,
    borderRadius: '0.25rem',
  },

  props.isPrepend && {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: '-1px',
  },

  props.isAppend && {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: '-1px',
  },
]).withComponent('span');
