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
        hasError={!title}
        name="title"
        placeholder="Název"
        type="text"
        value={title}
        onChange={onChange}
      />
      {!title && <Text color={colors.red}>Název je povinný</Text>}
    </Box>
  );
}

export default Title;
