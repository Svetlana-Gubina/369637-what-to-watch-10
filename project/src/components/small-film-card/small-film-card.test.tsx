import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import SmallFilmCard from '../small-film-card/small-film-card';
// import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const testFilmData = {
  id: 111,
  imgSrc: 'test',
  name: 'test name',
  previewVideoLink: 'test',
  videoLink: 'test',
};

describe('Details component test', () => {
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

    // todo: should it work? - https://stackoverflow.com/questions/51829319/how-to-mock-video-pause-function-using-jest
    // await userEvent.hover(screen.getByTestId('test-smallCard'));
    // await screen.findByTestId('test-video');
  });
});
