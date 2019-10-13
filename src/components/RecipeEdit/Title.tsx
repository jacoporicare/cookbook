import React, { useRef, useEffect } from 'react';

import { AutosuggestChangeEventHandler } from '../../types';
import { colors } from '../../styles/colors';
import { Box, Text } from '../core';
import { Input } from '../elements';

type Props = {
  title?: string;
  onChange: AutosuggestChangeEventHandler;
};

function Title({ title = '', onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <Box mb={3}>
      <Input
        ref={ref}
        type="text"
        name="title"
        value={title}
        onChange={onChange}
        placeholder="Název"
        hasError={!title}
      />
      {!title && <Text color={colors.red}>Název je povinný</Text>}
    </Box>
  );
}

export default Title;
