import gql from 'graphql-tag';
import MapQueriesType from './map/MapQueriesType.js';
import MapType from './map/MapType.js';

const TreasureMapTypes = gql`
  # common schemas
  
  # outputted schemas
  ${MapType}
  
  # the schemas allows the following queries
  ${MapQueriesType}
 
  # this schemas allows the following mutations
`;

export default TreasureMapTypes;
