/* eslint-disable react/prop-types */
import 'core-js/es/promise';
import 'core-js/es/array';
import 'core-js/es/object';
import 'core-js/es/number';
import 'core-js/es/symbol/iterator';
import 'regenerator-runtime/runtime';
import React from 'react';
import { QueryCache, ReactQueryCacheProvider, } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools, } from 'react-query-devtools';
import { Hydrate, } from 'react-query/hydration';
import ThemeProvider from '../commons/theme/ThemeProvider';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const TreasureMapApp = ({ Component, pageProps, }) => (
  <ReactQueryCacheProvider queryCache={queryCache}>
    <Hydrate state={pageProps.dehydratedState}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Hydrate>
  </ReactQueryCacheProvider>
);

export default TreasureMapApp;
