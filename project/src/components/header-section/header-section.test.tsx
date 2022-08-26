import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Header from './header-section';
import { AuthorizationStatus } from '../private-route/private-route.constants';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Header component tests', () => {
  it('should render component with children passed', () => {
    const authorizationStatus = AuthorizationStatus.NoAuth;
    const element = <div>Hello!</div>;
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Header authorizationStatus={authorizationStatus}>{element}</Header>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });

  it('shouldn`t render user menu for Sign in page', () => {
    const authorizationStatus = AuthorizationStatus.Auth;

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Header authorizationStatus={authorizationStatus} isSignInPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should render user menu inside, if user is authorized', () => {
    const authorizationStatus = AuthorizationStatus.Auth;

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Header authorizationStatus={authorizationStatus} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
