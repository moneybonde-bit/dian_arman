import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Gift, Copy, Check, Sparkles } from 'lucide-react';
import { DiamondDivider, CornerOrnament } from './Ornament';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const GiftSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const [showGiftSection, setShowGiftSection] = useState(false);

  const initialOffset = prefersReducedMotion ? 0 : 25;

  const account = {
    bankName: 'Bank BCA',
    accountNumber: '6495112234',
    recipientName: 'Arman Kanaf',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hadiah" className="py-24 px-6 bg-brand-cream-50 relative overflow-hidden flex flex-col items-center">
      {/* Background soft texture */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[radial-gradient(#b34b32_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: initialOffset, scale: prefersReducedMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] font-serif font-bold text-brand-terracotta-600 mb-2">
            Tanda Kasih
          </p>
          <h2 className="text-3xl font-display text-brand-burgundy-800">Kado Digital</h2>
          <div className="w-12 h-1 bg-brand-gold-500 mx-auto mt-3" />
          <p className="text-xs text-brand-burgundy-950/70 mt-4 max-w-sm mx-auto leading-relaxed">
            Doa restu Anda adalah karunia terindah bagi kami. Namun apabila Anda ingin memberikan tanda kasih secara digital, Anda dapat melalui rekening berikut.
          </p>
        </motion.div>

        {/* Toggle Expand Button */}
        <motion.button
          onClick={() => setShowGiftSection(!showGiftSection)}
          whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          className="flex items-center gap-2 bg-gradient-to-r from-brand-terracotta-500 to-brand-burgundy-500 hover:from-brand-terracotta-600 hover:to-brand-burgundy-600 text-brand-cream-50 font-semibold px-8 py-3.5 rounded-full shadow-lg border border-brand-gold-500/20 cursor-pointer min-h-[44px] mb-8"
        >
          <Gift size={18} className="text-brand-gold-300 animate-bounce" />
          <span>{showGiftSection ? 'Sembunyikan Informasi Kado' : 'Kirim Kado Digital'}</span>
        </motion.button>

        {/* Gift Card Container */}
        <AnimatePresence>
          {showGiftSection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full overflow-hidden flex justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-cream-100/60 rounded-2xl border border-brand-gold-500/15 p-6 md:p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden w-full max-w-md my-4 text-left"
              >
                <CornerOrnament />

                {/* Bank Brand Header */}
                <div className="flex items-center justify-between mb-6 z-10 relative">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 rounded-lg bg-brand-terracotta-50 text-brand-terracotta-600">
                      <CreditCard size={18} />
                    </div>
                    <span className="text-sm font-bold text-brand-burgundy-800 uppercase tracking-wider">
                      {account.bankName}
                    </span>
                  </div>
                  <Sparkles size={14} className="text-brand-gold-500 opacity-60" />
                </div>

                {/* Account Info */}
                <div className="text-left mb-6 z-10 relative">
                  <p className="text-[10px] uppercase tracking-widest text-brand-burgundy-950/60 font-bold">
                    No. Rekening
                  </p>
                  <p className="text-xl md:text-2xl font-mono font-bold text-brand-burgundy-800 tracking-wide mt-1 break-all">
                    {account.accountNumber}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-brand-burgundy-950/60 font-bold mt-3">
                    Pemegang Rekening
                  </p>
                  <p className="text-sm font-semibold text-brand-burgundy-900 mt-1">
                    {account.recipientName}
                  </p>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className={`flex items-center justify-center gap-2 font-semibold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-sm transition-all duration-300 cursor-pointer min-h-[44px] border w-full ${
                    copied
                      ? 'bg-emerald-500 text-white border-transparent'
                      : 'bg-brand-cream-50 hover:bg-brand-cream-100 text-brand-burgundy-800 border-brand-gold-500/20'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="text-brand-terracotta-500" />
                      <span>Salin No. Rekening</span>
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full max-w-md mt-12">
          <DiamondDivider color="var(--color-brand-terracotta-500)" />
        </div>
      </div>
    </section>
  );
};
