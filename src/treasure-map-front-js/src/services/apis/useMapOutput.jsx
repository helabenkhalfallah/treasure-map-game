import GraphqlClientRequest from 'graphql-request';
import { useQuery, } from 'react-query';
import GET_MAP_OUTPUT from '../graphql/queries/GET_MAP_OUTPUT';
import TreasureMapConfig from '../../commons/config/TreasureMapConfig';

const { TREASURE_MAP_BFF_URL, } = TreasureMapConfig;

const getMapOutputQuery = async () => GraphqlClientRequest(TREASURE_MAP_BFF_URL, GET_MAP_OUTPUT);

const useMapOutput = () => useQuery(['getMapOutputQuery',], getMapOutputQuery);

export { useMapOutput, getMapOutputQuery, };
