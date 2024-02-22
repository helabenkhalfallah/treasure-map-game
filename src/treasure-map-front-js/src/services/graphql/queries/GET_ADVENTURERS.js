import { gql, } from 'graphql-request';

const GET_ADVENTURERS = gql`
    query getAdventurers {
      getAdventurers {
        name
        x
        y
        orientation
        sequence
        treasureCount        
      }
    }
`;

export default GET_ADVENTURERS;
