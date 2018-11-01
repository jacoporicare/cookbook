import { Text } from '../core';

const Lead = Text.withComponent('p');

Lead.defaultProps = {
  fontSize: 4,
  fontWeight: 300,
};

export default Lead;
