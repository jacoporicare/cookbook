import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes';

mongoose.Promise = Promise;
mongoose.connect(config.mongo.uri, { useMongoClient: true });
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database at ${config.mongo.uri}`);
});

const app = express();

app.use(cors());

// Used for production build
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(routes);

app.all('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Server running on ${config.port}`));
