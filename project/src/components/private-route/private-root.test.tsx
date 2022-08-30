import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../project.constants';
import HistoryRouter from '../history-router/history-router';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import PrivateRoot from './private-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('PrivateRoot test', () => {
  beforeEach(() => {
    history.push('/privateRoot');
  });

  it('should render component for private route, when user is authorized', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<div>Public route</div>} />
            <Route
              path={'/privateRoot'}
              element={
                <PrivateRoot authorizationStatus={AuthorizationStatus.Auth}>
                  <div>Private route</div>
                </PrivateRoot>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
  });

  it('should render component for public route, when user is not authorized', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<div>Public route</div>} />
            <Route
              path={'/privateRoot'}
              element={
                <PrivateRoot authorizationStatus={AuthorizationStatus.NoAuth}>
                  <div>Private route</div>
                </PrivateRoot>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });
});
