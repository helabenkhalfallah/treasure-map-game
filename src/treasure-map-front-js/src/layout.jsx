/* eslint-disable react/prop-types */
import React from 'react';

export const metadata = {
  title: 'TreasureMap (Game)',
  description: 'Guide adventurers in search of treasures!',
};

function RootLayout({ children, }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
