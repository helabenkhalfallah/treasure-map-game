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

function TreasureMapDashboardPage() {
  return <TreasureMapDashboardView />;
}

export async function getStaticProps() {
  const queryCache = new QueryCache();

  await queryCache.prefetchQuery(['getMapQuery',], getMapQuery);

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  };
}

export default TreasureMapDashboardPage;
