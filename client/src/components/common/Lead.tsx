import { Text } from '../core';

export const Lead = Text.withComponent('p');

Lead.defaultProps = {
  fontSize: 4,
  fontWeight: 300,
};
