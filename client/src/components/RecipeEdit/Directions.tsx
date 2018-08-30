import React from 'react';

import { AutosuggestChangeEventHandler } from '../../types';
import { Box } from '../core';
import { Textarea } from '../elements/Input';
import { Icon } from '../common/Icon';

type Props = {
  directions?: string;
  onChange: AutosuggestChangeEventHandler;
};

export const Directions = ({ directions = '', onChange }: Props) => {
  return (
    <Box mb={3}>
      <Textarea
        id="directions"
        name="directions"
        value={directions}
        onChange={onChange}
        rows={20}
      />
      <Box textAlign="right">
        <Icon icon="question-circle" regular />{' '}
        <a
          href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Návod na Markdown
        </a>
      </Box>
    </Box>
  );
};
