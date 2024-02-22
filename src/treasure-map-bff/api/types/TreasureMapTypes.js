import gql from 'graphql-tag';
import MapQueriesType from './map/MapQueriesType.js';
import MapType from './map/MapType.js';
import MountainQueriesType from './mountain/MountainQueriesType.js';
import MountainType from './mountain/MountainType.js';
import TreasureQueriesType from './treasure/TreasureQueriesType.js';
import TreasureType from './treasure/TreasureType.js';
import AdventurerQueriesType from './adventurer/AdventurerQueriesType.js';
import AdventurerType from './adventurer/AdventurerType.js';

const TreasureMapTypes = gql`
  # common schemas
  
  # outputted schemas
  ${MapType}
  ${MountainType}
  ${TreasureType}
  ${AdventurerType}
  
  # the schemas allows the following queries
  ${MapQueriesType}
  ${MountainQueriesType}
  ${TreasureQueriesType}
  ${AdventurerQueriesType}
 
  # this schemas allows the following mutations
`;

export default TreasureMapTypes;
