import React, { createContext, useRef, useState } from 'react';
import { Platform } from 'react-native';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const videoRefs = useRef(new Map());

  const registerVideo = (id, ref) => {
    videoRefs.current.set(id, ref);
  };

  const unregisterVideo = (id) => {
    videoRefs.current.delete(id);
  };

  const pauseAllExcept = (exceptId) => {
    videoRefs.current.forEach((ref, id) => {
      if (id !== exceptId && ref) {
        if (Platform.OS === 'web') {
          ref.pause();
        } else {
          ref.pauseAsync();
        }
      }
    });
    setCurrentPlayingId(exceptId);
  };

  return (
    <VideoContext.Provider value={{ registerVideo, unregisterVideo, pauseAllExcept, currentPlayingId }}>
      {children}
    </VideoContext.Provider>
  );
}; 