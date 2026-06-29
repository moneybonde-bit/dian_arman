import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAMILIES } from '../data';
import { DiamondDivider, EthnicMandala, CornerOrnament } from './Ornament';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { Heart, Sparkles, Users, ChevronLeft, ChevronRight } from 'lucide-react';

export const ClosingSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [page, setPage] = useState([0, 0]);

  // Offset transitions based on reduced-motion preference
  const initialOffset = prefersReducedMotion ? 0 : 25;

  const cards = [
    {
      id: 0,
      title: "Hormat Kami Keluarga Besar",
      subtitle: "Dengan Kasih & Sukacita dalam Tuhan",
      icon: <Heart className="w-8 h-8 text-brand-terracotta-500 fill-brand-terracotta-500/20" />,
      accentColor: "border-brand-terracotta-500/30",
      bgGradient: "from-brand-terracotta-500/5 to-transparent",
      content: (
        <div className="flex flex-col items-center justify-center py-4 px-2">
          <EthnicMandala size={72} className="text-brand-gold-500 mb-5 animate-pulse" />
          <p className="text-sm md:text-base text-brand-burgundy-950/85 leading-relaxed max-w-lg italic font-medium text-center">
            "Kehadiran dan untaian doa restu Bapak/Ibu/Saudara/i sekalian adalah berkah terindah bagi kami berdua. Rasa hormat dan sukacita yang mendalam dari seluruh kerabat keluarga besar kami haturkan."
          </p>
        </div>
      )
    },
    {
      id: 1,
      title: "Keluarga Besar Mempelai Pria",
      subtitle: "Keluarga Besar Arman Kanaf",
      icon: <Sparkles className="w-8 h-8 text-brand-gold-500" />,
      accentColor: "border-brand-gold-500/30",
      bgGradient: "from-brand-gold-500/5 to-transparent",
      names: FAMILIES.find(f => f.side === 'groom')?.names || []
    },
    {
      id: 2,
      title: "Keluarga Besar Mempelai Wanita",
      subtitle: "Keluarga Besar Dian Hezedila Sharon",
      icon: <Users className="w-8 h-8 text-brand-burgundy-600" />,
      accentColor: "border-brand-burgundy-500/30",
      bgGradient: "from-brand-burgundy-500/5 to-transparent",
      names: FAMILIES.find(f => f.side === 'bride')?.names || []
    }
  ];

  const activeIdx = ((page[0] % cards.length) + cards.length) % cards.length;

  const paginate = (newDirection: number) => {
    if (prefersReducedMotion) {
      setPage([activeIdx + newDirection, 0]);
    } else {
      setPage([page[0] + newDirection, newDirection]);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 28 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 28 },
        opacity: { duration: 0.35 }
      }
    })
  };

  const handleDragEnd = (e: any, info: any) => {
    const threshold = 40;
    if (info.offset.x < -threshold) {
      paginate(1);
    } else if (info.offset.x > threshold) {
      paginate(-1);
    }
  };

  const currentCard = cards[activeIdx];

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
          className="max-w-xl mb-10"
        >
          <h3 className="text-xl md:text-2xl font-display text-brand-burgundy-800 leading-relaxed mb-4">
            Terima Kasih
          </h3>
          <p className="text-sm text-brand-burgundy-950/80 leading-relaxed">
            Kehadiran dan doa restu Bapak/Ibu/Saudara/i sekalian sangat berarti bagi kami dalam memulai lembaran baru pernikahan yang kudus ini. Kiranya Tuhan melimpahkan berkat-Nya bagi kita semua.
          </p>
        </motion.div>

        {/* Swipe instructions for users */}
        <p className="text-[10px] uppercase tracking-widest text-brand-terracotta-600 font-bold mb-3 flex items-center gap-1.5 animate-pulse">
          <span>← Geser kartu atau klik tombol di bawah →</span>
        </p>

        {/* Swipeable cards container */}
        <div className="relative w-full max-w-2xl px-1 sm:px-4 md:px-0 mb-8 min-h-[460px] flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-1 md:-left-16 z-20 bg-brand-cream-50/90 hover:bg-brand-cream-100 border border-brand-gold-500/30 text-brand-burgundy-800 p-2.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Previous card"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Swiping Card Frame */}
          <div className="w-full h-full min-h-[420px] relative overflow-hidden rounded-3xl">
            <AnimatePresence initial={false} custom={page[1]} mode="wait">
              <motion.div
                key={activeIdx}
                custom={page[1]}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className={`w-full min-h-[420px] bg-gradient-to-b ${currentCard.bgGradient} bg-brand-cream-100/70 border-2 ${currentCard.accentColor} rounded-3xl p-6 sm:p-10 md:p-12 shadow-lg relative flex flex-col justify-between items-center select-none cursor-grab active:cursor-grabbing`}
              >
                <CornerOrnament />

                {/* Top Card Icon & Subtitle */}
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-brand-cream-50 rounded-full border border-brand-gold-500/15 shadow-sm mb-3">
                    {currentCard.icon}
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brand-terracotta-600 mb-1">
                    {currentCard.subtitle}
                  </p>
                  <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-brand-burgundy-800 uppercase tracking-wide text-center">
                    {currentCard.title}
                  </h4>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 w-full flex items-center justify-center my-6">
                  {currentCard.content ? (
                    currentCard.content
                  ) : (
                    <ul className="space-y-4 text-center w-full max-w-md">
                      {currentCard.names?.map((name, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="text-sm sm:text-base font-bold text-brand-burgundy-900 leading-snug hover:text-brand-terracotta-600 transition-colors duration-200"
                        >
                          {name}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Traditional motif watermark bottom corner */}
                <div className="text-[10px] font-semibold text-brand-burgundy-950/40 uppercase tracking-widest">
                  Adat Nuance • Card {activeIdx + 1} of {cards.length}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-1 md:-right-16 z-20 bg-brand-cream-50/90 hover:bg-brand-cream-100 border border-brand-gold-500/30 text-brand-burgundy-800 p-2.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Next card"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Carousel Pagination dots */}
        <div className="flex items-center gap-2.5 mb-6">
          {cards.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                const diff = dotIdx - activeIdx;
                if (diff !== 0) {
                  paginate(diff);
                }
              }}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIdx === dotIdx
                  ? 'w-7 bg-brand-terracotta-500'
                  : 'w-2.5 bg-brand-gold-500/30 hover:bg-brand-gold-500/50'
              }`}
              title={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Small creative credit footer */}
        <p className="text-[10px] text-brand-burgundy-500/50 uppercase tracking-widest mt-8 font-semibold">
          Arman & Dian • 25.07.2026
        </p>

        {/* Luxavian Studio Copyright Footer */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.40, y: 0 }}
          whileHover={{ opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
          className="mt-14 pb-12 flex flex-col items-center justify-center select-none transition-opacity duration-300"
        >
          <p className="text-[11px] font-sans tracking-[0.18em] uppercase text-brand-burgundy-950 font-bold">
            © <a 
                href="https://luxavian-studio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-gold-600 transition-all duration-300 hover:underline underline-offset-4 decoration-brand-gold-500"
              >
                Luxavian Studio
              </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

