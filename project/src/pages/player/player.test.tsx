import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import useUrlParam from '../../hooks/useUrlParam/useUrlParam';
import HistoryRouter from '../../components/history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Player from './player';
import type { FilmItemType } from '../../types';

const mockFilmdata = [
  {
    id: '1',
    name: 'test film 1',
    previewImage: 'test',
    previewVideoLink: 'test',
    videoLink: 'test',
  },
  {
    id: '2',
    name: 'test film 2',
    previewImage: 'test',
    previewVideoLink: 'test',
    videoLink: 'test',
  },
] as unknown as FilmItemType[];

const history = createMemoryHistory();
const mockStore = configureMockStore();

jest.mock('../../hooks/useUrlParam/useUrlParam');

const mockuseUrlParam = useUrlParam as jest.MockedFunction<typeof useUrlParam>;

describe('Player component tests', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should render component with children passed', () => {
    history.push(`/player/${mockFilmdata[0].id}`);
    mockuseUrlParam.mockReturnValue(mockFilmdata[0]);

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Player films={mockFilmdata} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('test-video')).toBeInTheDocument();
  });
});
