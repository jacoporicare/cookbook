import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as bodyParser from 'body-parser';

import * as db from './db';
import config from './config';
import routes from './routes';

const isProduction = process.env.NODE_ENV === 'production';

db.connect();

const app = express();

app.use(cors());

if (isProduction) {
  app.get('/service-worker.js', (req, res) => {
    res.set('Cache-Control', 'no-cache');
    res.sendFile(path.join(__dirname, 'public/service-worker.js'));
  });

  app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31536000000 }));
}

app.use(bodyParser.raw({ limit: '10MB', type: 'application/octet-stream' }));
app.use(bodyParser.json());

app.use(routes);

if (isProduction) {
  app.all('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
}

app.listen(config.port, () => console.log(`Server running on ${config.port}`));
