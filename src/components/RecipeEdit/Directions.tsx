import React from 'react';

import { AutosuggestChangeEventHandler } from '../../types';
import Icon from '../common/Icon';
import { Box } from '../core';
import { Textarea } from '../elements';

type Props = {
  directions?: string;
  onChange: AutosuggestChangeEventHandler;
};

function Directions({ directions = '', onChange }: Props) {
  return (
    <Box mb={3}>
      <Textarea
        id="directions"
        name="directions"
        rows={20}
        value={directions}
        onChange={onChange}
      />
      <Box textAlign="right">
        <Icon icon="question-circle" regular />{' '}
        <a
          href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
          rel="noopener noreferrer"
          target="_blank"
        >
          Návod na Markdown
        </a>
      </Box>
    </Box>
  );
}

export default Directions;
