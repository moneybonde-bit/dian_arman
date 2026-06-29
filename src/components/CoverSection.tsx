import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useTransform } from 'motion/react';
import { MailOpen, ChevronsDown } from 'lucide-react';
import { EthnicMandala } from './Ornament';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useParallax } from '../hooks/useParallax';
import { HERO_IMAGES } from '../data';

interface CoverSectionProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const CoverSection: React.FC<CoverSectionProps> = ({ onOpen, isOpen }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // 3D parallax driver (mouse on desktop, gyroscope on mobile)
  const { x: px, y: py } = useParallax();

  // Depth layers — each transforms at a different rate to build real 3D depth.
  // Negative depth = moves opposite to pointer (further away feeling).
  const fogX = useTransform(px, [-1, 1], [25, -25]);
  const fogY = useTransform(py, [-1, 1], [18, -18]);

  const mandalaX = useTransform(px, [-1, 1], [40, -40]);
  const mandalaY = useTransform(py, [-1, 1], [30, -30]);
  const mandalaRotate = useTransform(px, [-1, 1], [-8, 8]);

  const photoX = useTransform(px, [-1, 1], [-22, 22]);
  const photoY = useTransform(py, [-1, 1], [-16, 16]);

  const titleX = useTransform(px, [-1, 1], [-14, 14]);
  const titleY = useTransform(py, [-1, 1], [-10, 10]);
  const titleRotateY = useTransform(px, [-1, 1], [10, -10]);
  const titleRotateX = useTransform(py, [-1, 1], [-8, 8]);

  const frameX = useTransform(px, [-1, 1], [-8, 8]);
  const frameY = useTransform(py, [-1, 1], [-6, 6]);

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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Names kinetic typography split into characters for stagger animation
  const titleGroom = 'Arman'.split('');
  const titleBride = 'Dian'.split('');

  // Decorative sparkles floating inside the cover for added depth
  const sparkles = Array.from({ length: 14 });

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          id="cover-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-between text-center overflow-hidden bg-brand-burgundy-900"
          style={{ perspective: prefersReducedMotion ? undefined : 1400 }}
          initial={{ y: 0 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { y: '-100%', transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } }
          }
        >
          {/* ============ DEPTH LAYER 0: Base radial vignette ============ */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_40%,#3a0a0e_0%,#260506_55%,#160203_100%)]" />

          {/* ============ DEPTH LAYER 1: Drifting fog / mist ============ */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ x: prefersReducedMotion ? 0 : fogX, y: prefersReducedMotion ? 0 : fogY }}
          >
            <div className="absolute -inset-[20%] opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(229,184,36,0.12),transparent_40%),radial-gradient(circle_at_75%_70%,rgba(153,31,36,0.35),transparent_45%)]" />
            <motion.div
              className="absolute -inset-[30%] opacity-30 mix-blend-screen bg-[radial-gradient(circle_at_50%_50%,rgba(250,212,107,0.10),transparent_55%)]"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* ============ DEPTH LAYER 2: Spinning ethnic mandala ============ */}
          <motion.div
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
            style={{
              x: prefersReducedMotion ? 0 : mandalaX,
              y: prefersReducedMotion ? 0 : mandalaY,
              rotate: prefersReducedMotion ? 0 : mandalaRotate,
            }}
          >
            <div className="w-[150vw] h-[150vw] md:w-[110vh] md:h-[110vh] rounded-full border-[10px] border-brand-gold-500/[0.04] animate-[spin_240s_linear_infinite]" />
            <div className="absolute w-[110vw] h-[110vw] md:w-[80vh] md:h-[80vh] rounded-full border-[2px] border-dashed border-brand-cream-50/[0.05] animate-[spin_120s_linear_infinite_reverse]" />
            <EthnicMandala
              size={520}
              className="absolute opacity-[0.06] text-brand-gold-400 animate-[spin_300s_linear_infinite]"
            />
          </motion.div>

          {/* ============ DEPTH LAYER 3: Hero portrait (closer) ============ */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              x: prefersReducedMotion ? 0 : photoX,
              y: prefersReducedMotion ? 0 : photoY,
              scale: 1.12,
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={activePhotoIdx}
                src={HERO_IMAGES[activePhotoIdx]}
                alt={`Arman & Dian ${activePhotoIdx + 1}`}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                animate={{ opacity: 0.82, scale: 1.16 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1.4, ease: 'easeInOut' },
                  scale: { duration: 8, ease: 'linear' },
                }}
                className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                referrerPolicy="no-referrer"
                draggable={false}
              />
            </AnimatePresence>
            {/* Cinematic gradient overlays for legibility + moody depth */}
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-burgundy-900/85 via-brand-burgundy-900/30 to-black/95" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-brand-burgundy-900/70" />
          </motion.div>

          {/* ============ DEPTH LAYER 4: Floating sparkles ============ */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
              {sparkles.map((_, i) => {
                const size = Math.random() * 4 + 2;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const dur = Math.random() * 4 + 3;
                const delay = Math.random() * 5;
                return (
                  <motion.span
                    key={i}
                    className="absolute rounded-full bg-brand-gold-300"
                    style={{
                      width: size,
                      height: size,
                      left: `${left}%`,
                      top: `${top}%`,
                      boxShadow: '0 0 6px 1px rgba(250,212,107,0.7)',
                    }}
                    animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4], y: [0, -25, 0] }}
                    transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut' }}
                  />
                );
              })}
            </div>
          )}

          {/* ============ DEPTH LAYER 5: Ornate gold frame border ============ */}
          <motion.div
            className="absolute inset-3 sm:inset-5 z-[2] pointer-events-none rounded-[28px] border border-brand-gold-500/25"
            style={{ x: prefersReducedMotion ? 0 : frameX, y: prefersReducedMotion ? 0 : frameY }}
          >
            <div className="absolute inset-[6px] rounded-[22px] border border-brand-gold-500/10" />
            {/* Corner diamonds */}
            {(['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'] as const).map(
              (pos) => (
                <div
                  key={pos}
                  className={`absolute ${pos} w-2.5 h-2.5 rotate-45 bg-brand-gold-400/70 shadow-[0_0_8px_rgba(250,212,107,0.6)]`}
                />
              )
            )}
          </motion.div>

          {/* ============ FOREGROUND CONTENT (translateZ for true 3D) ============ */}

          {/* Section 1: Top Branding */}
          <motion.div
            className="pt-12 sm:pt-16 px-4 z-10 w-full"
            style={{ x: prefersReducedMotion ? 0 : titleX, y: prefersReducedMotion ? 0 : titleY }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.6 }}
              animate={{ opacity: 0.9, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
              className="flex justify-center mb-4"
            >
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: [0, 4, -4, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <EthnicMandala size={46} className="text-brand-gold-400 drop-shadow-[0_0_12px_rgba(229,184,36,0.5)]" />
              </motion.div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: -10, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.25em' }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xs sm:text-sm md:text-base uppercase font-serif font-semibold text-brand-gold-300 drop-shadow-md mb-1"
            >
              UNDANGAN
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -10, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.25em' }}
              transition={{ delay: 0.55, duration: 1 }}
              className="text-xs sm:text-sm md:text-base uppercase font-serif font-semibold text-brand-gold-300 drop-shadow-md"
            >
              PERNIKAHAN
            </motion.p>
          </motion.div>

          {/* Section 2: Couple Name with 3D tilt */}
          <motion.div
            className="my-auto py-6 px-4 z-10 flex flex-col items-center w-full"
            style={{
              x: prefersReducedMotion ? 0 : titleX,
              y: prefersReducedMotion ? 0 : titleY,
              rotateX: prefersReducedMotion ? 0 : titleRotateX,
              rotateY: prefersReducedMotion ? 0 : titleRotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Kinetic Typography - Name Reveal */}
            <div
              className="flex flex-col items-center justify-center"
              style={{ transform: prefersReducedMotion ? undefined : 'translateZ(60px)' }}
            >
              <div className="flex overflow-hidden">
                {titleGroom.map((char, index) => (
                  <motion.span
                    key={`g-${index}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.8 + index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-gradient-to-b from-brand-gold-200 via-brand-gold-300 to-brand-gold-500 bg-clip-text text-transparent text-6xl sm:text-7xl md:text-8xl font-display drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <motion.span
                initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.35, type: 'spring', stiffness: 90, damping: 9 }}
                className="text-4xl md:text-5xl font-display text-brand-terracotta-300 my-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              >
                &
              </motion.span>
              <div className="flex overflow-hidden">
                {titleBride.map((char, index) => (
                  <motion.span
                    key={`b-${index}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 1.45 + index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-gradient-to-b from-brand-gold-200 via-brand-gold-300 to-brand-gold-500 bg-clip-text text-transparent text-6xl sm:text-7xl md:text-8xl font-display drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Animated gold divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.8 }}
              transition={{ delay: 2.1, duration: 0.9, ease: 'easeOut' }}
              className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold-400 to-transparent my-5"
            />

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.95, y: 0 }}
              transition={{ delay: 2.3, duration: 0.8 }}
              className="text-sm md:text-base tracking-[0.3em] font-semibold font-serif text-brand-cream-100 drop-shadow-md"
            >
              25 JULI 2026
            </motion.p>
          </motion.div>

          {/* Section 3: Guest Box & Open Button */}
          <div className="pb-10 sm:pb-12 px-6 z-10 w-full max-w-sm flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="bg-black/35 backdrop-blur-md border border-brand-gold-500/30 px-6 py-5 rounded-2xl shadow-2xl w-full mb-6 relative overflow-hidden"
            >
              {/* Shimmer sweep */}
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-brand-gold-200/10 to-transparent skew-x-12"
                  animate={{ x: ['0%', '320%'] }}
                  transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                />
              )}
              {/* Corner gold highlights */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-gold-400/60 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-gold-400/60 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-gold-400/60 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-gold-400/60 rounded-br-lg" />

              <p className="text-[10px] uppercase tracking-widest text-brand-cream-50/70 font-medium mb-1.5">
                Kpd. Yth. Bapak/Ibu/Saudara/i:
              </p>
              <h2 className="text-xl font-display font-semibold text-brand-gold-200 tracking-wide line-clamp-2 drop-shadow-sm">
                {guestName}
              </h2>
              <p className="text-[9px] text-brand-cream-50/50 mt-1.5 italic font-light">
                *Mohon maaf bila ada salah penulisan nama/gelar
              </p>
            </motion.div>

            {/* Open Button with pulsing glow */}
            <motion.button
              onClick={onOpen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.8 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.06 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              className="relative flex items-center gap-3 bg-gradient-to-r from-brand-gold-600 via-brand-gold-500 to-brand-gold-700 text-brand-burgundy-900 font-bold px-9 py-4 rounded-full shadow-[0_0_25px_rgba(229,184,36,0.4)] border border-brand-gold-300/50 cursor-pointer group overflow-hidden"
            >
              {!prefersReducedMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full ring-2 ring-brand-gold-300/50"
                  animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <MailOpen
                size={18}
                className="group-hover:rotate-6 transition-transform duration-300 relative z-10"
              />
              <span className="tracking-widest text-sm font-bold uppercase relative z-10">
                Buka Undangan
              </span>
            </motion.button>

            {/* Scroll / tap hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 0.7 } : { opacity: [0, 0.7, 0.7], y: [0, 6, 0] }}
              transition={
                prefersReducedMotion
                  ? { delay: 3 }
                  : { delay: 3, duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }
              className="mt-5 flex flex-col items-center text-brand-gold-300/70"
            >
              <ChevronsDown size={18} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
