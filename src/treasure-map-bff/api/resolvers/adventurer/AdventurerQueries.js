import {
  AppLogger,
  CacheManager,
} from '@treasure-map/commons';
import TreasureMapConfig from '../../config/TreasureMapConfig.js';

const {
  CACHE_DATA_TYPE,
} = TreasureMapConfig;

/**
 * Get Adventurers Data
 * @return {Array}
 */
const getAdventurers = async () => {
  try {
    const adventurers = CacheManager.get(CACHE_DATA_TYPE.ADVENTURER);

    AppLogger.info(`[getAdventurers] adventurers : ${adventurers.length}`);

    return adventurers;
  } catch (error) {
    AppLogger.info(`[getAdventurers] error : ${error.message}`);
    return ([]);
  }
};

const AdventurerQueries = {
  getAdventurers,
};

export default AdventurerQueries;
