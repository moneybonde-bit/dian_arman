import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen, Heart, Volume2, VolumeX, Sparkles, Star } from 'lucide-react';
import { EthnicMandala } from './Ornament';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { HERO_IMAGES } from '../data';

interface CoverSectionProps {
  onOpen: () => void;
  isOpen: boolean;
}

const NEON_ICONS = [
  { Icon: Heart, x: '8%', y: '18%', size: 24, color: 'text-rose-500', delay: 0 },
  { Icon: Sparkles, x: '85%', y: '12%', size: 20, color: 'text-brand-gold-300', delay: 1 },
  { Icon: Heart, x: '82%', y: '72%', size: 28, color: 'text-rose-500', delay: 1.5 },
  { Icon: Sparkles, x: '12%', y: '78%', size: 22, color: 'text-brand-gold-300', delay: 0.5 },
  { Icon: Star, x: '6%', y: '42%', size: 16, color: 'text-yellow-400', delay: 2 },
  { Icon: Star, x: '90%', y: '48%', size: 18, color: 'text-yellow-400', delay: 0.8 }
];

export const CoverSection: React.FC<CoverSectionProps> = ({ onOpen, isOpen }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isOpening, setIsOpening] = useState(false);

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

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Introduce tactile spring delay & ripple feedback before trigger
    setTimeout(() => {
      onOpen();
    }, 350);
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
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, transition: { duration: 1.5, ease: [0.25, 1, 0.5, 1] } }}
        >
          {/* Full Screen Background Image Carousel with elegant scale exit */}
          <motion.div 
            exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.98, opacity: 0, transition: { duration: 1.5, ease: [0.25, 1, 0.5, 1] } }}
            className="absolute inset-0 z-0"
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={activePhotoIdx}
                src={HERO_IMAGES[activePhotoIdx]}
                alt={`Arman & Dian Portrait ${activePhotoIdx + 1}`}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1.03 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.00, transition: { duration: 1.5, ease: [0.25, 1, 0.5, 1] } }}
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
            {/* Soft, beautiful bright overlays to make the couple portrait fully visible and vibrant */}
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-950/80 via-transparent to-brand-burgundy-950/40" />
            
            {/* A glowing golden neon border frame around the screen */}
            <div className="absolute inset-3 border border-brand-gold-500/30 rounded-2xl pointer-events-none z-10 shadow-[0_0_15px_rgba(229,184,36,0.15)_inset]" />
            <div className="absolute inset-4 border border-brand-gold-500/10 rounded-xl pointer-events-none z-10" />

            {/* Floating Interactive Neon Icons */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
              {NEON_ICONS.map((item, idx) => {
                const IconComponent = item.Icon;
                return (
                  <motion.div
                    key={idx}
                    style={{ left: item.x, top: item.y }}
                    className={`absolute ${item.color} neon-glow-gold opacity-75`}
                    animate={{
                      y: [0, -15, 0],
                      scale: [1, 1.15, 1],
                      rotate: [0, 10, -10, 0],
                      opacity: [0.5, 0.9, 0.5]
                    }}
                    transition={{
                      duration: 4 + idx,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: item.delay
                    }}
                  >
                    <IconComponent size={item.size} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Background delicate mandala pattern - dimmed for dark theme */}
          <motion.div 
            exit={prefersReducedMotion ? { opacity: 0 } : { scale: 1.04, opacity: 0, transition: { duration: 1.5, ease: [0.25, 1, 0.5, 1] } }}
            className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center z-0"
          >
            <div className="w-[150vw] h-[150vw] rounded-full border-[10px] border-brand-gold-500 animate-[spin_240s_linear_infinite]" />
            <div className="absolute w-[100vw] h-[100vw] rounded-full border-[2px] border-dashed border-brand-cream-50 animate-[spin_120s_linear_infinite_reverse]" />
          </motion.div>

          {/* Section 1: Top Branding */}
          <motion.div 
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -25, transition: { duration: 1.1, ease: [0.25, 1, 0.5, 1] } }}
            className="pt-16 px-4 z-10 w-full"
          >
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
          </motion.div>

          {/* Section 2: Couple Name */}
          <motion.div 
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -35, scale: 0.96, transition: { duration: 1.3, ease: [0.25, 1, 0.5, 1] } }}
            className="my-auto py-8 px-4 z-10 flex flex-col items-center w-full"
          >
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

            {/* Kinetic Typography - Name Reveal with metallic shine & neon glow */}
            <div className="flex flex-col items-center justify-center drop-shadow-2xl mt-4">
              <div className="flex overflow-hidden py-1">
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
                    className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold metallic-shine select-none"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.4, type: 'spring', stiffness: 80 }}
                className="text-4xl md:text-5xl font-display font-bold text-brand-gold-300 neon-glow-text my-2 animate-pulse-neon select-none"
              >
                &
              </motion.span>
              <div className="flex overflow-hidden py-1">
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
                    className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold metallic-shine select-none"
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
          </motion.div>

          {/* Section 3: Guest Box & Open Button */}
          <motion.div 
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, transition: { duration: 1.1, ease: [0.25, 1, 0.5, 1] } }}
            className="pb-12 px-6 z-10 w-full max-w-sm flex flex-col items-center"
          >
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

            {/* Open Button with ripple/glow */}
            <motion.button
              onClick={handleOpenClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.8 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.04, boxShadow: "0 0 25px rgba(212,175,55,0.45)" }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.94 }}
              className="relative overflow-hidden flex items-center gap-3 bg-gradient-to-r from-brand-gold-600 to-brand-gold-800 hover:from-brand-gold-500 hover:to-brand-gold-700 text-brand-cream-50 font-medium px-8 py-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-brand-gold-400/40 cursor-pointer group transition-all duration-300"
            >
              <AnimatePresence>
                {isOpening && (
                  <motion.span
                    initial={{ scale: 0.3, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-white/25 pointer-events-none"
                  />
                )}
              </AnimatePresence>
              <MailOpen size={18} className="group-hover:rotate-6 transition-transform duration-300 text-brand-cream-50" />
              <span className="tracking-widest text-sm font-semibold uppercase">Buka Undangan</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
