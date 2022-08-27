import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import useVideoPlayer from '../../hooks/useVideoPlayer/useVideoPlayer';
import PlayerComponent from './player-component';
import type { FilmItemType } from '../../types';

const mockFilm = {
  id: '1',
  name: 'test promo',
  previewImage: 'test',
  previewVideoLink: 'test',
  videoLink: 'test',
  isFullPage: false,
} as unknown as FilmItemType;

const history = createMemoryHistory();
const mockStore = configureMockStore();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/useVideoPlayer/useVideoPlayer');

const mockuseVideoPlayer = useVideoPlayer as jest.MockedFunction<
  typeof useVideoPlayer
>;

describe('PlayerComponent component tests', () => {
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
  it('should render component with children passed', async () => {
    const { id, previewImage, name, previewVideoLink, videoLink } = mockFilm;

    const mockTogglePlay = jest.fn();
    const mockToggleMute = jest.fn();

    mockuseVideoPlayer.mockReturnValue({
      isPlaying: true,
      progress: 0,
      videoRuntime: 0,
      timeLeft: '',
      isVideoMuted: true,
      togglePlay: mockTogglePlay,
      toggleMute: mockToggleMute,
    });

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <PlayerComponent
            id={id}
            imgSrc={previewImage}
            name={name}
            previewVideoLink={previewVideoLink}
            videoLink={videoLink}
            isFullPage
          />
        </HistoryRouter>
      </Provider>
    );

    fireEvent(
      screen.getByTestId('test-video') as Element,
      new Event('loadeddata')
    );

    expect(screen.getByTestId('test-video')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('test-toggleMute'));
    expect(mockToggleMute).toHaveBeenCalled();

    await userEvent.click(screen.getByTestId('test-togglePlay'));
    expect(mockTogglePlay).toHaveBeenCalled();
  });
});
