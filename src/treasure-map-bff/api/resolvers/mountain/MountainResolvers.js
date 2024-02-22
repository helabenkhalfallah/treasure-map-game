import MountainQueries from './MountainQueries.js';

/**
 * Un resolver graphql est formé par la composition des queries et mutations
 */
const MountainResolvers = {
  Query: {
    ...MountainQueries,
  },
};

export default MountainResolvers;
