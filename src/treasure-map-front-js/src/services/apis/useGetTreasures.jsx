import GraphqlClientRequest from 'graphql-request';
import { useQuery, } from 'react-query';
import GET_TREASURES from '../graphql/queries/GET_TREASURES';
import TreasureMapConfig from '../../commons/config/TreasureMapConfig';

const { TREASURE_MAP_BFF_URL, } = TreasureMapConfig;

const getTreasuresQuery = async () => GraphqlClientRequest(TREASURE_MAP_BFF_URL, GET_TREASURES);

const useGetTreasures = () => useQuery(['getTreasuresQuery',], getTreasuresQuery);

export { useGetTreasures, getTreasuresQuery, };
