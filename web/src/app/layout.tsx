import type { Metadata, Viewport } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'Žrádelník',
    template: '%s | Žrádelník',
  },
  description: 'Žrádelník - kuchařka pro všechny, od Kubíka',
  applicationName: 'Žrádelník',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Žrádelník',
  },
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/icons/apple-touch-icon-60x60.png', sizes: '60x60' },
      { url: '/icons/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/icons/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/icons/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/icons/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/icons/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/icons/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/icons/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  themeColor: '#fff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Amatic+SC|Open+Sans:300,400,400i,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppRouterCacheProvider options={{ key: 'mui' }}>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
