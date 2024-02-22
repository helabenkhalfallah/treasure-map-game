import GraphqlClientRequest from 'graphql-request';
import { useQuery, } from 'react-query';
import GET_MOUNTAINS from '../graphql/queries/GET_MOUNTAINS';
import TreasureMapConfig from '../../commons/config/TreasureMapConfig';

const { TREASURE_MAP_BFF_URL, } = TreasureMapConfig;

const getMountainsQuery = async () => GraphqlClientRequest(TREASURE_MAP_BFF_URL, GET_MOUNTAINS);

const useGetMountains = () => useQuery(['getMountainsQuery',], getMountainsQuery);

export { useGetMountains, getMountainsQuery, };
