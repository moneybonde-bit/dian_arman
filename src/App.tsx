import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Image as ImageIcon, Heart, Users, BookOpen, ChevronUp, Gift, CalendarCheck } from 'lucide-react';
import { LoadingScreen } from './components/LoadingScreen';
import { CoverSection } from './components/CoverSection';
import { ProfileSection } from './components/ProfileSection';
import { EventSection } from './components/EventSection';
import { BibleVerseSection } from './components/BibleVerseSection';
import { GallerySection } from './components/GallerySection';
import { GiftSection } from './components/GiftSection';
import { RsvpSection } from './components/RsvpSection';
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
  const lastScrollY = useRef(0);

  // Handle invitation open state and body scroll locking
  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Smooth scroll to the content once unlocked, timed perfectly with the premium sequence
    setTimeout(() => {
      const element = document.getElementById('main-invitation-content');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);

    // Play music immediately within the user-interaction click event stack
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

  // Track scroll progress, scroll-to-top button visibility, and dynamic navigation dock show/hide
  useEffect(() => {
    if (!isOpen || isLoading) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const totalScrollable = documentHeight - windowHeight;
      const progress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
      setScrollProgress(progress);

      // Scroll To Top visibility
      if (scrollTop > windowHeight * 0.5) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Hide bottom nav when scrolling down past 120px, show when scrolling up
      if (scrollTop > 120) {
        if (scrollTop > lastScrollY.current) {
          setShowBottomNav(false);
        } else {
          setShowBottomNav(true);
        }
      } else {
        setShowBottomNav(true);
      }
      
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
          {/* 1. COVER OVERLAY (Locks scroll until click) */}
          <CoverSection isOpen={isOpen} onOpen={handleOpenInvitation} />

          {/* 2. BACKGROUND MUSIC CONTROLLER (Starts playing once cover is opened) */}
          <MusicPlayer ref={musicRef} autoStart={isOpen} />

          {/* 2.5 FLYING/MOVING PARTICLES (3D EFFECT BACKGROUND) */}
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

          {/* 4. MAIN INVITATION SECTIONS */}
          {isOpen && (
            <motion.main
              id="main-invitation-content"
              initial={prefersReducedMotion ? {} : { opacity: 0, filter: 'blur(8px)', y: 40, scale: 0.98 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
              className="w-full relative pb-24"
            >
              
              {/* Decorative Floating Frame Accent (Left/Right margins for large screens) */}
              <div className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-20 text-brand-gold-700/35 uppercase tracking-[0.3em] font-serif text-[10px] [writing-mode:vertical-lr] select-none pointer-events-none">
                Arman Kanaf • Dian Hezedila Sharon
              </div>
              <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-20 text-brand-gold-700/35 uppercase tracking-[0.3em] font-serif text-[10px] [writing-mode:vertical-lr] select-none rotate-180 pointer-events-none">
                GKST JEMAAT IMANUEL PARIGI
              </div>

              {/* Section 1: Bride & Groom Profiles */}
              <ProfileSection />

              {/* Section 2: Event Details */}
              <EventSection />

              {/* Section 3: Bible Scripture Verse */}
              <BibleVerseSection />

              {/* Section 4: Photo Gallery with Lightbox */}
              <GallerySection />

              {/* Section 5: Digital Wedding Gift */}
              <GiftSection />

              {/* Section 6: RSVP Attendance Form & Wishes Board */}
              <RsvpSection />

              {/* Section 7: Closing Greetings & Family Names */}
              <ClosingSection />

              {/* 5. FLOATING MOBILE-FRIENDLY BOTTOM MENU DOCK */}
              <AnimatePresence>
                {showBottomNav && (
                  <motion.div
                    initial={{ y: 80, opacity: 0, x: '-50%' }}
                    animate={{ y: 0, opacity: 1, x: '-50%' }}
                    exit={{ y: 80, opacity: 0, x: '-50%' }}
                    transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                    className="fixed bottom-4 left-1/2 z-30 w-[94%] max-w-lg bg-brand-cream-50/90 backdrop-blur-md border border-brand-gold-500/25 rounded-2xl shadow-xl py-2 px-1 flex justify-around items-center"
                  >
                    {/* Mempelai */}
                    <button
                      onClick={() => scrollToSection('mempelai')}
                      className="flex flex-col items-center gap-0.5 text-brand-burgundy-900/70 hover:text-brand-terracotta-600 cursor-pointer transition-colors p-1 flex-1"
                    >
                      <Heart size={16} className="text-brand-terracotta-500" />
                      <span className="text-[9px] font-bold uppercase tracking-wider block sm:inline">Mempelai</span>
                    </button>

                    {/* Acara */}
                    <button
                      onClick={() => scrollToSection('acara')}
                      className="flex flex-col items-center gap-0.5 text-brand-burgundy-900/70 hover:text-brand-terracotta-600 cursor-pointer transition-colors p-1 flex-1"
                    >
                      <MapPin size={16} className="text-brand-terracotta-500" />
                      <span className="text-[9px] font-bold uppercase tracking-wider block sm:inline">Acara</span>
                    </button>

                    {/* Galeri */}
                    <button
                      onClick={() => scrollToSection('galeri')}
                      className="flex flex-col items-center gap-0.5 text-brand-burgundy-900/70 hover:text-brand-terracotta-600 cursor-pointer transition-colors p-1 flex-1"
                    >
                      <ImageIcon size={16} className="text-brand-terracotta-500" />
                      <span className="text-[9px] font-bold uppercase tracking-wider block sm:inline">Galeri</span>
                    </button>

                    {/* Hadiah */}
                    <button
                      onClick={() => scrollToSection('hadiah')}
                      className="flex flex-col items-center gap-0.5 text-brand-burgundy-900/70 hover:text-brand-terracotta-600 cursor-pointer transition-colors p-1 flex-1"
                    >
                      <Gift size={16} className="text-brand-terracotta-500" />
                      <span className="text-[9px] font-bold uppercase tracking-wider block sm:inline">Kado</span>
                    </button>

                    {/* RSVP */}
                    <button
                      onClick={() => scrollToSection('rsvp')}
                      className="flex flex-col items-center gap-0.5 text-brand-burgundy-900/70 hover:text-brand-terracotta-600 cursor-pointer transition-colors p-1 flex-1"
                    >
                      <CalendarCheck size={16} className="text-brand-terracotta-500" />
                      <span className="text-[9px] font-bold uppercase tracking-wider block sm:inline">RSVP</span>
                    </button>

                    {/* Keluarga */}
                    <button
                      onClick={() => scrollToSection('penutup')}
                      className="flex flex-col items-center gap-0.5 text-brand-burgundy-900/70 hover:text-brand-terracotta-600 cursor-pointer transition-colors p-1 flex-1"
                    >
                      <Users size={16} className="text-brand-terracotta-500" />
                      <span className="text-[9px] font-bold uppercase tracking-wider block sm:inline">Keluarga</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 6. FLOATING SCROLL TO TOP BUTTON */}
              <AnimatePresence>
                {showScrollTop && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-20 right-4 z-30 p-3 rounded-full bg-brand-burgundy-700 hover:bg-brand-burgundy-800 text-brand-cream-50 shadow-lg cursor-pointer border border-brand-gold-500/20 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Scroll to top"
                  >
                    <ChevronUp size={20} className="text-brand-gold-300" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.main>
          )}
        </>
      )}
    </div>
  );
}
