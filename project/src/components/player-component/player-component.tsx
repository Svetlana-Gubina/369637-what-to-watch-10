import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../loading-overlay/loading-overlay';
import useVideoPlayer from '../../hooks/useVideoPlayer/useVideoPlayer';
import { PlayerState } from '../../pages/player/player-constants';
import { MockTrailerSource } from '../../pages/player/player-constants';
import { Props } from './player-component.types';

function PlayerComponent({ id, imgSrc, name, isFullPage }: Props): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const {
    isPlaying,
    progress,
    videoRuntime,
    timeLeft,
    isVideoMuted,
    togglePlay,
    toggleMute,
  } = useVideoPlayer(videoRef);

  const goFullScreen = (): void => {
    navigate(`/player/${id}`);
  };

  return (
    <div
      style={{
        position: 'relative',
        margin: '0',
        padding: '0',
        width: '100%',
        height: '100%',
      }}
    >
      {isLoading && <LoadingOverlay />}
      <video
        onLoadedData={() => setIsLoading(false)}
        onCanPlay={togglePlay}
        id='video-preview'
        className='player__video'
        poster={imgSrc || 'img/player-poster.jpg'}
        ref={videoRef}
      >
        <source src={MockTrailerSource[0]} type='video/mp4' />
        <source src={MockTrailerSource[1]} type='video/webm' />
        <p>
          Your browser doesn&rsquo;t support HTML5 video. Here is a{' '}
          <a href={MockTrailerSource[0]}>link to the video</a> instead.
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
            <button type='button' className='player__play' onClick={togglePlay}>
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
            className='player__mute'
            style={{
              marginRight: '5px',
              background: '#F5DEB3',
              boxShadow: 'none',
              border: 'none',
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isVideoMuted ? (
              <svg viewBox='3 3 27 27' width={27} height={27}>
                <use xlinkHref='#audio-off' />
              </svg>
            ) : (
              <svg viewBox='0 3 27 27' width={27} height={27}>
                <use xlinkHref='#audio-on' />
              </svg>
            )}
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
