import MapQueries from './MapQueries.js';

/**
 * Un resolver graphql est formé par la composition des queries et mutations
 */
const MapResolvers = {
  Query: {
    ...MapQueries,
  },
};

export default MapResolvers;
