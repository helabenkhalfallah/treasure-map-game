import path from 'path';
import Express from 'express';
import ExpressStatusMonitor from 'express-status-monitor';
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
  ssl,
  serverTimeout,
  hostname,
  monitoringPath,
  healthCheckPath,
  staticPath,
} = getCurrentConfig() || {};

const app = Express();

const httpServer = createServer({
  app,
  config: getCurrentConfig(),
});

// *********************************************** Monitoring Endpoints ***********************************************

app.use(ExpressStatusMonitor({
  path: monitoringPath,
  healthChecks: [
    {
      protocol: ssl ? 'https' : 'http',
      host: hostname,
      port,
      path: healthCheckPath,
      headers: {},
    },
  ],
}));

// *********************************************** Health Check Endpoints ***********************************************

app.get(healthCheckPath, (req, res) => {
  res.status(200).send('TreasureMap Static Sever is UP !');
});

// *********************************************** Static Endpoints ***********************************************

const staticDirectory = path.join(__dirname, staticPath);

app.get('/treasure-map/cms/data-store/treasure-map', (req, res) => {
  AppLogger.info('Requestion map path');
  res.sendFile(path.join(staticDirectory, 'TreasureMap.txt'));
});

// *********************************************** Server Config & Launch ***********************************************

httpServer.timeout = serverTimeout; // milliseconds

httpServer.listen(port, () => {
  AppLogger.info(`🚀 TreasureMap Static server started at ${getCurrentConfig()?.serverUrl}`);
});

