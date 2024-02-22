import TreasureMapConfig from '../config/TreasureMapConfig.js';

const {
  CARDINAL_ORIENTATIONS,
  MAP_CASE_TYPE,
} = TreasureMapConfig;

/**
 * Generate Game Output
 * @param {object} treasureMapGameData
 * @return {string}
 */
const generateGameOutput = (treasureMapGameData) => {
  const {
    adventurers,
    mapSize,
    mountains,
    treasures,
  } = treasureMapGameData;

  const mapOutput = `C - ${mapSize.width} - ${mapSize.height}\n`;

  const adventurersOuput = adventurers
    .reduce((acc, hero) => {
      acc += `A - ${hero.name} - ${hero.x} - ${hero.y} - ${
        hero.orientation
      } - ${hero.sequence.join('')}\n`;
      return acc;
    }, '');

  const mountainsOuput = mountains
    .reduce((acc, treasure) => {
      acc += `M - ${treasure.x} - ${treasure.y}\n`;
      return acc;
    }, '');

  const treasuresOuput = treasures
    .reduce((acc, treasure) => {
      acc +=
      treasure.count > 0 ?
        `T - ${treasure.x} - ${treasure.y} - ${treasure.count}\n` :
        '';
      return acc;
    }, '');

  return `${mapOutput}${mountainsOuput}${treasuresOuput}${adventurersOuput}`;
};

/**
 * Calculate next orientation
 * @param {string} orientation
 * @param {string} rotation
 * @return {string}
 */
const calculateNextOrientation = ({
  orientation,
  rotation,
}) => {
  if (rotation === 'D' || rotation === 'G') {
    switch (orientation) {
      case CARDINAL_ORIENTATIONS.NORTH:
        return rotation === 'D' ?
          CARDINAL_ORIENTATIONS.EAST :
          CARDINAL_ORIENTATIONS.WEST;
      case CARDINAL_ORIENTATIONS.SOUTH:
        return rotation === 'D' ?
          CARDINAL_ORIENTATIONS.WEST :
          CARDINAL_ORIENTATIONS.EAST;
      case CARDINAL_ORIENTATIONS.EAST:
        return rotation === 'D' ?
          CARDINAL_ORIENTATIONS.SOUTH :
          CARDINAL_ORIENTATIONS.NORTH;
      case CARDINAL_ORIENTATIONS.WEST:
        return rotation === 'D' ?
          CARDINAL_ORIENTATIONS.NORTH :
          CARDINAL_ORIENTATIONS.SOUTH;
    }
  }

  return orientation;
};

/**
 * Calculate next position
 * @param {object} adventurer
 * @param {object} map
 * @return {object}
 */
const calculateNextPosition = ({
  adventurer,
  map,
}) => {
  const {
    orientation,
    x,
    y,
  } = adventurer;

  const width = map[0].length;
  const height = map.length;

  switch (orientation) {
    case CARDINAL_ORIENTATIONS.NORTH:
      return ({
        x,
        y: y - 1 > 0 ? y - 1 : 0,
      });
    case CARDINAL_ORIENTATIONS.SOUTH:
      return ({
        x,
        y: y + 1 >= height ? y : y + 1,
      });
    case CARDINAL_ORIENTATIONS.EAST:
      return ({
        y,
        x: x + 1 >= width ? x : x + 1,
      });
    case CARDINAL_ORIENTATIONS.WEST:
      return ({
        y,
        x: x - 1 > 0 ? x - 1 : 0,
      });
  }
};

/**
 * Check if move is valid
 * @param {object} move
 * @return {boolean}
 */
const isMoveValid = (move) => !(move.type === MAP_CASE_TYPE.MOUNTAIN || move.hasAdventurer);

/**
 * Update adventurer move
 * @param {object} adventurer
 * @param {string} action
 * @param {object} map
 * @return {object}
 */
const updateAdventurerMove = ({
  adventurer,
  action,
  map,
}) => {
  if (action === 'A') {
    const {
      x,
      y,
    } = calculateNextPosition({
      adventurer,
      map,
    });

    return isMoveValid(map[y][x]) ?
      ({
        ...adventurer,
        x,
        y,
      }) :
      adventurer;
  } else {
    const {
      orientation,
    } = adventurer;

    const newOrientation = calculateNextOrientation({
      orientation,
      rotation: action,
    });

    return ({
      ...adventurer,
      orientation: newOrientation,
    });
  }
};

/**
 * Update adventurers moves
 * @param {Array} adventurers
 * @param {number} index
 * @param {object} map
 * @return {object}
 */
const updateAdventurersMoves = ({
  adventurers,
  index,
  map,
}) => adventurers.map((adventurer) => {
  const {
    x: previousX,
    y: previousY,
  } = adventurer;

  const adventurerAfterMove = updateAdventurerMove({
    adventurer,
    action: adventurer.sequence[index],
    map,
  });

  const {
    x: newX,
    y: newY,
  } = adventurerAfterMove;

  const newCell = map[adventurerAfterMove.y][adventurerAfterMove.x];

  if (
    newCell.treasure &&
      newCell.treasure.count &&
      (newX !== previousX || newY !== previousY)
  ) {
    adventurerAfterMove.treasureCount++;
    newCell.treasure.count--;
  }

  return adventurerAfterMove;
});

/**
 * Create Game Map
 * @param {string} value
 * @return {object}
 */
const createGameMap = ({width, height,}) => {
  const map = new Array(height)
    .fill(undefined)
    .map((elem) =>
      (elem = new Array(width)
        .fill(undefined)
        .map((cell) => ({
          type: MAP_CASE_TYPE.VALLEY,
          hasAdventurer: false,
          treasure: undefined,
        })))
    );
  return map;
};

/**
 * Parse Mountain data
 * @param {string} value
 * @return {object}
 */
const getMountain = (value) => {
  const [
    ,
    x,
    y,
  ] = value;

  return ({
    x: +x,
    y: +y,
  });
};

/**
 * Parse Treasure data
 * @param {string} value
 * @return {object}
 */
const getTreasure = (value) => {
  const [
    ,
    x,
    y,
    count,
  ] = value;

  return ({
    data: {
      x: +x,
      y: +y,
      count: +count,
    },
    x,
    y,
  });
};

/**
 * Parse Adventurer data
 * @param {string} value
 * @return {object}
 */
const getAdventurer = (value) => {
  const [
    ,
    name,
    x,
    y,
    orientation,
    sequenceString,
  ] = value;

  const sequence = sequenceString?.split('');

  return ({
    data: {
      name,
      x: +x,
      y: +y,
      orientation,
      sequence,
      treasureCount: 0,
    },
    x,
    y,
  });
};

/**
 * Calculate Map Size
 * @param {string} value
 * @return {object}
 */
const calculateMapSize = (value) => {
  const [
    ,
    width,
    height,
  ] = value;
  return ({
    width: +width,
    height: +height,
  });
};

/**
 * Parse Game Data Line
 * @param {string} line
 * @param {object} treasureMapGameData
 */
const parseTreasureMapGameDataLine = (line, treasureMapGameData) => {
  const value = line.split(' - ');
  switch (value[0]) {
    case 'C':
      treasureMapGameData.mapSize = calculateMapSize(value);
      break;
    case 'M':
      const mountain = getMountain(value);
      treasureMapGameData.mountains.push(mountain);
      treasureMapGameData.gameMap[mountain.y][mountain.x].type = MAP_CASE_TYPE.MOUNTAIN;
      break;
    case 'T':
      const treasure = getTreasure(value);
      treasureMapGameData.treasures.push(treasure.data);
      treasureMapGameData.gameMap[treasure.y][treasure.x].treasure = treasure.data;
      break;
    case 'A':
      const adventurer = getAdventurer(value);
      treasureMapGameData.adventurers.push(adventurer.data);
      treasureMapGameData.gameMap[+adventurer.y][+adventurer.x].hasAdventurer = true;
      if (adventurer?.data?.sequence?.length > treasureMapGameData.gameLength) {
        treasureMapGameData.gameLength = adventurer?.data?.sequence?.length;
      }
      break;
  }
};

/**
 * Init treasure game
 * @param {number} width
 * @param {number} height
 * @param {string} data
 * @return {object}
 */
const initTreasureMapGame = ({
  width,
  height,
  data,
}) => {
  const treasureMapGameData = {
    gameLength: 0,
    gameTurn: 0,
    mapSize: {
      width: undefined,
      height: undefined,
    },
    mountains: [],
    treasures: [],
    adventurers: [],
    gameMap: undefined,
  };

  treasureMapGameData.gameMap = createGameMap({
    width,
    height,
  });

  data.forEach((line) => {
    parseTreasureMapGameDataLine(line, treasureMapGameData);
  });

  return treasureMapGameData;
};

const TreasureMapUtils = {
  initTreasureMapGame,
  updateAdventurersMoves,
  generateGameOutput,
};

export default TreasureMapUtils;
