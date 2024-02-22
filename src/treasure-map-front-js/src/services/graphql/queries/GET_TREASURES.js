import { gql, } from 'graphql-request';

const GET_TREASURES = gql`
    query getTreasures {
      getTreasures {
        x
        y
        count       
      }
    }
`;

export default GET_TREASURES;
