import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import WelcomeScreen from './welcome-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import type { FilmItemType } from '../../types';
import { AppRoute } from '../../project.constants';
import { createApi } from '../../api';
import type { RootState } from '../../types/store';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import useApiService from '../../hooks/apiHooks/useApiService';

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

const history = createMemoryHistory();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  RootState,
  Action,
  ThunkDispatch<RootState, typeof api, Action>
>(middlewares);

const store = mockStore({
  films: {
    films: mockFilmdata,
    promo: mockPromo,
  },
});

jest.mock('../../hooks/apiHooks/useApiService');

const mockuseApiService = useApiService as jest.MockedFunction<
  typeof useApiService
>;

describe('WelcomeScreen component test', () => {
  it('should render correctly', async () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    mockuseApiService.mockReturnValue({
      data: mockFilmdata,
      isLoading: false,
      isError: false,
    });
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <WelcomeScreen authorizationStatus={authorizationStatus} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByAltText(/test promo poster/i)).toBeInTheDocument();
  });
});
