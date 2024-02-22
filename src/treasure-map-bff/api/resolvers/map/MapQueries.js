/* eslint-disable max-lines */
import {
  AppLogger,
} from '@treasure-map/commons';

const getMapQuery = async () => {
  try {
    const treasureMap = {};

    AppLogger.info(`[getMapQuery] treasureMap : ${Object.keys(treasureMap || {}).join(',')}`);

    return treasureMap;
  } catch (error) {
    AppLogger.info(`[getMapQuery] error : ${error.message}`);
    return ({});
  }
};

const MapQueries = {
  getMapQuery,
};

export default MapQueries;
