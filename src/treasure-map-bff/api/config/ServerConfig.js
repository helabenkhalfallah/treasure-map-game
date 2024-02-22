import {
  AppLogger,
} from '@treasure-map/commons';

const TREASURE_MAP_API_PATH = '/treasure-map/graphql';
const TREASURE_MAP_HEALTH_CHECK_PATH = `${TREASURE_MAP_API_PATH}/health-checks`;
const TREASURE_MAP_MONITORING_PATH = `${TREASURE_MAP_API_PATH}/monitoring`;

const SERVER_ENV_CONFIGURATION = {
  production: {
    ssl: false,
    port: 5001,
    hostname: 'localhost',
    apiPath: TREASURE_MAP_API_PATH,
    healthCheckPath: TREASURE_MAP_HEALTH_CHECK_PATH,
    monitoringPath: TREASURE_MAP_MONITORING_PATH,
    serverTimeout: 900000, // milliseconds
    cmsUrlPath: 'http://localhost:5000/treasure-map/cms/data-store/treasure-map',
  },
  development: {
    ssl: false,
    port: 5001,
    hostname: 'localhost',
    apiPath: TREASURE_MAP_API_PATH,
    healthCheckPath: TREASURE_MAP_HEALTH_CHECK_PATH,
    monitoringPath: TREASURE_MAP_MONITORING_PATH,
    serverTimeout: 900000, // milliseconds
    cmsUrlPath: 'http://localhost:5000/treasure-map/cms/data-store/treasure-map',
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
