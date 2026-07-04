import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Image as ImageIcon, Heart, Users, ChevronUp, CalendarCheck, Play, Pause } from 'lucide-react';
import { LoadingScreen } from './components/LoadingScreen';
import { CoverSection } from './components/CoverSection';
import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { EventSection } from './components/EventSection';
import { BibleVerseSection } from './components/BibleVerseSection';
import { GallerySection } from './components/GallerySection';
import { RsvpSection } from './components/RsvpSection';
import { GiftSection } from './components/GiftSection';
import { ClosingSection } from './components/ClosingSection';
import { MusicPlayer, MusicPlayerHandle } from './components/MusicPlayer';
import { FloatingParticles } from './components/FloatingParticles';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const musicRef = useRef<MusicPlayerHandle | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const autoScrollRef = useRef<number | null>(null);

  // Smooth Auto scroll loop
  useEffect(() => {
    if (isAutoScrolling && isOpen) {
      let lastTime = performance.now();
      const scrollSpeed = 0.035;

      const scrollStep = (now: number) => {
        const delta = now - lastTime;
        lastTime = now;

        const currentScroll = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (currentScroll >= maxScroll - 1) {
          setIsAutoScrolling(false);
        } else {
          window.scrollBy(0, scrollSpeed * delta);
          autoScrollRef.current = requestAnimationFrame(scrollStep);
        }
      };

      autoScrollRef.current = requestAnimationFrame(scrollStep);
    } else {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    }

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, isOpen]);

  // Pause auto scrolling when user interacts manually
  useEffect(() => {
    if (!isAutoScrolling) return;

    const handleUserInteraction = () => setIsAutoScrolling(false);

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });
    window.addEventListener('mousedown', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [isAutoScrolling]);

  const lastScrollY = useRef(0);

  const handleOpenInvitation = () => {
    // Reset scroll position — prevents stale history scroll position on reload
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    setIsOpen(true);
    // Play music synchronously within the click event stack (required for iOS Safari autoplay policy)
    if (musicRef.current) {
      musicRef.current.play();
    }
  };

  useEffect(() => {
    if (isLoading || !isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isLoading]);

  // Track scroll progress and UI element visibility
  useEffect(() => {
    if (!isOpen || isLoading) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const totalScrollable = documentHeight - windowHeight;
      const progress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
      setScrollProgress(progress);

      setShowScrollTop(scrollTop > windowHeight * 0.5);
      setShowBottomNav(true);

      lastScrollY.current = scrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, isLoading]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream-50 selection:bg-brand-terracotta-200 selection:text-brand-burgundy-900 overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* 1. COVER OVERLAY (locks scroll until click) */}
          <CoverSection isOpen={isOpen} onOpen={handleOpenInvitation} />

          {/* 2. BACKGROUND MUSIC CONTROLLER */}
          <MusicPlayer ref={musicRef} />

          {/* 2.2 AUTO SCROLL TOGGLE */}
          {isOpen && (
            <div className="fixed top-[calc(74px+env(safe-area-inset-top))] right-4 z-40">
              <button
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className={`flex items-center justify-center gap-2.5 bg-brand-cream-50/95 backdrop-blur-md border ${
                  isAutoScrolling
                    ? 'border-brand-gold-500 bg-brand-burgundy-950 text-brand-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'border-brand-gold-500/35 text-brand-burgundy-800'
                } py-2 px-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[44px] cursor-pointer`}
                title={isAutoScrolling ? 'Hentikan Scroll Otomatis' : 'Mulai Scroll Otomatis'}
                id="auto-scroll-toggle-btn"
              >
                <div className="w-5 h-5 flex items-center justify-center relative">
                  {isAutoScrolling ? (
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-brand-gold-400"
                    >
                      <Pause size={14} />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-brand-terracotta-500"
                    >
                      <Play size={14} className="ml-[1px]" />
                    </motion.div>
                  )}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider pr-1">
                  {isAutoScrolling ? 'Pause Scroll' : 'Auto Scroll'}
                </span>
              </button>
            </div>
          )}

          {/* 2.5 FLOATING PARTICLES */}
          {isOpen && <FloatingParticles />}

          {/* 3. STICKY TOP SCROLL PROGRESS BAR */}
          {isOpen && (
            <div className="fixed top-0 left-0 right-0 h-[3px] bg-brand-cream-100/50 z-40">
              <div
                className="h-full bg-gradient-to-r from-brand-terracotta-500 via-brand-gold-500 to-brand-burgundy-600 transition-all duration-75"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          )}

          {/* 4. MAIN INVITATION SECTIONS
               NOTE: filter/transform on this element would create a CSS containing block,
               making position:fixed children inside anchor to this element instead of the
               viewport. Bottom nav and scroll-top are placed OUTSIDE this element below. */}
          {isOpen && (
            <motion.main
              id="main-invitation-content"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 40, scale: 0.98 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
              className="w-full relative pb-24"
            >
              {/* Decorative vertical side text (large screens only) */}
              <div className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-20 text-brand-gold-700/35 uppercase tracking-[0.3em] font-serif text-[10px] [writing-mode:vertical-lr] select-none pointer-events-none">
                Arman Kanaf • Dian Hezedila Sharon
              </div>
              <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-20 text-brand-gold-700/35 uppercase tracking-[0.3em] font-serif text-[10px] [writing-mode:vertical-lr] select-none rotate-180 pointer-events-none">
                GKST JEMAAT IMANUEL PARIGI
              </div>

              <HeroSection />
              <ProfileSection />
              <EventSection />
              <BibleVerseSection />
              <GallerySection />
              <RsvpSection />
              <GiftSection />
              <ClosingSection />
            </motion.main>
          )}

          {/* 5. FLOATING BOTTOM NAVIGATION DOCK
               Placed OUTSIDE motion.main — avoids the CSS containing-block issue where
               filter/transform on a parent traps position:fixed children to that parent. */}
          <AnimatePresence>
            {isOpen && showBottomNav && (
              <motion.div
                initial={{ y: 80, opacity: 0, x: '-50%' }}
                animate={{ y: 0, opacity: 1, x: '-50%' }}
                exit={{ y: 80, opacity: 0, x: '-50%' }}
                transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-30 w-[94%] max-w-lg rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Gold accent line at top */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold-500/70 to-transparent" />
                <div className="bg-brand-cream-50/92 backdrop-blur-md border border-t-0 border-brand-gold-500/20 py-2 px-1 flex justify-around items-center">
                  {/* Mempelai */}
                  <button
                    onClick={() => scrollToSection('mempelai')}
                    className="flex flex-col items-center gap-0.5 text-brand-burgundy-900/70 hover:text-brand-terracotta-600 cursor-pointer transition-colors p-1 flex-1"
                  >
                    <Heart size={18} className="text-brand-terracotta-500" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Mempelai</span>
                  </button>

                  {/* Acara */}
                  <button
                    onClick={() => scrollToSection('acara')}
                    className="flex flex-col items-center gap-0.5 text-brand-burgundy-900/70 hover:text-brand-terracotta-600 cursor-pointer transition-colors p-1 flex-1"
                  >
                    <MapPin size={18} className="text-brand-terracotta-500" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Acara</span>
                  </button>

                  {/* Galeri */}
                  <button
                    onClick={() => scrollToSection('galeri')}
                    className="flex flex-col items-center gap-0.5 text-brand-burgundy-900/70 hover:text-brand-terracotta-600 cursor-pointer transition-colors p-1 flex-1"
                  >
                    <ImageIcon size={18} className="text-brand-terracotta-500" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Galeri</span>
                  </button>

                  {/* RSVP */}
                  <button
                    onClick={() => scrollToSection('rsvp')}
                    className="flex flex-col items-center gap-0.5 text-brand-burgundy-900/70 hover:text-brand-terracotta-600 cursor-pointer transition-colors p-1 flex-1"
                  >
                    <CalendarCheck size={18} className="text-brand-terracotta-500" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">RSVP</span>
                  </button>

                  {/* Keluarga */}
                  <button
                    onClick={() => scrollToSection('penutup')}
                    className="flex flex-col items-center gap-0.5 text-brand-burgundy-900/70 hover:text-brand-terracotta-600 cursor-pointer transition-colors p-1 flex-1"
                  >
                    <Users size={18} className="text-brand-terracotta-500" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Keluarga</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 6. FLOATING SCROLL TO TOP BUTTON */}
          <AnimatePresence>
            {isOpen && showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 z-30 p-3 rounded-full bg-brand-burgundy-700 hover:bg-brand-burgundy-800 text-brand-cream-50 shadow-lg cursor-pointer border border-brand-gold-500/20 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Scroll to top"
              >
                <ChevronUp size={20} className="text-brand-gold-300" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
