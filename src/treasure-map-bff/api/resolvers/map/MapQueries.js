/* eslint-disable max-lines */
import {
  CacheManager,
  AppLogger,
} from '@treasure-map/commons';
import TreasureMapConfig from '../../config/TreasureMapConfig.js';

const {
  CACHE_DATA_TYPE,
} = TreasureMapConfig;

/**
 * Get Map Data
 * @return {object}
 */
const getMap = async () => {
  try {
    const map = CacheManager.get(CACHE_DATA_TYPE.MAP);

    AppLogger.info(`[getMap] map : ${Object.keys(map || {}).join(',')}`);

    return map;
  } catch (error) {
    AppLogger.info(`[getMap] error : ${error.message}`);
    return ({});
  }
};

/**
 * Download Map Data
 * @return {string}
 */
const downloadMapOutput = async () => {
  try {
    const mapOutput = CacheManager.get(CACHE_DATA_TYPE.OUTPUT);

    AppLogger.info(`[downloadMapOutput] mapOutput : ${mapOutput}`);

    return mapOutput;
  } catch (error) {
    AppLogger.info(`[downloadMapOutput] error : ${error.message}`);
    return ('');
  }
};

const MapQueries = {
  getMap,
  downloadMapOutput,
};

export default MapQueries;
