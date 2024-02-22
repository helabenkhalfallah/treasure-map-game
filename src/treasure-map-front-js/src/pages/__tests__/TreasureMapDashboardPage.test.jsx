import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, } from '@testing-library/react';
import TreasureMapDashboardPage from '../dashboard';

describe('TreasureMapDashboardPage', () => {
  it('renders a heading', () => {
    render(
      <TreasureMapDashboardPage testpath="../dashboard/TreasureMapDashboardPage" />
    );

    const heading = screen.getByRole('heading', {
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
});
