/* eslint-disable react/prop-types */

'use client';

import React from 'react';
import { ChakraProvider, } from '@chakra-ui/react';

const ThemeProvider = ({ children, }) => <ChakraProvider>{children}</ChakraProvider>;

export default ThemeProvider;
