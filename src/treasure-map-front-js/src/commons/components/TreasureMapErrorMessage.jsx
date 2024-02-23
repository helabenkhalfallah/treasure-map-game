import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const TreasureMapErrorMessage = ({
  title,
  message,
}) => (
  <Alert status="error">
    <AlertIcon />
    <AlertTitle>
      {title}
    </AlertTitle>
    <AlertDescription>
      {message}
    </AlertDescription>
  </Alert>
);

// propsType (validation)
TreasureMapErrorMessage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

// default props
TreasureMapErrorMessage.defaultProps = {};

export default TreasureMapErrorMessage;
