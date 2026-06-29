import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface MusicPlayerProps {
  autoStart: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoStart }) => {
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

  // Trigger play when cover is opened
  useEffect(() => {
    if (autoStart) {
      // Delay slightly to ensure iframe is loaded and browser allows audio interaction
      const timer = setTimeout(() => {
        sendCommand('playVideo');
        sendCommand('setVolume', [40]); // Set gentle background volume (0-100)
        setIsPlaying(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart]);

  const togglePlay = () => {
    if (isPlaying) {
      sendCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      sendCommand('playVideo');
      sendCommand('setVolume', [40]);
      setIsPlaying(true);
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
