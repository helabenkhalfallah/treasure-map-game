import { gql, } from 'graphql-request';

const GET_MAP_OUTPUT = gql`
    query downloadMapOutput {
      downloadMapOutput
    }
`;

export default GET_MAP_OUTPUT;
