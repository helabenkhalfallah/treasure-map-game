import { gql, } from 'graphql-request';

const GET_MOUNTAINS = gql`
    query getMountains {
      getMountains {
        x
        y      
      }
    }
`;

export default GET_MOUNTAINS;
