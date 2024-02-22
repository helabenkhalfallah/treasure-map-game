import {
  CacheManager,
  AppLogger,
} from '@treasure-map/commons';
import TreasureMapConfig from '../../config/TreasureMapConfig.js';

const {
  CACHE_DATA_TYPE,
} = TreasureMapConfig;

/**
 * Get tTreasures Data
 * @return {Array}
 */
const getTreasures = async () => {
  try {
    const treasures = CacheManager.get(CACHE_DATA_TYPE.TREASURES);

    AppLogger.info(`[getTreasures] treasures : ${treasures.length}`);

    return treasures;
  } catch (error) {
    AppLogger.info(`[getTreasures] error : ${error.message}`);
    return ([]);
  }
};

const TreasureQueries = {
  getTreasures,
};

export default TreasureQueries;
