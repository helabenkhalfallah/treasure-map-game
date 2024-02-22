import GraphqlClientRequest from 'graphql-request';
import { useQuery, } from 'react-query';
import GET_ADVENTURERS from '../graphql/queries/GET_ADVENTURERS';
import TreasureMapConfig from '../../commons/config/TreasureMapConfig';

const { TREASURE_MAP_BFF_URL, } = TreasureMapConfig;

const getAdventurersQuery = async () => GraphqlClientRequest(TREASURE_MAP_BFF_URL, GET_ADVENTURERS);

const useGetAdventurers = () => useQuery(['getAdventurersQuery',], getAdventurersQuery);

export { useGetAdventurers, getAdventurersQuery, };
