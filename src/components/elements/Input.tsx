import { makeStyles } from '@material-ui/core';
import { lighten, transparentize } from 'polished';

import { colors } from '../../styles/colors';

export const useInputStyles = makeStyles({
  input: {
    display: 'block',
    width: '100%',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    color: colors.gray700,
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: `1px solid ${colors.gray400}`,
    borderRadius: '0.25rem',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    position: 'relative',
    zIndex: 1,

    '&:focus': {
      color: colors.gray700,
      backgroundColor: '#fff',
      borderColor: lighten(0.25, colors.blue),
      outline: 0,
      boxShadow: `0 0 0 0.2rem ${transparentize(0.75, colors.blue)}`,
    },

    '&:disabled, &[readonly]': {
      backgroundColor: colors.gray200,
      opacity: 1,
    },
  },
});
