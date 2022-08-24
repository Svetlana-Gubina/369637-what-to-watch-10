/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const formatDuration = (seconds: number) => {
  const hoursCount = Math.floor(seconds / 3600);
  const minsCount = Math.floor((seconds - hoursCount * 3600) / 60);
  const secsCount = Math.floor(seconds - hoursCount * 3600 - minsCount * 60);

  return hoursCount
    ? dayjs
        .duration({
          seconds: secsCount,
          minutes: minsCount,
          hours: hoursCount,
        })
        .format('HH:mm:ss')
    : dayjs
        .duration({
          seconds: secsCount,
          minutes: minsCount,
        })
        .format('mm:ss');
};

function useVideoPlayer(
  videoElement: React.RefObject<HTMLVideoElement>,
  isLoading: boolean
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRuntime, setVideoRuntime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState(formatDuration(videoRuntime) || '');

  const togglePlay = (): void => {
    setIsPlaying((prevState) => !prevState);
  };

  const toggleMute = (): void => {
    setIsVideoMuted((prevState) => !prevState);
  };

  useEffect(() => {
    const updateProgress = () => {
      if (
        isPlaying &&
        videoElement.current &&
        videoElement.current.currentTime
      ) {
        setCurrentTime(videoElement.current.currentTime);
        setProgress((videoElement.current.currentTime / videoRuntime) * 100);
        setTimeLeft(formatDuration(videoRuntime - currentTime));
      }

      return requestAnimationFrame(updateProgress);
    };

    const requestId = updateProgress();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [videoElement, currentTime, videoRuntime, isPlaying, progress]);

  useEffect(() => {
    const videoTime = videoElement?.current?.duration;

    if (videoTime) {
      setVideoRuntime(videoTime);
    }
  }, [videoRuntime, videoElement, isLoading]);

  useEffect(() => {
    if (videoElement.current) {
      videoElement.current.muted = isVideoMuted;
    }
  }, [isVideoMuted, videoElement]);

  useEffect(() => {
    if (isPlaying) {
      videoElement?.current?.play();
    } else {
      videoElement?.current?.pause();
    }
  }, [isPlaying, videoElement]);

  useEffect(() => {
    if (progress === 100) {
      setIsPlaying(false);
    }
  }, [progress]);

  return {
    isPlaying,
    progress,
    videoRuntime,
    timeLeft,
    isVideoMuted,
    togglePlay,
    toggleMute,
  };
}

export default useVideoPlayer;
