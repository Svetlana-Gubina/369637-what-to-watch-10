import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import SmallFilmCard from '../small-film-card/small-film-card';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const testFilmData = {
  id: 111,
  imgSrc: 'test',
  name: 'test name',
  previewVideoLink: 'test',
  videoLink: 'test',
};

describe('SmallFilmCard component test', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });
  it('should render correctly', async () => {
    const { id, imgSrc, name, previewVideoLink, videoLink } = testFilmData;

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <SmallFilmCard
            id={id}
            imgSrc={imgSrc}
            name={name}
            previewVideoLink={previewVideoLink}
            videoLink={videoLink}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByAltText(name)).toBeInTheDocument();
  });
});
