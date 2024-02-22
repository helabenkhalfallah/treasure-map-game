import AdventurerQueries from './AdventurerQueries.js';

/**
 * Un resolver graphql est formé par la composition des queries et mutations
 */
const AdventurerResolvers = {
  Query: {
    ...AdventurerQueries,
  },
};

export default AdventurerResolvers;
