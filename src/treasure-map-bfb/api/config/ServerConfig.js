import {
  AppLogger,
} from '@treasure-map/commons';

const TREASURE_MAP_API_PATH = '/treasure-map/bfb-main';
const TREASURE_MAP_HEALTH_CHECK_PATH = `${TREASURE_MAP_API_PATH}/health-checks`;
const TREASURE_MAP_MONITORING_PATH = `${TREASURE_MAP_API_PATH}/monitoring`;

const SERVER_ENV_CONFIGURATION = {
  production: {
    ssl: false,
    port: 5003,
    hostname: 'localhost',
    apiPath: TREASURE_MAP_API_PATH,
    healthCheckPath: TREASURE_MAP_HEALTH_CHECK_PATH,
    monitoringPath: TREASURE_MAP_MONITORING_PATH,
    databaseUri: '',
    serverTimeout: 900000, // milliseconds
  },
  development: {
    ssl: false,
    port: 5003,
    hostname: 'localhost',
    apiPath: TREASURE_MAP_API_PATH,
    healthCheckPath: TREASURE_MAP_HEALTH_CHECK_PATH,
    monitoringPath: TREASURE_MAP_MONITORING_PATH,
    databaseUri: '',
    serverTimeout: 900000, // milliseconds
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
