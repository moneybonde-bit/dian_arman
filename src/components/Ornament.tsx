import React from 'react';

interface OrnamentProps {
  className?: string;
  size?: number;
  color?: string;
}

// Reusable elegant line divider with traditional diamond motif in center
export const DiamondDivider: React.FC<OrnamentProps> = ({ className = '', size = 16, color = 'currentColor' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 w-full my-6 ${className}`}>
      <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-brand-gold-500/60" />
      <svg
        width={size * 2}
        height={size}
        viewBox="0 0 32 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-brand-gold-500"
      >
        <path
          d="M16 0L24 8L16 16L8 8L16 0Z"
          fill={color === 'currentColor' ? 'var(--color-brand-gold-500)' : color}
        />
        <path
          d="M16 3L21 8L16 13L11 8L16 3Z"
          fill="var(--color-brand-cream-warm)"
        />
        <circle cx="16" cy="8" r="2" fill={color === 'currentColor' ? 'var(--color-brand-gold-500)' : color} />
      </svg>
      <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-brand-gold-500/60" />
    </div>
  );
};

// Reusable intricate Eastern Indonesian-inspired ethnic mandala/star motif
export const EthnicMandala: React.FC<OrnamentProps> = ({ className = '', size = 80, color = 'var(--color-brand-gold-500)' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`mx-auto ${className}`}
    >
      {/* Outer Diamond */}
      <rect x="50" y="8" width="59.4" height="59.4" transform="rotate(45 50 8)" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="50" y="12" width="53.7" height="53.7" transform="rotate(45 50 12)" stroke={color} strokeWidth="1" />
      
      {/* Star Points */}
      <path d="M50 5 L55 35 L85 35 L60 55 L70 85 L50 65 L30 85 L40 55 L15 35 L45 35 Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
      
      {/* Inner Diamonds and Accents */}
      <polygon points="50,25 75,50 50,75 25,50" fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points="50,35 65,50 50,65 35,50" fill={color} fillOpacity="0.4" />
      
      {/* Core Star / Spark */}
      <circle cx="50" cy="50" r="4" fill="var(--color-brand-cream-warm)" stroke={color} strokeWidth="2" />
      
      {/* Compass/Cross lines for cultural anchoring */}
      <line x1="50" y1="5" x2="50" y2="95" stroke={color} strokeWidth="0.75" />
      <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth="0.75" />
    </svg>
  );
};

// Reusable corner frame borders for widgets/sections
export const CornerOrnament: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none p-4 ${className}`}>
      {/* Top Left Corner */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-brand-gold-500/40 rounded-tl-sm">
        <div className="absolute top-1 left-1 w-2 h-2 bg-brand-gold-500/60 rotate-45" />
      </div>
      {/* Top Right Corner */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-brand-gold-500/40 rounded-tr-sm">
        <div className="absolute top-1 right-1 w-2 h-2 bg-brand-gold-500/60 rotate-45" />
      </div>
      {/* Bottom Left Corner */}
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-brand-gold-500/40 rounded-bl-sm">
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-brand-gold-500/60 rotate-45" />
      </div>
      {/* Bottom Right Corner */}
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-brand-gold-500/40 rounded-br-sm">
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-brand-gold-500/60 rotate-45" />
      </div>
    </div>
  );
};
