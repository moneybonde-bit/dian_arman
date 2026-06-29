import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface MusicPlayerProps {
  autoStart: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoStart }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Create audio element
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
    audio.loop = true;
    audio.volume = 0.4; // Subtle background volume
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Trigger play when cover is opened
  useEffect(() => {
    if (autoStart && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.log('Autoplay blocked or audio failed to load: ', err);
        });
    }
  }, [autoStart]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.error('Playback failed: ', err);
        });
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        onClick={togglePlay}
        className="flex items-center justify-center gap-2 bg-brand-cream-50/95 backdrop-blur-sm border border-brand-gold-500/30 text-brand-burgundy-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[44px] min-w-[44px] cursor-pointer"
        title={isPlaying ? "Matikan Musik" : "Putar Musik"}
        id="music-toggle-btn"
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {isPlaying ? (
            <>
              {/* Spinning record track or active soundwaves */}
              <Volume2 size={18} className="text-brand-terracotta-500 z-10" />
              {!prefersReducedMotion && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-gold-500/30 animate-ping opacity-75" />
              )}
            </>
          ) : (
            <VolumeX size={18} className="text-brand-burgundy-900/60 z-10" />
          )}
        </div>
        
        {/* Subtle hover status text */}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-[10px] font-bold uppercase tracking-wider text-brand-burgundy-900/80 whitespace-nowrap">
          {isPlaying ? 'Music On' : 'Music Off'}
        </span>
      </button>
    </div>
  );
};
