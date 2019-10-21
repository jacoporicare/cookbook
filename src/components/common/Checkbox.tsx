import React from 'react';

import { Box } from '../core';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = Box.withComponent('input');
const Label = Box.withComponent('label');

function Checkbox({ children, ...props }: Props) {
  return (
    <Box css={{ position: 'relative' }} pl="1.25rem">
      <Input css={{ position: 'absolute' }} ml="-1.25rem" mt="0.3rem" type="checkbox" {...props} />
      <Label htmlFor={props.id} mb={0}>
        {children}
      </Label>
    </Box>
  );
}

export default Checkbox;
