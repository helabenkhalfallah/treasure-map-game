import TreasureMapGraphqlConfig from './TreasureMapGraphqlConfig';

const { TREASURE_MAP_BFF_URL, } = TreasureMapGraphqlConfig;

const TREASURE_MAP_QUERY_PAGE_SIZE = 10;

const isMountain = (mountains, x, y) => mountains?.findIndex((mountain) => mountain.x === x && mountain.y === y) !== -1;
const isTreasure = (treasures, x, y) => treasures?.findIndex((treasure) => treasure.x === x && treasure.y === y) !== -1;
const isAdventurer = (adventurers, x, y) => adventurers?.findIndex((adventurer) => adventurer.x === x && adventurer.y === y) !== -1;

const TreasureMapConfig = {
  TREASURE_MAP_BFF_URL,
  TREASURE_MAP_QUERY_PAGE_SIZE,
  isMountain,
  isTreasure,
  isAdventurer,
};

export default TreasureMapConfig;
