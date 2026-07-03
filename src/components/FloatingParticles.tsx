import React from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const FloatingParticles: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  if (prefersReducedMotion) return null;

  // Render a number of particles to simulate flying leaves/petals.
  // Fewer particles on small screens keeps scrolling smooth on mobile GPUs.
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 640;
  const particles = Array.from({ length: isSmallScreen ? 10 : 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => {
        const size = Math.random() * 15 + 10; // Random size between 10px and 25px
        const left = Math.random() * 100; // Random horizontal position
        const duration = Math.random() * 15 + 15; // Random animation duration between 15s and 30s
        const delay = Math.random() * 10; // Random delay
        const isLeaf = Math.random() > 0.5;

        return (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: '-10vh',
              x: `${left}vw`,
              rotate: 0,
              scale: 0.5
            }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              y: '110vh',
              x: [`${left}vw`, `${left + 15}vw`, `${left - 10}vw`, `${left + 5}vw`],
              rotate: 360,
              scale: [0.5, 1, 1, 0.5]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: 'linear'
            }}
            className="absolute drop-shadow-sm"
            style={{
              width: size,
              height: size,
            }}
          >
            {isLeaf ? (
              // Leaf SVG
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-gold-500/30 w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                <path d="M12 2C12 2 15 6 15 12C15 18 12 22 12 22C12 22 9 18 9 12C9 6 12 2 12 2Z" fill="currentColor" />
              </svg>
            ) : (
              // Star/Sparkle SVG
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-terracotta-500/20 w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                <path d="M12 2C12 2 14.5 9.5 22 12C14.5 14.5 12 22 12 22C12 22 9.5 14.5 2 12C9.5 9.5 12 2 12 2Z" fill="currentColor" />
              </svg>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
