import React from 'react';
import { motion } from 'motion/react';
import { BRIDE_GROOM, DOA_HARAPAN } from '../data';
import { DiamondDivider, EthnicMandala, CornerOrnament } from './Ornament';
import { Tilt } from './Tilt';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const ProfileSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Define transition variables based on reduced motion setting
  const initialOffset = prefersReducedMotion ? 0 : 25;
  const slideUpVariants = {
    hidden: { opacity: 0, y: initialOffset, scale: prefersReducedMotion ? 1 : 0.98 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : custom * 0.15,
        duration: 0.8,
        ease: 'easeOut'
      }
    })
  };

  return (
    <section id="mempelai" className="relative py-20 px-6 max-w-4xl mx-auto flex flex-col items-center">
      {/* Delicate background motif */}
      <div className="absolute top-10 left-10 opacity-5 pointer-events-none text-brand-terracotta-500">
        <EthnicMandala size={120} />
      </div>

      {/* 1. DOA & HARAPAN (Tampil di bagian awal) */}
      <motion.div
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideUpVariants}
        className="w-full max-w-2xl text-center mb-16 px-4 py-8 bg-brand-cream-100/50 rounded-2xl border border-brand-gold-500/15 relative overflow-hidden"
      >
        <CornerOrnament />
        <span className="text-4xl text-brand-gold-500 font-display italic">“</span>
        <p className="text-brand-burgundy-900/90 font-display italic text-base md:text-lg leading-relaxed px-4 md:px-8 -mt-2">
          {DOA_HARAPAN}
        </p>
        <span className="text-4xl text-brand-gold-500 font-display italic block text-right mt-2 mr-4">”</span>
        <DiamondDivider size={12} className="opacity-70 mt-2" />
      </motion.div>

      {/* Header Mempelai */}
      <motion.div
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideUpVariants}
        className="text-center mb-12"
      >
        <p className="text-xs uppercase tracking-[0.2em] font-serif font-bold text-brand-terracotta-600 mb-2">
          Mempelai Yang Berbahagia
        </p>
        <h2 className="text-3xl font-display text-brand-burgundy-800">Mempelai Pengantin</h2>
        <div className="w-12 h-1 bg-brand-gold-500 mx-auto mt-3" />
      </motion.div>

      {/* 2. PROFIL KEDUA PENGANTIN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full max-w-3xl items-start relative">
        
        {/* Subtle decorative "AND" or "&" between column layouts in desktop */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div className="bg-brand-cream-50 px-3 py-2 border border-brand-gold-500/20 rounded-full text-brand-gold-500 font-serif italic text-xl shadow-md z-10">
            &
          </div>
        </div>

        {/* Mempelai Pria */}
        <Tilt className="flex flex-col relative w-full max-w-[280px]">
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideUpVariants}
            className="flex flex-col items-center text-center bg-brand-cream-100/30 p-6 rounded-2xl border border-brand-gold-500/10 hover:border-brand-gold-500/20 transition-colors duration-300 shadow-sm relative"
          >
            {/* Portrait Framed */}
            <div className="relative w-40 h-52 mb-6 rounded-t-full overflow-hidden border-2 border-brand-gold-500 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"
                alt={BRIDE_GROOM.groom.fullName}
                className="w-full h-full object-cover select-none"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-900/20 to-transparent" />
            </div>

            <h3 className="text-2xl font-display font-semibold text-brand-burgundy-800">
              {BRIDE_GROOM.groom.fullName}
            </h3>
            <p className="text-sm font-serif italic font-medium text-brand-terracotta-600 mt-1">
              ({BRIDE_GROOM.groom.shortName})
            </p>

            <div className="w-8 h-[1px] bg-brand-gold-500/60 my-3" />

            <p className="text-xs text-brand-burgundy-950 font-medium">
              {BRIDE_GROOM.groom.childOf} dari pasangan:
            </p>
            <p className="text-sm font-semibold text-brand-burgundy-900 mt-1">
              {BRIDE_GROOM.groom.parents}
            </p>
          </motion.div>
        </Tilt>

        {/* Mempelai Wanita */}
        <Tilt className="flex flex-col relative w-full max-w-[280px]">
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideUpVariants}
            className="flex flex-col items-center text-center bg-brand-cream-100/30 p-6 rounded-2xl border border-brand-gold-500/10 hover:border-brand-gold-500/20 transition-colors duration-300 shadow-sm relative"
          >
            {/* Portrait Framed */}
            <div className="relative w-40 h-52 mb-6 rounded-t-full overflow-hidden border-2 border-brand-gold-500 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
                alt={BRIDE_GROOM.bride.fullName}
                className="w-full h-full object-cover select-none"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-900/20 to-transparent" />
            </div>

            <h3 className="text-2xl font-display font-semibold text-brand-burgundy-800">
              {BRIDE_GROOM.bride.fullName}
            </h3>
            <p className="text-sm font-serif italic font-medium text-brand-terracotta-600 mt-1">
              ({BRIDE_GROOM.bride.shortName})
            </p>

            <div className="w-8 h-[1px] bg-brand-gold-500/60 my-3" />

            <p className="text-xs text-brand-burgundy-950 font-medium">
              {BRIDE_GROOM.bride.childOf} dari pasangan:
            </p>
            <p className="text-sm font-semibold text-brand-burgundy-900 mt-1">
              {BRIDE_GROOM.bride.parents}
            </p>
          </motion.div>
        </Tilt>
        
      </div>

      <div className="w-full max-w-md my-6">
        <DiamondDivider color="var(--color-brand-terracotta-500)" />
      </div>
    </section>
  );
};
