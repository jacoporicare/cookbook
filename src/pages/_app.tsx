import '@fortawesome/fontawesome-free/css/all.css';
import * as Sentry from '@sentry/browser';
import { AppProps } from 'next/app';

import Reboot from '../styles/Reboot';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: 'https://3514990518354dc6a910d88a3988846b@o395458.ingest.sentry.io/5247255' });
}

function CookbookApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reboot />
      <Component {...pageProps} />
    </>
  );
}

export default CookbookApp;
