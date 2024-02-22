import React from 'react';
import { Heading, } from '@chakra-ui/react';
import { useGetMap, } from '../services/apis/useGetMap';

function TreasureMapDashboardView() {
  // eslint-disable-next-line no-unused-vars
  const { data, isFetching, } = useGetMap();

  if (isFetching) return <div>Loading</div>;

  return <Heading as="h2">TreasureMapDashboardView</Heading>;
}

// propsType (validation)
TreasureMapDashboardView.propTypes = {};

// default props
TreasureMapDashboardView.defaultProps = {};

export default TreasureMapDashboardView;
