import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Catalog from './catalog-section';
import type { FilmItemType } from '../../types';

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
const store = mockStore({
  films: {
    films: mockFilmdata,
  },
});

describe('Catalog component tests', () => {
  it('should render component with children passed', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Catalog />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('test-showMore')).toBeInTheDocument();
  });
});
