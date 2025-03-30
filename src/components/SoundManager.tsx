'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SoundType = 'keystroke' | 'execution' | 'error' | 'success';

interface SoundContextType {
  playSound: (type: SoundType) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function useSounds() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSounds must be used within a SoundProvider');
  }
  return context;
}

interface SoundProviderProps {
  children: ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [sounds, setSounds] = useState<Record<SoundType, HTMLAudioElement | null>>({
    keystroke: null,
    execution: null,
    error: null,
    success: null,
  });

  useEffect(() => {
    // Initialize audio objects
    setSounds({
      keystroke: new Audio('/sounds/keystroke.mp3'),
      execution: new Audio('/sounds/execution.mp3'),
      error: new Audio('/sounds/error.mp3'),
      success: new Audio('/sounds/success.mp3'),
    });

    // Check if user has previously muted sounds
    const mutedState = localStorage.getItem('terminal_muted');
    if (mutedState === 'true') {
      setIsMuted(true);
    }

    return () => {
      // Cleanup audio objects
      Object.values(sounds).forEach(sound => {
        if (sound) {
          sound.pause();
          sound.currentTime = 0;
        }
      });
    };
  }, []);

  const playSound = (type: SoundType) => {
    if (isMuted || !sounds[type]) return;

    // Clone the audio to allow for rapid consecutive plays
    const sound = sounds[type];
    if (sound) {
      // For keystroke sounds, keep them shorter and quieter
      if (type === 'keystroke') {
        sound.volume = 0.2;
        sound.currentTime = 0;
      } else {
        sound.volume = 0.4;
        sound.currentTime = 0;
      }
      
      try {
        sound.play().catch(err => {
          // Ignore errors - usually from browsers requiring user interaction
          console.log('Sound playback was prevented by the browser');
        });
      } catch (error) {
        // Fallback for browsers with restrictive autoplay policies
      }
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem('terminal_muted', String(newMutedState));
  };

  return (
    <SoundContext.Provider value={{ playSound, isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
} 