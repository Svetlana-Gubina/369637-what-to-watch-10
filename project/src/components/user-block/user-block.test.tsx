import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import UserBlock from './user-block';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('UserBlock component tests', () => {
  it('should render component correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <UserBlock />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByAltText(/User avatar/i)).toBeInTheDocument();
  });
});
