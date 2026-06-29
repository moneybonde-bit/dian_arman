import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EthnicMandala } from './Ornament';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress smoothly over 1.8 seconds
    const duration = 1800;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#1a0a0c] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background delicate glowing particle dots */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-burgundy-950/40 via-transparent to-black pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        {/* Slowly rotating elegant mandala */}
        <motion.div
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{
            duration: 12,
            ease: "linear",
            repeat: Infinity,
          }}
          className="text-brand-gold-400 mb-8 filter drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
        >
          <EthnicMandala size={80} />
        </motion.div>

        {/* Cinematic Title Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-2"
        >
          <p className="text-[10px] md:text-[11px] font-sans uppercase font-bold tracking-[0.4em] text-brand-gold-500/80">
            The Wedding of
          </p>
          <h1 className="text-3xl md:text-4xl font-display text-brand-gold-300 tracking-wide font-medium drop-shadow-md">
            Arman & Dian
          </h1>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-48 h-[2px] bg-brand-gold-500/10 rounded-full mt-10 relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-gold-500 to-brand-gold-300 shadow-[0_0_8px_rgba(212,175,55,0.6)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Minimalist percentage counter */}
        <motion.p 
          className="text-[10px] font-mono text-brand-gold-400/60 mt-3 uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading {Math.min(100, Math.floor(progress))}%
        </motion.p>
      </div>
    </div>
  );
};
