import React from 'react';
import {
  Spinner,
  Heading,
} from '@chakra-ui/react';
import { useGetMap, } from '../services/apis/useGetMap';
import { useGetMountains, } from '../services/apis/useGetMountains';
import { useGetTreasures, } from '../services/apis/useGetTreasures';
import { useGetAdventurers, } from '../services/apis/useGetAdventurers';
import { useMapOutput, } from '../services/apis/useMapOutput';

const TreasureMapDashboardView = () => {
  const {
    data: dataMap,
    isFetching: isFetchingMap,
  } = useGetMap();
  const {
    data: dataMountains,
    isFetching: isFetchingMountains,
  } = useGetMountains();
  const {
    data: dataTreasures,
    isFetching: isFetchingTreasures,
  } = useGetTreasures();
  const {
    data: dataAdventurers,
    isFetching: isFetchingAdventurers,
  } = useGetAdventurers();
  const {
    data: dataMapOutput,
    isFetching: isFetchingMapOutput,
  } = useMapOutput();

  if (isFetchingMap
    || isFetchingMountains
    || isFetchingTreasures
    || isFetchingAdventurers
  ) {
    return (
      <Spinner size="xl" />
    );
  }

  return <Heading as="h2">TreasureMapDashboardView</Heading>;
};

// propsType (validation)
TreasureMapDashboardView.propTypes = {};

// default props
TreasureMapDashboardView.defaultProps = {};

export default TreasureMapDashboardView;
