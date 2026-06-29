import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface TiltProps {
  children: React.ReactNode;
  className?: string;
}

export const Tilt: React.FC<TiltProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isHovered, setIsHovered] = useState(false);
  
  // Smooth springs for the 3D rotation
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to the center of the element (-1 to 1)
    const x = (e.clientX - rect.left - width / 2) / (width / 2);
    const y = (e.clientY - rect.top - height / 2) / (height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset to center smoothly
    mouseX.set(0);
    mouseY.set(0);
  };

  // Transform coordinates to rotation angles (max 15 degrees)
  const rotateX = useTransform(mouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isHovered && !prefersReducedMotion ? 1.02 : 1,
        zIndex: isHovered ? 10 : 1
      }}
      style={{
        perspective: 1200,
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      <div 
        style={{ 
          transform: isHovered && !prefersReducedMotion ? 'translateZ(40px)' : 'translateZ(0px)', 
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' 
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
};
