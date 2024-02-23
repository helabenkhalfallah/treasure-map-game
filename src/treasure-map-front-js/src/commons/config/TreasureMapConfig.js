// eslint-disable-next-line import/no-extraneous-dependencies
import { saveAs, } from 'file-saver';
import TreasureMapGraphqlConfig from './TreasureMapGraphqlConfig';

const { TREASURE_MAP_BFF_URL, } = TreasureMapGraphqlConfig;

const TREASURE_MAP_QUERY_PAGE_SIZE = 10;

const isMountain = (mountains, x, y) => mountains?.some((mountain) => mountain.x === x && mountain.y === y);

const isTreasure = (treasures, x, y) => treasures?.some((treasure) => treasure.x === x && treasure.y === y);

const isAdventurer = (adventurers, x, y) => adventurers?.some((adventurer) => adventurer.x === x && adventurer.y === y);

const fillArrayWithEmptyData = (length) => new Array(length + 1)
  .fill('XX')
  .map((_, index) => index) || [];

const downloadMapOutputData = (data) => {
  const file = new Blob([
    data,
  ], {
    type: 'text/plain;charset=utf-8',
  });
  saveAs(file, 'map_output.txt');
};

const TreasureMapConfig = {
  TREASURE_MAP_BFF_URL,
  TREASURE_MAP_QUERY_PAGE_SIZE,
  isMountain,
  isTreasure,
  isAdventurer,
  fillArrayWithEmptyData,
  downloadMapOutputData,
};

export default TreasureMapConfig;
