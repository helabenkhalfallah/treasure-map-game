import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, } from '@testing-library/react';
import TreasureMapGridView from '../TreasureMapGridView';

describe('TreasureMapGridView', () => {
  it('renders a heading', () => {
    render(
      <TreasureMapGridView testpath="TreasureMapGridView" />
    );

    const heading = screen.getByRole('heading', {
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
});
