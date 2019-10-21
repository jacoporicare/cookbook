import React from 'react';
import { css } from '@emotion/core';

import { theme } from '../../styles/colors';
import { Box } from '../core';
import { Heading } from '../elements';

type Props = {
  children: React.ReactNode;
  buttons?: React.ReactNode;
};

function PageHeading({ children, buttons }: Props) {
  return (
    <Heading color={theme.primary} fontSize={[5, 6]} fontWeight={300} mb={[3, 4]}>
      <Box alignItems="center" display="flex" flexWrap="wrap" justifyContent="space-between">
        <Box flex="auto">{children}</Box>
        <Box
          css={css`
            button,
            a {
              display: inline-block;
              margin-left: 8px;
            }
          `}
          display="flex"
          flex="auto"
          justifyContent="flex-end"
        >
          {buttons}
        </Box>
      </Box>
    </Heading>
  );
}

export default PageHeading;
