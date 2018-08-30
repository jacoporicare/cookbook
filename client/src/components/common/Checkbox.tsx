import React from 'react';

import { Box } from '../core';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = Box.withComponent('input');
const Label = Box.withComponent('label');

export const Checkbox = ({ children, ...props }: Props) => (
  <Box pl="1.25rem" css={{ position: 'relative' }}>
    <Input type="checkbox" mt="0.3rem" ml="-1.25rem" css={{ position: 'absolute' }} {...props} />
    <Label htmlFor={props.id} mb={0}>
      {children}
    </Label>
  </Box>
);
