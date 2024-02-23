import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, } from '@testing-library/react';
import TreasureMapLoader from '../TreasureMapLoader';

describe('TreasureMapLoader', () => {
  it('renders a heading', () => {
    render(
      <TreasureMapLoader testpath="TreasureMapLoader" />
    );

    const heading = screen.getByRole('heading', {
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
});
