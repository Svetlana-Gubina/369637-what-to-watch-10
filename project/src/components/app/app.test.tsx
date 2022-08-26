import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../project.constants';
import HistoryRouter from '../history-route/history-route';
import type { FilmItemType } from '../../types';
import { AuthorizationStatus } from '../private-route/private-route.constants';
import App from './app';

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
  },
  {
    id: '222',
    name: 'test film 2',
  },
] as unknown as FilmItemType[];

const mockStore = configureMockStore();
const store = mockStore({
  user: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  films: {
    films: mockFilmdata,
    isFilmDataLoaded: true,
    filmDataError: false,
    promo: mockPromo,
  },
});
const history = createMemoryHistory();

describe('App component test', () => {
  it.skip('should render correctly', () => {
    // const authorizationStatus = AuthorizationStatus.Auth;
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/test promo/i)).toBeInTheDocument();
  });
});
