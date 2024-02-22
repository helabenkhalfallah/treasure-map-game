/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import {
  Center,
  Container,
  Spinner,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { saveAs, } from 'file-saver';
import { useGetMap, } from '../services/apis/useGetMap';
import { useGetMountains, } from '../services/apis/useGetMountains';
import { useGetTreasures, } from '../services/apis/useGetTreasures';
import { useGetAdventurers, } from '../services/apis/useGetAdventurers';
import { useMapOutput, } from '../services/apis/useMapOutput';
import CommonsDico from '../commons/dico/CommonsDico';
import TreasureMapGridView from './TreasureMapGridView';

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
      <Center
        height="20rem"
      >
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!dataMap?.getMap?.height
    || !dataMap?.getMap?.width) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>
          {CommonsDico.TREASURE_MAP_DASHBOARD_ERROR_TITLE}
        </AlertTitle>
        <AlertDescription>
          {CommonsDico.TREASURE_MAP_DASHBOARD_ERROR_MESSAGE}
        </AlertDescription>
      </Alert>
    );
  }

  const mapRows = new Array(dataMap?.getMap?.height + 1).fill('XX').map((_, index) => index) || [];
  const mapColomuns = new Array(dataMap?.getMap?.width + 1).fill('XX').map((_, index) => index) || [];
  const mountains = dataMountains?.getMountains;
  const adventurers = dataAdventurers?.getAdventurers;
  const treasures = dataTreasures?.getTreasures;

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
        mapRows={mapRows}
        mapColomuns={mapColomuns}
        mountains={mountains}
        treasures={treasures}
        adventurers={adventurers}
      />
      <Button
        size="lg"
        mt="2rem"
        colorScheme="whatsapp"
        onClick={() => {
          const file = new Blob([
            dataMapOutput?.downloadMapOutput,
          ], {
            type: 'text/plain;charset=utf-8',
          });
          saveAs(file, 'map_output.txt');
        }}
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
