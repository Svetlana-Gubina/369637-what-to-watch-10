import React, { useState, useEffect } from 'react';

function useVideoPlayer(videoElement: React.RefObject<HTMLVideoElement>) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRuntime, setVideoRuntime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState(
    `${Math.floor(videoRuntime / 60)} : ${Math.floor(videoRuntime % 60)}` || ''
  );

  const togglePlay = (): void => {
    setIsPlaying((prevState) => !prevState);
  };

  const toggleMute = (): void => {
    setIsVideoMuted((prevState) => !prevState);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (
        isPlaying &&
        videoElement.current &&
        videoElement.current.currentTime
      ) {
        setCurrentTime(videoElement.current.currentTime);
        setProgress((videoElement.current.currentTime / videoRuntime) * 100);
        setTimeLeft(
          `${Math.floor((videoRuntime - currentTime) / 60)} : ${Math.floor(
            (videoRuntime - currentTime) % 60
          )}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [videoElement, currentTime, videoRuntime, isPlaying, progress]);

  useEffect(() => {
    const videoTime = videoElement?.current?.duration;

    if (videoTime) {
      setVideoRuntime(videoTime);
    }
  }, [videoRuntime, videoElement]);

  useEffect(() => {
    if (videoElement.current) {
      if (isVideoMuted) {
        videoElement.current.muted = true;
      } else {
        videoElement.current.muted = false;
      }
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
