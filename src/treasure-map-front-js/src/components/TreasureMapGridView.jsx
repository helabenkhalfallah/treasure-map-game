/* eslint-disable react/prop-types */
import React from 'react';
import {
  HStack,
  Box,
  Text,
} from '@chakra-ui/react';
import TreasureMapConfig from '../commons/config/TreasureMapConfig';

const {
  isAdventurer,
  isMountain,
  isTreasure,
} = TreasureMapConfig;

const TreasureMapGridView = ({
  mapRows,
  mapColomuns,
  mountains,
  treasures,
  adventurers,
}) => (
  <>
    {mapRows.map((row) => (
      <HStack
        key={`${row}`}
        spacing="0.5rem"
      >
        {mapColomuns.map((column) => {
          const mountainBgColor = isMountain(mountains, row, column)
            ? 'yellow.100'
            : null;
          const treasureBgColor = isTreasure(treasures, row, column)
            ? 'green.100'
            : null;
          const adventurerBgColor = isAdventurer(adventurers, row, column)
            ? 'blue.100'
            : null;
          const cellLabel = `${row}-${column}`;
          return (
            <Box
              key={`${row}-${column}`}
              w="5rem"
              h="5rem"
              mt="0.5rem"
              bg={adventurerBgColor || treasureBgColor || mountainBgColor || 'gray.100'}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                textAlign="center"
              >
                {cellLabel}
              </Text>
            </Box>
          );
        })}
      </HStack>
    ))}
  </>
);

// propsType (validation)
TreasureMapGridView.propTypes = {};

// default props
TreasureMapGridView.defaultProps = {};

export default TreasureMapGridView;
