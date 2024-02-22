import path from 'path';
import Express from 'express';
import {
  AppLogger,
  ServerUtils,
} from '@treasure-map/commons';
import ServerConfig from './config/ServerConfig.js';

const __dirname = path.resolve();

const {
  createServer,
} = ServerUtils;

const {
  getCurrentConfig,
} = ServerConfig;

const {
  port,
  serverTimeout,
  healthCheckPath,
  staticPath,
} = getCurrentConfig() || {};

const app = Express();

const httpServer = createServer({
  app,
  config: getCurrentConfig(),
});

// *********************************************** Health Check Endpoints ***********************************************

app.get(healthCheckPath, (req, res) => {
  res.status(200).send('TreasureMap Static Sever is UP !');
});

// *********************************************** Static Endpoints ***********************************************

const staticDirectory = path.join(__dirname, staticPath);

app.get('/treasure-map/cms/data-store/map.json', (req, res) => {
  AppLogger.info('Requestion map path');
  res.sendFile(path.join(staticDirectory, 'map.json'));
});

// *********************************************** Server Config & Launch ***********************************************

httpServer.timeout = serverTimeout; // milliseconds

httpServer.listen(port, () => {
  AppLogger.info(`🚀 TreasureMap Static server started at ${getCurrentConfig()?.serverUrl}`);
});

