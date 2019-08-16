import { isRedirect, ServerLocation } from '@reach/router';
import bodyParser from 'body-parser';
import { renderStylesToString } from 'emotion-server';
import express from 'express';
import 'isomorphic-fetch';
import path from 'path';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { renderToStringWithData } from '@apollo/react-ssr';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import Cookies from 'universal-cookie';
import cookiesMiddleware from 'universal-cookie-express';

import configureClient from './api/apolloClient';
import apolloServer from './api/apolloServer';
import App from './App';
import { authentication } from './api/auth';
import { AuthProvider } from './AuthContext';
import { AUTH_TOKEN_KEY } from './const';
import * as db from './db';
import routes from './serverRoutes';

db.connect();

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
const server = express();

server
  .disable('x-powered-by')
  .use(
    express.static(
      path.join(__dirname, process.env.NODE_ENV === 'production' ? 'public' : '../public'),
      { maxAge: 31536000000 },
    ),
  )
  .use(cookiesMiddleware())
  .use(authentication())
  .use(bodyParser.raw({ limit: '10MB', type: 'application/octet-stream' }))
  .use(bodyParser.json())
  .use(routes);

apolloServer.applyMiddleware({ app: server });

server.all('*', async (req, res) => {
  try {
    const universalCookies = (req as any).universalCookies as Cookies;
    const authToken = universalCookies.get(AUTH_TOKEN_KEY);
    const apolloClient = configureClient({ authToken });

    const root = (
      <ApolloProvider client={apolloClient}>
        <AuthProvider token={authToken}>
          <ServerLocation url={req.url}>
            <App />
          </ServerLocation>
        </AuthProvider>
      </ApolloProvider>
    );
    const markupWithoutStyles = await renderToStringWithData(root);
    const markup = renderStylesToString(markupWithoutStyles);
    const helmet = Helmet.renderStatic();
    const initialApolloState = apolloClient.extract();

    res.status(200).send(
      `<!doctype html>
    <html lang="cs"  ${helmet.htmlAttributes.toString()}>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Žrádelník" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#fff" />
        <meta name="application-name" content="Žrádelník" />
        <link rel="manifest" href="${process.env.PUBLIC_PATH}manifest.json" />
        <link
          href="https://fonts.googleapis.com/css?family=Amatic+SC|Open+Sans:300,400,400i,700"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-icon-180x180.png"
        />

        <link rel="icon" type="image/png" sizes="32x32" href="${
          process.env.PUBLIC_PATH
        }icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="${
          process.env.PUBLIC_PATH
        }icons/favicon-16x16.png" />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-startup-image-320x460.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-startup-image-640x920.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-startup-image-640x1096.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-startup-image-750x1294.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-startup-image-1182x2208.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-startup-image-1242x2148.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-startup-image-748x1024.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-startup-image-768x1004.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-startup-image-1496x2048.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)"
          href="${process.env.PUBLIC_PATH}icons/apple-touch-startup-image-1536x2008.png"
        />
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-141291591-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-141291591-1');
        </script>
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
        <script>
          window.__APOLLO_STATE__ = ${serialize(initialApolloState)};
        </script>
    </body>
</html>`,
    );
  } catch (error) {
    console.error(error);

    if (isRedirect(error)) {
      return res.redirect(error.uri);
    }

    process.env.NODE_ENV === 'production'
      ? res.status(500).send()
      : res.status(500).json({ message: error.message, stack: error.stack });
  }
});

export default server;
