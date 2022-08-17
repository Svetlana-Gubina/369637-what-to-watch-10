/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

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
    } else {
      const customId = 'duration-id';
      toast.warn('Some error happened, video duration is unknown', {
        toastId: customId,
      });
    }
  }, [videoRuntime, videoElement]);

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
