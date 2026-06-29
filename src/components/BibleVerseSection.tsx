import React from 'react';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { BIBLE_VERSE } from '../data';
import { DiamondDivider, CornerOrnament } from './Ornament';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const BibleVerseSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Offset transitions based on reduced-motion preference
  const initialOffset = prefersReducedMotion ? 0 : 25;

  return (
    <section id="ayat" className="py-24 px-6 bg-brand-cream-50 relative overflow-hidden flex flex-col items-center">
      {/* Background delicate traditional details */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
        <div className="w-[120vw] h-[120vw] rounded-full border border-brand-burgundy-900 animate-[spin_300s_linear_infinite]" />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: initialOffset, scale: prefersReducedMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-gradient-to-br from-brand-cream-100 to-brand-cream-50/70 border border-brand-gold-500/25 p-8 md:p-12 rounded-3xl shadow-lg relative overflow-hidden"
        >
          <CornerOrnament />

          {/* Book icon container */}
          <div className="mx-auto w-12 h-12 rounded-full bg-brand-terracotta-50 flex items-center justify-center text-brand-terracotta-600 mb-6 border border-brand-gold-500/20 shadow-sm">
            <BookOpen size={20} />
          </div>

          {/* Bible Quote */}
          <span className="text-3xl text-brand-gold-600 font-display italic block mb-2">“</span>
          <p className="text-brand-burgundy-900 text-base md:text-lg leading-relaxed font-display italic px-2 md:px-6">
            {BIBLE_VERSE.text}
          </p>
          <span className="text-3xl text-brand-gold-600 font-display italic block mt-2 text-right">”</span>

          <div className="w-24 h-[1px] bg-brand-gold-500/30 mx-auto my-6" />

          {/* Passage Reference */}
          <p className="text-xs uppercase tracking-[0.2em] font-serif font-bold text-brand-terracotta-700">
            {BIBLE_VERSE.passage}
          </p>
        </motion.div>

        <div className="w-full max-w-md mt-16">
          <DiamondDivider color="var(--color-brand-terracotta-500)" />
        </div>
      </div>
    </section>
  );
};
