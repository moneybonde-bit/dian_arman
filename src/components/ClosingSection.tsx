import React from 'react';
import { motion } from 'motion/react';
import { FAMILIES } from '../data';
import { DiamondDivider, EthnicMandala, CornerOrnament } from './Ornament';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const ClosingSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Offset transitions based on reduced-motion preference
  const initialOffset = prefersReducedMotion ? 0 : 25;

  return (
    <section id="penutup" className="py-24 px-6 bg-brand-cream-50 relative overflow-hidden flex flex-col items-center">
      {/* Delicate background decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-terracotta-600 via-brand-gold-500 to-brand-burgundy-700" />
      
      {/* Background mandala accent */}
      <div className="absolute -bottom-16 opacity-5 text-brand-gold-500 pointer-events-none select-none">
        <EthnicMandala size={220} />
      </div>

      <div className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center">
        
        {/* Subtle ethnic motif icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <EthnicMandala size={64} />
        </motion.div>

        {/* Salutation Text */}
        <motion.div
          initial={{ opacity: 0, y: initialOffset, scale: prefersReducedMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="max-w-xl mb-12"
        >
          <h3 className="text-xl md:text-2xl font-display text-brand-burgundy-800 leading-relaxed mb-4">
            Terima Kasih
          </h3>
          <p className="text-sm text-brand-burgundy-950/80 leading-relaxed">
            Kehadiran dan doa restu Bapak/Ibu/Saudara/i sekalian sangat berarti bagi kami dalam memulai lembaran baru pernikahan yang kudus ini. Kiranya Tuhan melimpahkan berkat-Nya bagi kita semua.
          </p>
        </motion.div>

        {/* Family names card */}
        <motion.div
          initial={{ opacity: 0, y: initialOffset, scale: prefersReducedMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="w-full max-w-3xl bg-brand-cream-100/60 border border-brand-gold-500/20 rounded-3xl p-8 md:p-12 relative shadow-md"
        >
          <CornerOrnament />

          <p className="text-sm font-serif italic text-brand-terracotta-600 mb-2 font-medium">
            Dengan kasih dan sukacita dalam Tuhan,
          </p>
          <h4 className="text-lg md:text-xl font-display font-semibold text-brand-burgundy-800 uppercase tracking-wider mb-8">
            Hormat Kami Keluarga Besar
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start text-center md:text-left">
            {FAMILIES.map(group => (
              <div key={group.side} className="flex flex-col items-center md:items-stretch">
                <p className="text-xs uppercase tracking-widest text-brand-terracotta-600 font-bold mb-4 border-b border-brand-gold-500/20 pb-2 text-center">
                  {group.title}
                </p>
                <ul className="space-y-3 text-center">
                  {group.names.map((name, i) => (
                    <li
                      key={i}
                      className="text-sm font-semibold text-brand-burgundy-900 leading-snug hover:text-brand-terracotta-600 transition-colors duration-200"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Small creative credit footer */}
        <p className="text-[10px] text-brand-burgundy-500/50 uppercase tracking-widest mt-16 font-semibold">
          Arman & Dian • 25.07.2026
        </p>
      </div>
    </section>
  );
};
