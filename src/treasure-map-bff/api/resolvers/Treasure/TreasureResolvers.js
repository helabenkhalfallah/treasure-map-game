import TreasureQueries from './TreasureQueries.js';

/**
 * Un resolver graphql est formé par la composition des queries et mutations
 */
const TreasureResolvers = {
  Query: {
    ...TreasureQueries,
  },
};

export default TreasureResolvers;
