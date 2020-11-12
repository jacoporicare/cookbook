import '@fortawesome/fontawesome-free/css/all.css';
import 'react-image-lightbox/style.css';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import * as Sentry from '@sentry/browser';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';

import theme from '../theme';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: 'https://3514990518354dc6a910d88a3988846b@o395458.ingest.sentry.io/5247255' });
}

function CookbookApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
        <meta content="Žrádelník - kuchařka pro všechny, od Kubíka" name="description" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
        <meta content="Žrádelník" name="apple-mobile-web-app-title" />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="#fff" name="theme-color" />
        <meta content="Žrádelník" name="application-name" />
        <link
          href="https://fonts.googleapis.com/css?family=Amatic+SC|Open+Sans:300,400,400i,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          rel="stylesheet"
        />
        <link href="/icons/apple-touch-icon-57x57.png" rel="apple-touch-icon" sizes="57x57" />
        <link href="/icons/apple-touch-icon-60x60.png" rel="apple-touch-icon" sizes="60x60" />
        <link href="/icons/apple-touch-icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
        <link href="/icons/apple-touch-icon-76x76.png" rel="apple-touch-icon" sizes="76x76" />
        <link href="/icons/apple-touch-icon-114x114.png" rel="apple-touch-icon" sizes="114x114" />
        <link href="/icons/apple-touch-icon-120x120.png" rel="apple-touch-icon" sizes="120x120" />
        <link href="/icons/apple-touch-icon-144x144.png" rel="apple-touch-icon" sizes="144x144" />
        <link href="/icons/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
        <link href="/icons/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />

        <link href="/icons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/icons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link
          href="/icons/apple-touch-startup-image-320x460.png"
          media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/icons/apple-touch-startup-image-640x920.png"
          media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/icons/apple-touch-startup-image-640x1096.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/icons/apple-touch-startup-image-750x1294.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/icons/apple-touch-startup-image-1182x2208.png"
          media="(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/icons/apple-touch-startup-image-1242x2148.png"
          media="(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/icons/apple-touch-startup-image-748x1024.png"
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/icons/apple-touch-startup-image-768x1004.png"
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/icons/apple-touch-startup-image-1496x2048.png"
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/icons/apple-touch-startup-image-1536x2008.png"
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <script src="https://www.googletagmanager.com/gtag/js?id=UA-141291591-1" async />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-141291591-1');
              `,
          }}
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default CookbookApp;
