import type { Metadata, Viewport } from 'next';
import { Amatic_SC } from 'next/font/google';
import { Toaster } from 'sonner';

import './globals.css';

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

const amatic = Amatic_SC({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-amatic',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={amatic.variable}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
