import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './page-not-found';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('PageNotFound component test', () => {
  it('should render component correctly', async () => {
    history.push('/test');

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path='/' element={<h1>Main page heading</h1>} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Back home/)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('test-backHome'));

    expect(screen.getByText(/Main page heading/i)).toBeInTheDocument();
  });
});
