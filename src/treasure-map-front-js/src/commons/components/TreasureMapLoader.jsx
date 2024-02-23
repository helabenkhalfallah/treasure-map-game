import React from 'react';
import {
  Center,
  Spinner,
} from '@chakra-ui/react';

const TreasureMapLoader = () => (
  <Center
    height="20rem"
  >
    <Spinner size="xl" />
  </Center>
);

export default TreasureMapLoader;
