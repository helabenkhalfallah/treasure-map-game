import {
  ApolloServer,
} from '@apollo/server';
import {
  ApolloServerPluginDrainHttpServer,
} from '@apollo/server/plugin/drainHttpServer';
import {
  expressMiddleware,
} from '@apollo/server/express4';
import Express from 'express';
import Cors from 'cors';
import BodyParser from 'body-parser';
import ExpressStatusMonitor from 'express-status-monitor';
import TreasureMapTypes from './types/TreasureMapTypes.js';
import TreasureMapResolvers from './resolvers/TreasureMapResolvers.js';
import TreasureMapManager from './managers/TreasureMapManager.js';
import {
  AppLogger,
  ServerUtils,
} from '@treasure-map/commons';
import ServerConfig from './config/ServerConfig.js';

const {
  createServer,
} = ServerUtils;

const {
  getCurrentConfig,
} = ServerConfig;

const {
  ssl,
  monitoringPath,
  hostname,
  port,
  apiPath,
  healthCheckPath,
} = getCurrentConfig() || {};

const app = Express();

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


// *********************************************** Graphql Config & Endpoints ***********************************************

const httpServer = createServer({
  app,
  config: getCurrentConfig(),
});

const server = new ApolloServer({
  typeDefs: TreasureMapTypes,
  resolvers: TreasureMapResolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({
      httpServer,
    }),
  ],
});

await server.start();

app.use(
  apiPath,
  Cors(),
  BodyParser.json(),
  expressMiddleware(server, {
    context: async ({
      req,
    }) => ({
      token: req.headers.token,
    }),
  })
);

// *********************************************** Health Check Endpoints ***********************************************

app.get(healthCheckPath, (req, res) => {
  res.status(200).send('TreasureMap Sever is UP !');
});

// *********************************************** Server Config & Launch ***********************************************

await new Promise((resolve) => httpServer.listen({
  port,
}, resolve));

httpServer.timeout = getCurrentConfig()?.serverTimeout; // milliseconds

AppLogger.info(`🚀 Server started at ${getCurrentConfig()?.serverUrl}`);

// *********************************************** Fill Cache ***********************************************

TreasureMapManager
  .initCache()
  .then(() => AppLogger.info('Initialising cache was done successfully !'))
  .catch((error) => AppLogger.info(`An error was occurred while initialising the cache ${error.message} !`));
