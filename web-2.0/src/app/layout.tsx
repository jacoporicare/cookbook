import { Box, Container, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';

import { colors } from '@/colors';
import theme from '@/theme';

export const metadata: Metadata = {
  title: 'Žrádelník',
  description: 'Žrádelník - recepty pro všechny, od Kubíka',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                body: {
                  backgroundColor: colors.gray100,
                },
              }}
            />
            <Container maxWidth={false}>
              <Box component="main" mt="62px" py={[3, 4]}>
                {children}
              </Box>
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
