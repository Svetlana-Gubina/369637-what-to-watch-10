import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingOverlay from './loading-overlay';

describe('LoadingOverlay component test', () => {
  test('should render component correctly', () => {
    render(<LoadingOverlay />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
