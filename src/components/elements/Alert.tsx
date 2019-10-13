import styled from '@emotion/styled';
import { mix } from 'polished';

import { theme } from '../../styles/colors';
import { Box } from '../core';

const Alert = Box.withComponent('div');

Alert.defaultProps = {
  p: 3,
  border: '1px solid',
  borderRadius: '4px',
};

export const createAlert = (color: string) =>
  styled(Alert)({
    color: mix(0.48, 'black', color),
    backgroundColor: mix(0.8, 'white', color),
    borderColor: mix(0.72, 'white', color),
  });

export const SuccessAlert = createAlert(theme.success);
export const InfoAlert = createAlert(theme.info);
export const WarningAlert = createAlert(theme.warning);
export const DangerAlert = createAlert(theme.danger);
