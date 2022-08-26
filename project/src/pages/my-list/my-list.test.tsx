import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import MyList from './my-list';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { createMemoryHistory } from 'history';
import type { FilmItemType } from '../../types';
import useApiService from '../../hooks/apiHooks/useApiService';

const mockFilmdata = [
  {
    id: '111',
    name: 'test film 1',
  },
  {
    id: '222',
    name: 'test film 2',
  },
] as unknown as FilmItemType[];

const history = createMemoryHistory();
const mockStore = configureMockStore();

jest.mock('../../hooks/apiHooks/useApiService');

const mockuseApiService = useApiService as jest.MockedFunction<
  typeof useApiService
>;

describe('MyList component test', () => {
  it('should render correctly', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    mockuseApiService.mockReturnValue({
      data: mockFilmdata,
      isLoading: false,
      isError: false,
    });

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <MyList authorizationStatus={authorizationStatus} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/test film 1/i)).toBeInTheDocument();
  });

  it('should render error screen in case of error', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    mockuseApiService.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <MyList authorizationStatus={authorizationStatus} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/My list/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/Sorry, some error, try again later./i)
    ).toBeInTheDocument();
  });
});
