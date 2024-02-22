import GraphqlClientRequest from 'graphql-request';
import { useQuery, } from 'react-query';
import GET_MAP from '../graphql/queries/GET_MAP';
import TreasureMapConfig from '../../commons/config/TreasureMapConfig';

const { TREASURE_MAP_BFF_URL, } = TreasureMapConfig;

const getMapQuery = async () => GraphqlClientRequest(TREASURE_MAP_BFF_URL, GET_MAP);

const useGetMap = () => useQuery(['getMapQuery',], getMapQuery);

export { useGetMap, getMapQuery, };
