import axios from 'axios';
import {
  AppLogger,
  CacheManager,
} from '@treasure-map/commons';
import ServerConfig from '../config/ServerConfig.js';
import TreasureMapConfig from '../config/TreasureMapConfig.js';
import TreasureMapUtils from './TreasureMapUtils.js';

const {
  CACHE_DATA_TYPE,
} = TreasureMapConfig;

const {
  initTreasureMapGame,
  updateAdventurersMoves,
  generateGameOutput,
} = TreasureMapUtils;

const {
  getCurrentConfig,
} = ServerConfig;

const {
  cmsUrlPath,
} = getCurrentConfig() || {};

/**
 * Update Adventurers positions and tresors
 * @param {object} treasureMapGameData
 * @return {Promise<boolean>}
 */
const updateAdventurersInfos = async (treasureMapGameData) => {
  try {
    while (treasureMapGameData.gameTurn < treasureMapGameData.gameLength) {
      treasureMapGameData.adventurers = updateAdventurersMoves({
        adventurers: treasureMapGameData.adventurers,
        index: treasureMapGameData.gameTurn,
        map: treasureMapGameData.gameMap,
      });
      treasureMapGameData.gameTurn++;
    }
    return true;
  } catch (error) {
    AppLogger.error(`[TreasureMapManager - updateAdventurersDynamicInfos] An error was occurred ${error.message}`);
    return false;
  }
};

/**
 * Init Cache
 * @return {boolean}
 */
const initCache = async () => {
  try {
    CacheManager.clear();

    const cmsDataResponse = await axios({
      method: 'get',
      url: cmsUrlPath,
    });

    const cmsDataLines = cmsDataResponse?.data?.split('\n');
    AppLogger.info(`[TreasureMapManager - initCache] cmsDataLines: ${cmsDataLines}`);

    const cmsDataMapLine = cmsDataLines?.find((elem) => elem[0] === 'C').split('-');
    AppLogger.info(`[TreasureMapManager - initCache] cmsDataMapLine: ${cmsDataMapLine}`);

    const [
      ,
      width,
      height,
    ] = cmsDataMapLine;
    AppLogger.info(`[TreasureMapManager - initCache] width: ${width}`);
    AppLogger.info(`[TreasureMapManager - initCache] height: ${height}`);

    const treasureMapGameData = initTreasureMapGame({
      width: +width,
      height: +height,
      data: cmsDataLines,
    });

    AppLogger.info(`[TreasureMapManager - initCache] mountains: ${treasureMapGameData?.mountains?.length}`);
    AppLogger.info(`[TreasureMapManager - initCache] treasures: ${treasureMapGameData?.treasures?.length}`);
    AppLogger.info(`[TreasureMapManager - initCache] map: ${Object.keys(treasureMapGameData?.mapSize || {}).join(', ')}`);

    CacheManager.set(CACHE_DATA_TYPE.MOUNTAINS, treasureMapGameData?.mountains);
    CacheManager.set(CACHE_DATA_TYPE.TREASURES, treasureMapGameData?.treasures);
    CacheManager.set(CACHE_DATA_TYPE.MAP, treasureMapGameData?.mapSize);

    await updateAdventurersInfos(treasureMapGameData);
    AppLogger.info(`[TreasureMapManager - updateCache] adventurers: ${treasureMapGameData?.adventurers?.length}`);
    CacheManager.set(CACHE_DATA_TYPE.ADVENTURER, treasureMapGameData?.adventurers);

    const gameOutput = generateGameOutput(treasureMapGameData);
    CacheManager.set(CACHE_DATA_TYPE.OUTPUT, gameOutput);

    return true;
  } catch (error) {
    AppLogger.error(`[TreasureMapManager - initCache] An error was occurred ${error.message}`);
    return false;
  }
};

const TreasureMapManager = {
  initCache,
};

export default TreasureMapManager;
