import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import UserMenu from './user-menu';
import { AuthorizationStatus } from '../private-route/private-route.constants';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('UserMenu component tests', () => {
  it('should render component Sign in link, if user is not authorized', () => {
    const authorizationStatus = AuthorizationStatus.NoAuth;

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <UserMenu authorizationStatus={authorizationStatus} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should render component Sign out link and user avatar, if user is authorized', () => {
    const authorizationStatus = AuthorizationStatus.Auth;

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <UserMenu authorizationStatus={authorizationStatus} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByAltText(/User avatar/i)).toBeInTheDocument();
  });
});
