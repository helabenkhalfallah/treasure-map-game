/* eslint-disable no-unused-vars */
import {
  CronJob,
} from 'cron';
import {
  AppLogger,
  WorkerHelper,
} from '@treasure-map/commons';
import ServerConfig from '../config/ServerConfig.js';

const {
  forkWorker,
} = WorkerHelper;

const {
  getCurrentConfig,
} = ServerConfig;

const startUpdateWorkers = () => {
  (async () => {
    const currentConfig = getCurrentConfig();
    await forkWorker('./api/workers/TreasureMapWorker.js', currentConfig);
  })();
};

/**
 * La mise à jour des bases se fait par défaut au lancement ensuite chaque minuit
 */
const start = () => {
  setInterval(() => {
    AppLogger.info('******************** Vérification que le main thread est toujours non bloqué **************************');
  }, 1000);

  // first update
  AppLogger.info('******************** Lancement de la première mise à jour **************************');
  setTimeout(() => {
    startUpdateWorkers();
  }, 2000);

  // periodic update (every midnight)
  const job = new CronJob('00 00 00 * * *', () => {
    AppLogger.info('******************** Lancement de la mise à jour programmée **************************');
    startUpdateWorkers();
  });
  job.start();
};

const DataUpdateScheduler = {
  start,
};

export default DataUpdateScheduler;
