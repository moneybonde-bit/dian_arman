import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Sparkles } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const targetDate = new Date('2026-07-25T11:00:00+08:00');

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits: { label: string; value: number; key: keyof TimeLeft }[] = [
    { label: 'Hari', value: timeLeft.days, key: 'days' },
    { label: 'Jam', value: timeLeft.hours, key: 'hours' },
    { label: 'Menit', value: timeLeft.minutes, key: 'minutes' },
    { label: 'Detik', value: timeLeft.seconds, key: 'seconds' },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center mt-10 px-4">
      {/* Delicate Heading Label */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={14} className="text-brand-gold-500 animate-pulse" />
        <p className="text-[11px] uppercase tracking-[0.25em] font-serif font-bold text-brand-gold-700">
          Menuju Hari Bahagia
        </p>
        <Sparkles size={14} className="text-brand-gold-500 animate-pulse" />
      </div>

      {/* Modern High-End Grid */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md w-full">
        {timeUnits.map(({ label, value, key }) => (
          <motion.div
            key={key}
            onHoverStart={() => setIsHovered(key)}
            onHoverEnd={() => setIsHovered(null)}
            whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
            className={`bg-brand-cream-100/60 border border-brand-gold-500/20 backdrop-blur-sm rounded-2xl py-4 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 shadow-sm ${
              isHovered === key ? 'border-brand-terracotta-500/40 shadow-md shadow-brand-terracotta-500/5' : ''
            }`}
          >
            {/* Glowing background ring */}
            <AnimatePresence>
              {isHovered === key && !prefersReducedMotion && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-brand-terracotta-500 rounded-2xl pointer-events-none"
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {/* Flip / Slide transition for active numerical change */}
            <div className="h-10 sm:h-12 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={value}
                  initial={prefersReducedMotion ? { opacity: 0 } : { y: 15, opacity: 0, filter: 'blur(2px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { y: -15, opacity: 0, filter: 'blur(2px)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="text-2xl sm:text-3xl font-display font-semibold text-brand-burgundy-900 drop-shadow-sm select-none"
                >
                  {String(value).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Soft decorative golden dividing horizontal bar */}
            <div className="w-8 h-[1px] bg-brand-gold-500/20 my-1" />

            {/* Label */}
            <span className="text-[10px] sm:text-xs font-semibold text-brand-burgundy-950/60 uppercase tracking-widest">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
