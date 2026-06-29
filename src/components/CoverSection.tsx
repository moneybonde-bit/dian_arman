import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen, Heart, Volume2, VolumeX } from 'lucide-react';
import { EthnicMandala } from './Ornament';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { HERO_IMAGES } from '../data';

interface CoverSectionProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const CoverSection: React.FC<CoverSectionProps> = ({ onOpen, isOpen }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    // Parse guest name from URL parameter "?to=..."
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    if (toParam) {
      setGuestName(toParam.replace(/\+/g, ' '));
    }
  }, []);

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;
    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    if (HERO_IMAGES.length <= 1) return;
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setActivePhotoIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    } else if (info.offset.x > swipeThreshold) {
      setActivePhotoIdx((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
    }
  };

  // Names kinetic typography split into characters for stagger animation
  const titleGroom = "Arman".split("");
  const titleBride = "Dian".split("");

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          id="cover-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-between text-center overflow-hidden bg-brand-burgundy-900"
          initial={{ y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: '-100%', transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } }}
        >
          {/* Full Screen Background Image Carousel */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={activePhotoIdx}
                src={HERO_IMAGES[activePhotoIdx]}
                alt={`Arman & Dian Portrait ${activePhotoIdx + 1}`}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1.1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1.2, ease: 'easeInOut' },
                  scale: { duration: 6, ease: 'linear' }
                }}
                drag={HERO_IMAGES.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 w-full h-full object-cover select-none cursor-grab active:cursor-grabbing"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            {/* Dark gradient overlays to make text readable and add moody aesthetic matching reference */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-burgundy-900/80 via-transparent to-black/90" />
          </div>

          {/* Background delicate mandala pattern - dimmed for dark theme */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center z-0">
            <div className="w-[150vw] h-[150vw] rounded-full border-[10px] border-brand-gold-500 animate-[spin_240s_linear_infinite]" />
            <div className="absolute w-[100vw] h-[100vw] rounded-full border-[2px] border-dashed border-brand-cream-50 animate-[spin_120s_linear_infinite_reverse]" />
          </div>

          {/* Section 1: Top Branding */}
          <div className="pt-16 px-4 z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex justify-center mb-4 opacity-80"
            >
              <EthnicMandala size={40} className="text-brand-gold-400" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-sm md:text-base uppercase font-serif font-semibold text-brand-gold-400 tracking-[0.25em] drop-shadow-md mb-1"
            >
              UNDANGAN
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-sm md:text-base uppercase font-serif font-semibold text-brand-gold-400 tracking-[0.25em] drop-shadow-md"
            >
              PERNIKAHAN
            </motion.p>
          </div>

          {/* Section 2: Couple Name */}
          <div className="my-auto py-8 px-4 z-10 flex flex-col items-center w-full">
            {/* Carousel Dot Indicators */}
            {HERO_IMAGES.length > 1 && (
              <div className="flex justify-center gap-2 mb-6 z-10">
                {HERO_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activePhotoIdx === idx
                        ? 'bg-brand-gold-400 w-4'
                        : 'bg-white/40 hover:bg-white/70'
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Kinetic Typography - Name Reveal */}
            <div className="flex flex-col items-center justify-center drop-shadow-2xl mt-4">
              <div className="flex overflow-hidden">
                {titleGroom.map((char, index) => (
                  <motion.span
                    key={`g-${index}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      duration: 0.6,
                      ease: 'easeOut',
                    }}
                    className="text-6xl md:text-7xl lg:text-8xl font-display text-brand-gold-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.4, type: 'spring', stiffness: 80 }}
                className="text-4xl md:text-5xl font-display text-brand-terracotta-400 my-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              >
                &
              </motion.span>
              <div className="flex overflow-hidden">
                {titleBride.map((char, index) => (
                  <motion.span
                    key={`b-${index}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.5 + index * 0.1,
                      duration: 0.6,
                      ease: 'easeOut',
                    }}
                    className="text-6xl md:text-7xl lg:text-8xl font-display text-brand-gold-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="w-20 h-[1px] bg-brand-gold-500/80 my-6"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 2.3, duration: 0.8 }}
              className="text-sm tracking-[0.2em] font-semibold font-serif text-brand-cream-100 drop-shadow-md"
            >
              25 JULI 2026
            </motion.p>
          </div>

          {/* Section 3: Guest Box & Open Button */}
          <div className="pb-12 px-6 z-10 w-full max-w-sm flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="bg-black/30 backdrop-blur-md border border-brand-gold-500/30 px-6 py-5 rounded-2xl shadow-2xl w-full mb-8 relative overflow-hidden"
            >
              {/* Corner gold highlights */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-gold-400/60 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-gold-400/60 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-gold-400/60 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-gold-400/60 rounded-br-lg" />

              <p className="text-[10px] uppercase tracking-widest text-brand-cream-50/70 font-medium mb-1.5">
                Kpd. Yth. Bapak/Ibu/Saudara/i:
              </p>
              <h2 className="text-xl font-display font-semibold text-brand-gold-200 tracking-wide line-clamp-1 drop-shadow-sm">
                {guestName}
              </h2>
              <p className="text-[9px] text-brand-cream-50/50 mt-1.5 italic font-light">
                *Mohon maaf bila ada salah penulisan nama/gelar
              </p>
            </motion.div>

            {/* Open Button */}
            <motion.button
              onClick={onOpen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.8 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              className="flex items-center gap-3 bg-gradient-to-r from-brand-gold-600 to-brand-gold-800 hover:from-brand-gold-500 hover:to-brand-gold-700 text-brand-cream-50 font-medium px-8 py-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-brand-gold-400/40 cursor-pointer group transition-all duration-300"
            >
              <MailOpen size={18} className="group-hover:rotate-6 transition-transform duration-300 text-brand-cream-50" />
              <span className="tracking-widest text-sm font-semibold uppercase">Buka Undangan</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
