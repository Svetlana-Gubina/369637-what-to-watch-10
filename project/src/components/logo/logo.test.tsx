import React from 'react';
import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Logo from './logo';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Logo component test', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    expect(screen.getByAltText(/W/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/test');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={<h1>Test heading</h1>} />
          <Route path='*' element={<Logo />} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/Test heading/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/Test heading/i)).toBeInTheDocument();
  });
});
