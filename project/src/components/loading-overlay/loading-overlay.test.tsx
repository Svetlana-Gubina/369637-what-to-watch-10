import React from 'react';
import { render } from '@testing-library/react';
import LoadingOverlay from './loading-overlay';

describe('LoadingOverlay component test', () => {
  test('should render component correctly', () => {
    const { container } = render(<LoadingOverlay />);

    expect(container).toMatchSnapshot();
  });
});
