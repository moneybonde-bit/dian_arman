import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Music } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface MusicPlayerProps {
  autoStart: boolean;
}

export interface MusicPlayerHandle {
  play: () => void;
  pause: () => void;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  ({ autoStart }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    // Helper to send command to YouTube iframe
    const sendCommand = (func: string, args: any = '') => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func, args }),
            '*'
          );
        } catch (e) {
          console.error('Error sending command to YouTube player:', e);
        }
      }
    };

    const playMusic = () => {
      sendCommand('playVideo');
      sendCommand('setVolume', [0]);
      setIsPlaying(true);

      let currentVol = 0;
      const targetVol = 40;
      const step = 2; // Volume steps
      const intervalTime = 45; // ms (gives ~900ms fade duration)

      const fadeInterval = setInterval(() => {
        currentVol += step;
        if (currentVol >= targetVol) {
          currentVol = targetVol;
          clearInterval(fadeInterval);
        }
        sendCommand('setVolume', [currentVol]);
      }, intervalTime);
    };

    const pauseMusic = () => {
      sendCommand('pauseVideo');
      setIsPlaying(false);
    };

    // Expose methods to parent components to trigger on direct user interaction
    useImperativeHandle(ref, () => ({
      play: playMusic,
      pause: pauseMusic
    }));

    // Trigger play when cover is opened (fallback / secondary check)
    useEffect(() => {
      if (autoStart) {
        playMusic();
      }
    }, [autoStart]);

    const togglePlay = () => {
      if (isPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    };

    return (
      <div className="fixed top-4 right-4 z-40">
        {/* Hidden YouTube Iframe to stream the requested song */}
        <iframe
          ref={iframeRef}
          src="https://www.youtube.com/embed/c-CV0y_xK_Y?enablejsapi=1&autoplay=0&loop=1&playlist=c-CV0y_xK_Y&controls=0&mute=0"
          title="Background Music"
          width="0"
          height="0"
          style={{
            width: '0px',
            height: '0px',
            border: '0px',
            position: 'absolute',
            pointerEvents: 'none',
          }}
          allow="autoplay"
        />

        <button
          onClick={togglePlay}
          className="flex items-center justify-center gap-2.5 bg-brand-cream-50/95 backdrop-blur-md border border-brand-gold-500/35 text-brand-burgundy-800 py-2.5 px-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[44px] cursor-pointer"
          title={isPlaying ? "Matikan Musik" : "Putar Musik"}
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
                    <motion.span 
                      animate={{ height: [3, 14, 5, 12, 3] }} 
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-[2px] bg-brand-terracotta-500 rounded-full origin-bottom" 
                    />
                    <motion.span 
                      animate={{ height: [5, 8, 14, 4, 5] }} 
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
                      className="w-[2px] bg-brand-gold-500 rounded-full origin-bottom" 
                    />
                    <motion.span 
                      animate={{ height: [12, 4, 9, 14, 12] }} 
                      transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                      className="w-[2px] bg-brand-terracotta-500 rounded-full origin-bottom" 
                    />
                    <motion.span 
                      animate={{ height: [4, 11, 3, 9, 4] }} 
                      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                      className="w-[2px] bg-brand-burgundy-600 rounded-full origin-bottom" 
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="playing-static"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="relative flex items-center justify-center w-5 h-5"
                  >
                    <Volume2 size={18} className="text-brand-terracotta-500" />
                  </motion.div>
                )
              ) : (
                <motion.div
                  key="paused"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex items-center justify-center w-5 h-5"
                >
                  <Play size={16} className="text-brand-burgundy-900/80 fill-brand-burgundy-900/20" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Subtle hover status text */}
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-[10px] font-bold uppercase tracking-widest text-brand-burgundy-900/80 whitespace-nowrap">
            {isPlaying ? 'Music On' : 'Music Off'}
          </span>
        </button>
      </div>
    );
  }
);

MusicPlayer.displayName = 'MusicPlayer';
