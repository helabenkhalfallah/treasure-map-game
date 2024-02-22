import {
  CacheManager,
  AppLogger,
} from '@treasure-map/commons';
import TreasureMapConfig from '../../config/TreasureMapConfig.js';

const {
  CACHE_DATA_TYPE,
} = TreasureMapConfig;

/**
 * Get Mountains Data
 * @return {Array}
 */
const getMountains = async () => {
  try {
    const mountains = CacheManager.get(CACHE_DATA_TYPE.MOUNTAINS);

    AppLogger.info(`[getMountains] mountains : ${mountains.length}`);

    return mountains;
  } catch (error) {
    AppLogger.info(`[getMountains] error : ${error.message}`);
    return ([]);
  }
};

const MountainQueries = {
  getMountains,
};

export default MountainQueries;
