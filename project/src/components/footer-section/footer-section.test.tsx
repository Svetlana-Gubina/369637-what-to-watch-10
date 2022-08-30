import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import FooterSection from './footer-section';

const history = createMemoryHistory();
describe('Footer component test', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FooterSection />
      </HistoryRouter>
    );

    expect(screen.getByText(/What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
