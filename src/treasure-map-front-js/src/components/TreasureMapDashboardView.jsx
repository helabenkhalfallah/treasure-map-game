/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import {
  Container,
  Heading,
  Button,
} from '@chakra-ui/react';
import { useGetMap, } from '../services/apis/useGetMap';
import { useGetMountains, } from '../services/apis/useGetMountains';
import { useGetTreasures, } from '../services/apis/useGetTreasures';
import { useGetAdventurers, } from '../services/apis/useGetAdventurers';
import { useMapOutput, } from '../services/apis/useMapOutput';
import CommonsDico from '../commons/dico/CommonsDico';
import TreasureMapConfig from '../commons/config/TreasureMapConfig';
import TreasureMapLoader from '../commons/components/TreasureMapLoader';
import TreasureMapErrorMessage from '../commons/components/TreasureMapErrorMessage';
import TreasureMapGridView from './TreasureMapGridView';

const {
  fillArrayWithEmptyData,
  downloadMapOutputData,
} = TreasureMapConfig;

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
    || isFetchingMapOutput
  ) {
    return (
      <TreasureMapLoader />
    );
  }

  if (!dataMap?.getMap?.height
    || !dataMap?.getMap?.width) {
    return (
      <TreasureMapErrorMessage
        title={CommonsDico.TREASURE_MAP_DASHBOARD_ERROR_TITLE}
        message={CommonsDico.TREASURE_MAP_DASHBOARD_ERROR_MESSAGE}
      />
    );
  }

  return (
    <Container
      mt="2rem"
      centerContent
    >
      <Heading
        as="h2"
        mb="2rem"
      >
        {CommonsDico.TREASURE_MAP_DASHBOARD_TITLE}
      </Heading>
      <TreasureMapGridView
        mapRows={fillArrayWithEmptyData(dataMap?.getMap?.height)}
        mapColomuns={fillArrayWithEmptyData(dataMap?.getMap?.width)}
        mountains={dataMountains?.getMountains}
        treasures={dataTreasures?.getTreasures}
        adventurers={dataAdventurers?.getAdventurers}
      />
      <Button
        size="lg"
        mt="2rem"
        colorScheme="whatsapp"
        onClick={() => downloadMapOutputData(dataMapOutput?.downloadMapOutput)}
      >
        {CommonsDico.TREASURE_MAP_DOWNLOAD_LABEL}
      </Button>
    </Container>
  );
};

// propsType (validation)
TreasureMapDashboardView.propTypes = {};

// default props
TreasureMapDashboardView.defaultProps = {};

export default TreasureMapDashboardView;
