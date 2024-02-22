import MapResolvers from './map/MapResolvers.js';
import TreasureResolvers from './Treasure/TreasureResolvers.js';
import MountainResolvers from './mountain/MountainResolvers.js';
import AdventurerResolvers from './adventurer/AdventurerResolvers.js';

const TreasureMapGameResolvers = {
  Query: {
    ...MapResolvers.Query,
    ...TreasureResolvers.Query,
    ...MountainResolvers.Query,
    ...AdventurerResolvers.Query,
  },
};

export default TreasureMapGameResolvers;
