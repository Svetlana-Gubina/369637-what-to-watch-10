import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../project.constants';
import { AuthorizationStatus } from '../private-route/private-route.constants';
import App from './app';
import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import MyList from '../../pages/my-list/my-list';
import PrivateRoot from '../private-route/private-route';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import { Router, Route, Routes } from 'react-router-dom';
import type { FilmItemType } from '../../types';
import { createApi } from '../../api';
import type { RootState } from '../../types/store';
import { Action } from '@reduxjs/toolkit';
import useApiService from '../../hooks/apiHooks/useApiService';
import thunk, { ThunkDispatch } from 'redux-thunk';

const mockPromo = {
  id: '1',
  name: 'test promo',
  posterImage: 'test',
  genre: 'test',
  release: 2020,
} as unknown as FilmItemType;

const mockFilmdata = [
  {
    id: '111',
    name: 'test film 1',
    isFavorite: true,
  },
  {
    id: '222',
    name: 'test film 2',
    isFavorite: true,
  },
] as unknown as FilmItemType[];

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  RootState,
  Action,
  ThunkDispatch<RootState, typeof api, Action>
>(middlewares);
jest.mock('../history-router/history-router');

const mockHistoryRouter = HistoryRouter as jest.MockedFunction<
  typeof HistoryRouter
>;

jest.mock('../../hooks/apiHooks/useApiService');

const mockuseApiService = useApiService as jest.MockedFunction<
  typeof useApiService
>;

const store = mockStore({
  user: { authorizationStatus: AuthorizationStatus.Auth },
  films: {
    films: mockFilmdata,
    promo: mockPromo,
    isFilmDataLoaded: true,
    filmDataError: false,
  },
});

const history = createMemoryHistory();

describe('Application Routing', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    const authorizationStatus = AuthorizationStatus.NoAuth;
    mockuseApiService.mockReturnValue({
      data: mockFilmdata,
      isLoading: false,
      isError: false,
    });
    mockHistoryRouter.mockReturnValue(
      <Router
        basename={''}
        location={history.location}
        navigationType={history.action}
        navigator={history}
      >
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <WelcomeScreen authorizationStatus={authorizationStatus} />
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    );

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/test promo/i)).toBeInTheDocument();
  });

  it('should render "MyList" when authorized user navigate to "/my-List"', () => {
    history.push(AppRoute.MyList);
    const authorizationStatus = AuthorizationStatus.Auth;
    mockuseApiService.mockReturnValue({
      data: mockFilmdata,
      isLoading: false,
      isError: false,
    });
    mockHistoryRouter.mockReturnValue(
      <Router
        basename={''}
        location={history.location}
        navigationType={history.action}
        navigator={history}
      >
        <Routes>
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoot authorizationStatus={authorizationStatus}>
                <MyList authorizationStatus={authorizationStatus} />
              </PrivateRoot>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    );

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/test film 1/i)).toBeInTheDocument();
  });

  it('should render "PageNotFound" for unknown route', () => {
    history.push('/unknown');
    const authorizationStatus = AuthorizationStatus.Auth;
    mockuseApiService.mockReturnValue({
      data: mockFilmdata,
      isLoading: false,
      isError: false,
    });
    mockHistoryRouter.mockReturnValue(
      <Router
        basename={''}
        location={history.location}
        navigationType={history.action}
        navigator={history}
      >
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <WelcomeScreen authorizationStatus={authorizationStatus} />
            }
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoot authorizationStatus={authorizationStatus}>
                <MyList authorizationStatus={authorizationStatus} />
              </PrivateRoot>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    );

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Back home/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
