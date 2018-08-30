import React from 'react';
import { theme } from '../../styles/colors';
import { Box } from '../core';
import { Heading } from '../elements/Heading';

type Props = {
  children: React.ReactNode;
  buttons?: React.ReactNode;
};

export const PageHeading = ({ children, buttons }: Props) => (
  <Heading fontSize={[5, 6]} fontWeight={300} mb={[3, 4]} color={theme.primary}>
    <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
      <Box flex="auto">{children}</Box>
      <Box
        flex="auto"
        display="flex"
        justifyContent="flex-end"
        css={`
          button,
          a {
            display: inline-block;
            margin-left: 8px;
          }
        `}
      >
        {buttons}
      </Box>
    </Box>
  </Heading>
);
