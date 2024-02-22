import { gql, } from 'graphql-request';

const GET_MAP = gql`
    query getMap {
      getMap {
        width
        height
      }
    }
`;

export default GET_MAP;
