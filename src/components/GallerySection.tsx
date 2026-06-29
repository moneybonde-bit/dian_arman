import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { DiamondDivider } from './Ornament';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const GallerySection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Filter items by category
  const categories = ['Semua', 'Momen Bersama', 'Sesi Pranikah', 'Detail Indah'];
  
  const filteredItems = selectedCategory === 'Semua' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = filteredItems.length > visibleCount;

  // Lightbox handlers
  const openLightbox = (id: string) => {
    // Find index of the item in the currently FILTERED list
    const index = filteredItems.findIndex(item => item.id === id);
    if (index !== -1) {
      setActivePhotoIndex(index);
    }
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const navigateNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredItems.length);
    }
  };

  const navigatePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleToggleMore = () => {
    if (hasMore) {
      setVisibleCount(prev => Math.min(prev + 8, filteredItems.length));
    } else {
      setVisibleCount(8);
      // Optional: scroll back to gallery section top
      const element = document.getElementById('galeri-section-header');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="galeri" className="relative py-20 px-4 bg-brand-cream-100/30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header Galeri */}
        <motion.div
          id="galeri-section-header"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25, scale: prefersReducedMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <p className="text-xs uppercase tracking-[0.2em] font-serif font-bold text-brand-terracotta-600 mb-2">
            Dokumentasi Indah
          </p>
          <h2 className="text-3xl font-display text-brand-burgundy-800">Galeri Foto</h2>
          <div className="w-12 h-1 bg-brand-gold-500 mx-auto mt-3" />
          <p className="text-xs text-brand-burgundy-950/70 mt-3 max-w-sm mx-auto leading-relaxed">
            Momen-momen indah kebersamaan kami yang diabadikan penuh cinta dalam hangatnya tema Modern Adat.
          </p>
        </motion.div>

        {/* 1. CATEGORY FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="flex flex-wrap justify-center gap-2 mb-10 w-full max-w-xl"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleCount(8); // Reset count on filter change
              }}
              className={`text-xs md:text-sm font-semibold tracking-wide px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer min-h-[40px] ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-brand-terracotta-500 to-brand-burgundy-600 text-brand-cream-50 border-transparent shadow-md'
                  : 'bg-brand-cream-50 text-brand-burgundy-800 border-brand-gold-500/15 hover:border-brand-gold-500/30'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* 2. GALLERY GRID */}
        <motion.div 
          layout={!prefersReducedMotion}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 w-full"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout={!prefersReducedMotion}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(item.id)}
                className="relative aspect-[3/4] rounded-xl overflow-hidden group shadow-sm hover:shadow-md cursor-pointer border border-brand-gold-500/10 bg-brand-cream-100/50"
              >
                {/* Image */}
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 select-none"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-brand-burgundy-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="bg-brand-cream-50/95 text-brand-burgundy-800 p-3 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye size={18} className="text-brand-terracotta-500 animate-pulse" />
                  </div>
                </div>

                {/* Subtle label on mobile */}
                <div className="absolute bottom-2 left-2 right-2 bg-brand-burgundy-900/60 backdrop-blur-xs px-2 py-1 rounded text-[10px] text-brand-cream-50 font-medium truncate md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {item.alt}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-12 text-center text-brand-burgundy-900/60 text-sm">
            Tidak ada foto dalam kategori ini.
          </div>
        )}

        {/* 3. SHOW MORE / LESS BUTTON */}
        {filteredItems.length > 8 && (
          <div className="mt-12">
            <button
              onClick={handleToggleMore}
              className="bg-brand-cream-50 hover:bg-brand-cream-100 text-brand-burgundy-800 border border-brand-gold-500/35 font-semibold text-sm tracking-wide px-8 py-3 rounded-full shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 flex items-center gap-2 min-h-[44px]"
            >
              <span>{hasMore ? `Lihat Foto Lainnya (${filteredItems.length - visibleCount} lagi)` : 'Tutup Galeri'}</span>
            </button>
          </div>
        )}

        <div className="w-full max-w-md mt-16">
          <DiamondDivider color="var(--color-brand-terracotta-500)" />
        </div>

        {/* 4. LIGHTBOX MODAL */}
        <AnimatePresence>
          {activePhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-50 bg-brand-burgundy-950/95 flex flex-col items-center justify-center p-4 touch-none select-none"
            >
              {/* Top control bar */}
              <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent z-10 text-brand-cream-50">
                <span className="text-xs md:text-sm font-semibold tracking-widest font-serif text-brand-gold-300">
                  {filteredItems[activePhotoIndex].category} ({activePhotoIndex + 1} / {filteredItems.length})
                </span>
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Image Viewport with gesture container */}
              <div 
                className="relative max-w-3xl max-h-[75vh] w-full flex items-center justify-center"
                onClick={e => e.stopPropagation()}
              >
                <motion.img
                  key={filteredItems[activePhotoIndex].id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={filteredItems[activePhotoIndex].url}
                  alt={filteredItems[activePhotoIndex].alt}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10 shadow-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Left/Right Navigation Buttons (Visible and large on desktop, easily clickable) */}
                <button
                  onClick={navigatePrev}
                  className="absolute left-2 md:-left-16 p-3 rounded-full bg-black/40 hover:bg-black/60 text-brand-cream-50 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={navigateNext}
                  className="absolute right-2 md:-right-16 p-3 rounded-full bg-black/40 hover:bg-black/60 text-brand-cream-50 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Bottom Image Caption */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-center bg-gradient-to-t from-black/60 to-transparent text-brand-cream-50">
                <p className="text-sm font-medium tracking-wide">
                  {filteredItems[activePhotoIndex].alt}
                </p>
                <p className="text-xs text-brand-gold-400/80 mt-1 italic">
                  Gunakan tombol atau sentuh bagian sisi untuk bernavigasi
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
