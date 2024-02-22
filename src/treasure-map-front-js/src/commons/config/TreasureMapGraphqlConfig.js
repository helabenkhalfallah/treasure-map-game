const isPROD = false;
const TREASURE_MAP_BFF_PATH = '/treasure-map/graphql';
const TREASURE_MAP_PROD_BFF_URL = TREASURE_MAP_BFF_PATH;
const TREASURE_MAP_DEV_BFF_URL = `http://localhost:5001${TREASURE_MAP_BFF_PATH}`;

const TREASURE_MAP_BFF_URL = isPROD
  ? TREASURE_MAP_PROD_BFF_URL
  : TREASURE_MAP_DEV_BFF_URL;

const TreasureMapGraphqlConfig = {
  TREASURE_MAP_BFF_URL,
  TREASURE_MAP_DEV_BFF_URL,
};

export default TreasureMapGraphqlConfig;
