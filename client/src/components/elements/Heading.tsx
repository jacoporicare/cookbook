import { Text } from '../core';

export const Heading = Text.withComponent('h1');

Heading.defaultProps = {
  fontSize: 5,
  fontWeight: 500,
  lineHeight: 1.2,
  m: 0,
};
