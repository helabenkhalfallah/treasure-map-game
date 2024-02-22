import {
  AppLogger,
} from '@treasure-map/commons';

const TREASURE_MAP_API_PATH = '/treasure-map/cms';
const TREASURE_MAP_HEALTH_CHECK_PATH = `${TREASURE_MAP_API_PATH}/health-checks`;
const TREASURE_MAP_MONITORING_PATH = `${TREASURE_MAP_API_PATH}/monitoring`;

const SERVER_ENV_CONFIGURATION = {
  production: {
    ssl: false,
    port: 5000,
    apiPath: TREASURE_MAP_API_PATH,
    hostname: 'localhost',
    monitoringPath: TREASURE_MAP_MONITORING_PATH,
    healthCheckPath: TREASURE_MAP_HEALTH_CHECK_PATH,
    serverTimeout: 900000, // milliseconds
    staticPath: '/api/data-store',
  },
  development: {
    ssl: false,
    port: 5000,
    apiPath: TREASURE_MAP_API_PATH,
    hostname: 'localhost',
    monitoringPath: TREASURE_MAP_MONITORING_PATH,
    healthCheckPath: TREASURE_MAP_HEALTH_CHECK_PATH,
    serverTimeout: 900000, // milliseconds
    staticPath: '/api/data-store',
  },
};

const getCurrentContext = () => (
  process?.argv?.includes('--dev') ?
    'development' :
    'production'
);

const getCurrentConfig = () => {
  const currentContext = getCurrentContext();

  AppLogger.info(`[getCurrentConfig] currentContext: ${currentContext}`);

  const currentConfig = SERVER_ENV_CONFIGURATION[currentContext];

  return ({
    ...(currentConfig || {}),
    serverUrl: `http${currentConfig.ssl ? 's' : ''}://${currentConfig.hostname}:${currentConfig.port}${currentConfig.apiPath}`,
  });
};

const ServerConfig = {
  getCurrentConfig,
  getCurrentContext,
};

export default ServerConfig;
