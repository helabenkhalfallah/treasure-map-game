import 'core-js/es/promise';
import 'core-js/es/array';
import 'core-js/es/object';
import 'core-js/es/number';
import 'core-js/es/symbol/iterator';
import 'regenerator-runtime/runtime';
import React from 'react';
import { QueryCache, } from 'react-query';
import { dehydrate, } from 'react-query/hydration';
import TreasureMapDashboardView from '../../components/TreasureMapDashboardView';
import { getMapQuery, } from '../../services/apis/useGetMap';
import { getMountainsQuery, } from '../../services/apis/useGetMountains';
import { getTreasuresQuery, } from '../../services/apis/useGetTreasures';
import { getAdventurersQuery, } from '../../services/apis/useGetAdventurers';

const TreasureMapDashboardPage = () => <TreasureMapDashboardView />;

export const getStaticProps = async () => {
  const queryCache = new QueryCache();

  await queryCache.prefetchQuery(['getMapQuery',], getMapQuery);
  await queryCache.prefetchQuery(['getMountainsQuery',], getMountainsQuery);
  await queryCache.prefetchQuery(['getTreasuresQuery',], getTreasuresQuery);
  await queryCache.prefetchQuery(['getAdventurersQuery',], getAdventurersQuery);

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  };
};

export default TreasureMapDashboardPage;
