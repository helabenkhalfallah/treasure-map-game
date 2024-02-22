import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, } from '@testing-library/react';
import TreasureMapDashboardView from '../TreasureMapDashboardView';

describe('TreasureMapDashboardView', () => {
  it('renders a heading', () => {
    render(
      <TreasureMapDashboardView testpath="TreasureMapDashboardView" />
    );

    const heading = screen.getByRole('heading', {
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
});
