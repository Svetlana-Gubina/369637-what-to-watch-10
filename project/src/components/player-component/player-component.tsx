import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../loading-overlay/loading-overlay';
import useVideoPlayer from '../../hooks/useVideoPlayer/useVideoPlayer';
import { PlayerState } from '../../pages/player/player-constants';
import { Props } from './player-component.types';
import './player-component.css';

function PlayerComponent({
  id,
  name,
  previewVideoLink,
  videoLink,
  isFullPage,
}: Props): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadError, setIsLoadError] = useState(false);
  const navigate = useNavigate();
  const {
    isPlaying,
    progress,
    videoRuntime,
    timeLeft,
    isVideoMuted,
    togglePlay,
    toggleMute,
  } = useVideoPlayer(videoRef, isLoading);

  const goFullScreen = (): void => {
    navigate(`/player/${id}`);
  };

  if (isLoadError) {
    if (isFullPage) {
      return (
        isFullPage && (
          <div className='loadError-container'>
            Sorry, video cannot be played
            <button
              onClick={() => navigate(-1)}
              type='button'
              className='player__exit'
            >
              Exit
            </button>
          </div>
        )
      );
    }
  }

  return (
    <div className='playerComponent-container'>
      {isLoading && <LoadingOverlay />}
      <video
        preload='auto'
        onLoadedData={() => setIsLoading(false)}
        onError={() => setIsLoadError(true)}
        onCanPlay={togglePlay}
        id='video-preview'
        data-testid='test-video'
        className='player__video'
        ref={videoRef}
      >
        <source
          src={isFullPage ? videoLink : previewVideoLink}
          type='video/mp4'
        />
        <p>
          Your browser doesn&rsquo;t support HTML5 video. Here is a{' '}
          <a href={videoLink}>link to the video</a> instead.
        </p>
      </video>

      {isFullPage && (
        <button
          onClick={() => navigate(-1)}
          type='button'
          className='player__exit'
        >
          Exit
        </button>
      )}

      <div className='player__controls'>
        {isFullPage && (
          <div className='player__controls-row'>
            <div className='player__time'>
              <progress
                className='player__progress'
                value={progress}
                max={100}
              />

              <div
                className='player__toggler'
                style={{ left: `${Math.round(progress)}%` }}
              >
                Toggler
              </div>
            </div>

            {videoRuntime > 0 && (
              <div className='player__time-value'>{timeLeft}</div>
            )}
          </div>
        )}

        <div className='player__controls-row'>
          {isFullPage && (
            <button
              type='button'
              className='player__play'
              onClick={togglePlay}
              data-testid='test-togglePlay'
            >
              <svg viewBox='0 0 19 19' width={19} height={19}>
                <use
                  xlinkHref={
                    isPlaying
                      ? PlayerState.pause.iconHref
                      : PlayerState.play.iconHref
                  }
                />
              </svg>
              <span>
                {isPlaying ? PlayerState.pause.state : PlayerState.play.state}
              </span>
            </button>
          )}

          {isFullPage && <div className='player__name'>{name}</div>}

          <button
            onClick={toggleMute}
            type='button'
            data-testid='test-toggleMute'
            className='player-mute'
          >
            <svg viewBox='3 3 27 27' width={27} height={27}>
              <use xlinkHref={`#audio-${isVideoMuted ? 'off' : 'on'}`} />
            </svg>
          </button>

          {!isFullPage && (
            <button
              onClick={goFullScreen}
              type='button'
              className='player__full-screen'
            >
              <svg viewBox='0 0 27 27' width={27} height={27}>
                <use xlinkHref='#full-screen' />
              </svg>
              <span>Full screen</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerComponent;
