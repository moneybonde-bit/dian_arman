import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Heart, Calendar } from 'lucide-react';
import { HERO_IMAGES } from '../data';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const HeroSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const titleGroom = "Arman".split("");
  const titleBride = "Dian".split("");

  const handleScrollDown = () => {
    const element = document.getElementById('mempelai');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative w-full h-[100dvh] min-h-[600px] flex flex-col items-center justify-between text-center overflow-hidden bg-brand-burgundy-950 px-4 py-12"
    >
      {/* Background Image - Bright and high-contrast, matching cover adat */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGES[0]} 
          alt="Arman & Dian Traditional Cover" 
          className="w-full h-full object-cover opacity-90 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Soft, professional gradient overlays (NOT black or dull, but a glowing rich tone) */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-950 via-black/10 to-brand-burgundy-950/40" />
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Neon light frame around the hero section */}
        <div className="absolute inset-4 border border-brand-gold-500/25 rounded-2xl pointer-events-none z-10 shadow-[0_0_12px_rgba(229,184,36,0.1)_inset]" />
      </div>

      {/* Decorative neon sparkles floating around */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[10%] text-brand-gold-300 neon-glow-gold"
        >
          <Sparkles size={24} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-[12%] text-rose-500 neon-glow-gold"
        >
          <Heart size={20} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 left-[15%] text-brand-gold-400 neon-glow-gold"
        >
          <Sparkles size={16} />
        </motion.div>
      </div>

      {/* Section 1: Top Greeting Card style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="z-10 mt-6"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-serif font-bold text-brand-gold-300 drop-shadow-md px-3 py-1 bg-black/40 backdrop-blur-sm border border-brand-gold-500/20 rounded-full">
          The Wedding Celebration of
        </span>
      </motion.div>

      {/* Section 2: Glistening metallic-shine Names */}
      <div className="z-10 flex flex-col items-center justify-center my-auto w-full px-2">
        <div className="flex flex-col items-center drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
          {/* Groom name */}
          <div className="flex overflow-hidden py-1">
            {titleGroom.map((char, index) => (
              <motion.span
                key={`hg-${index}`}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.7,
                  ease: 'easeOut',
                }}
                className="text-6xl md:text-8xl font-display font-extrabold metallic-shine select-none"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Ampersand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 90 }}
            className="text-4xl md:text-5xl font-display font-bold text-brand-gold-300 neon-glow-text my-2 animate-pulse-neon select-none"
          >
            &
          </motion.div>

          {/* Bride name */}
          <div className="flex overflow-hidden py-1">
            {titleBride.map((char, index) => (
              <motion.span
                key={`hb-${index}`}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.0 + index * 0.1,
                  duration: 0.7,
                  ease: 'easeOut',
                }}
                className="text-6xl md:text-8xl font-display font-extrabold metallic-shine select-none"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Dynamic subtext frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-6 flex items-center gap-3 px-5 py-2 rounded-xl bg-black/45 backdrop-blur-md border border-brand-gold-500/35 shadow-2xl"
        >
          <Calendar size={14} className="text-brand-gold-400" />
          <span className="text-xs md:text-sm tracking-[0.25em] font-semibold font-serif text-brand-cream-50 uppercase">
            Sabtu, 25 Juli 2026
          </span>
        </motion.div>
      </div>

      {/* Section 3: Pulsing scroll guide arrow */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="z-10 flex flex-col items-center gap-1 cursor-pointer group text-brand-cream-50/75 hover:text-brand-gold-300 transition-colors duration-300 pb-2"
        title="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-serif font-bold opacity-80 group-hover:tracking-[0.35em] transition-all">
          Scroll Down
        </span>
        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown size={22} className="text-brand-gold-400 group-hover:scale-110 transition-transform" />
        </motion.div>
      </motion.button>
    </section>
  );
};
