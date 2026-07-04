import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Play } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export interface MusicPlayerHandle {
  play: () => void;
  pause: () => void;
}

interface MusicPlayerProps {}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  (_, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    const playMusic = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (fadeRef.current) clearInterval(fadeRef.current);
      audio.volume = 0;

      // .play() called inside a user-gesture handler — works on iOS Safari
      audio.play().then(() => {
        setIsPlaying(true);
        let vol = 0;
        fadeRef.current = setInterval(() => {
          vol = Math.min(vol + 0.02, 0.4);
          audio.volume = vol;
          if (vol >= 0.4 && fadeRef.current) {
            clearInterval(fadeRef.current);
            fadeRef.current = null;
          }
        }, 45);
      }).catch(() => {
        // Browser blocked autoplay or audio file not yet uploaded to /public/audio/
      });
    };

    const pauseMusic = () => {
      if (fadeRef.current) clearInterval(fadeRef.current);
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
    };

    useImperativeHandle(ref, () => ({
      play: playMusic,
      pause: pauseMusic,
    }));

    const togglePlay = () => {
      if (isPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    };

    return (
      <div className="fixed top-[calc(1rem+env(safe-area-inset-top))] right-4 z-40">
        {/* Local audio file — upload wedding-song.mp3 to public/audio/ */}
        <audio ref={audioRef} src="/audio/wedding-song.mp3" loop preload="none" />

        <button
          onClick={togglePlay}
          className="flex items-center justify-center gap-2.5 bg-brand-cream-50/95 backdrop-blur-md border border-brand-gold-500/35 text-brand-burgundy-800 py-2.5 px-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[44px] cursor-pointer"
          title={isPlaying ? 'Matikan Musik' : 'Putar Musik'}
          id="music-toggle-btn"
        >
          <div className="w-5 h-5 flex items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isPlaying ? (
                !prefersReducedMotion ? (
                  <motion.div
                    key="equalizer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-end gap-[2.5px] h-3.5 w-4 pb-[1px]"
                    aria-hidden="true"
                  >
                    <motion.span animate={{ height: [3, 14, 5, 12, 3] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} className="w-[2px] bg-brand-terracotta-500 rounded-full origin-bottom" />
                    <motion.span animate={{ height: [5, 8, 14, 4, 5] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }} className="w-[2px] bg-brand-gold-500 rounded-full origin-bottom" />
                    <motion.span animate={{ height: [12, 4, 9, 14, 12] }} transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }} className="w-[2px] bg-brand-terracotta-500 rounded-full origin-bottom" />
                    <motion.span animate={{ height: [4, 11, 3, 9, 4] }} transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} className="w-[2px] bg-brand-burgundy-600 rounded-full origin-bottom" />
                  </motion.div>
                ) : (
                  <motion.div key="playing-static" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} className="relative flex items-center justify-center w-5 h-5">
                    <Volume2 size={18} className="text-brand-terracotta-500" />
                  </motion.div>
                )
              ) : (
                <motion.div key="paused" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} className="relative flex items-center justify-center w-5 h-5">
                  <Play size={16} className="text-brand-burgundy-900/80 fill-brand-burgundy-900/20" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-[10px] font-bold uppercase tracking-widest text-brand-burgundy-900/80 whitespace-nowrap">
            {isPlaying ? 'Music On' : 'Music Off'}
          </span>
        </button>
      </div>
    );
  }
);

MusicPlayer.displayName = 'MusicPlayer';
