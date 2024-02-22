/* eslint-disable react/prop-types */
import React from 'react';
import ThemeProvider from './commons/theme/ThemeProvider';

export const metadata = {
  title: 'TreasureMap (Game)',
  description: 'Guide adventurers in search of treasures!',
};

function RootLayout({ children, }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
