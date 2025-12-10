'use client';

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import theme from '@/theme';
import { ApolloWrapper } from './ApolloWrapper';
import { AuthProvider } from './AuthProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.grey[50],
          },
        }}
      />
      <ApolloWrapper>
        <AuthProvider>{children}</AuthProvider>
      </ApolloWrapper>
    </ThemeProvider>
  );
}
