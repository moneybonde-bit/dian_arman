import { useEffect } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'motion/react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface ParallaxValues {
  /** Normalised pointer/tilt on X axis, smoothed (-1 .. 1) */
  x: MotionValue<number>;
  /** Normalised pointer/tilt on Y axis, smoothed (-1 .. 1) */
  y: MotionValue<number>;
}

/**
 * Tracks the pointer position (desktop) and the device orientation gyroscope
 * (mobile) and exposes two smoothed motion values normalised to the range
 * -1..1. Layers can subscribe to these to build a real, multi-depth 3D
 * parallax scene.
 */
export function useParallax(): ParallaxValues {
  const prefersReducedMotion = usePrefersReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Critically-damped springs give the scene a tactile, weighty feel
  const x = useSpring(rawX, { stiffness: 120, damping: 24, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (prefersReducedMotion) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const handlePointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      rawX.set(nx);
      rawY.set(ny);
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      // gamma: left/right tilt (-90..90), beta: front/back tilt (-180..180)
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 0;
      // Clamp to a comfortable tilt range and normalise
      const nx = Math.max(-1, Math.min(1, gamma / 35));
      const ny = Math.max(-1, Math.min(1, (beta - 45) / 35));
      rawX.set(nx);
      rawY.set(ny);
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [prefersReducedMotion, rawX, rawY]);

  return { x, y };
}
