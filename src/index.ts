/* eslint-disable no-console */
import http from 'http';

import { seed } from './api/seed';

if (process.argv[2] === '--seed') {
  seed();
} else {
  let app = require('./server').default;

  const server = http.createServer(app);

  let currentApp = app;

  server.listen(process.env.PORT || 3000).on('error', error => {
    if (error) {
      console.log(error);
    }

    console.log('🚀 started');
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((module as any).hot) {
    console.log('✅  Server-side HMR Enabled!');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (module as any).hot.accept('./server', () => {
      console.log('🔁  HMR Reloading `./server`...');

      try {
        app = require('./server').default;
        server.removeListener('request', currentApp);
        server.on('request', app);
        currentApp = app;
      } catch (error) {
        console.error(error);
      }
    });
  }
}
