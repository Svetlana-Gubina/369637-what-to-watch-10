import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer component test', () => {
  it('should render correctly', () => {
    render(<Footer />);

    expect(screen.getByAltText(/What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
