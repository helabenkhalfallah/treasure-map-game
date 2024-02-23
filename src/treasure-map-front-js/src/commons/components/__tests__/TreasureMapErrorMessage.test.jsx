import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, } from '@testing-library/react';
import TreasureMapErrorMessage from '../TreasureMapErrorMessage';

describe('TreasureMapErrorMessage', () => {
  it('renders a heading', () => {
    render(
      <TreasureMapErrorMessage testpath="TreasureMapErrorMessage" />
    );

    const heading = screen.getByRole('heading', {
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
});
