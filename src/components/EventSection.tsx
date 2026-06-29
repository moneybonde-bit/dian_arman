import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';
import { EVENTS } from '../data';
import { DiamondDivider, CornerOrnament } from './Ornament';
import { Tilt } from './Tilt';
import { Countdown } from './Countdown';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const EventSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Define animations based on reduced motion
  const initialOffset = prefersReducedMotion ? 0 : 25;
  const cardVariants = {
    hidden: { opacity: 0, y: initialOffset, scale: prefersReducedMotion ? 1 : 0.98 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : index * 0.15,
        duration: 0.8,
        ease: 'easeOut',
      }
    })
  };

  return (
    <section id="acara" className="relative py-20 px-6 bg-brand-cream-100/40 relative overflow-hidden">
      {/* Background abstract layout elements */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-brand-cream-50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-brand-cream-50 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Header Acara */}
        <motion.div
          initial={{ opacity: 0, y: initialOffset, scale: prefersReducedMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-6"
        >
          <p className="text-xs uppercase tracking-[0.2em] font-serif font-bold text-brand-terracotta-600 mb-2">
            Waktu & Tempat
          </p>
          <h2 className="text-3xl font-display text-brand-burgundy-800">Detail Acara</h2>
          <div className="w-12 h-1 bg-brand-gold-500 mx-auto mt-3" />
        </motion.div>

        {/* Cinematic Glowing Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="w-full mb-16"
        >
          <Countdown />
        </motion.div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl items-stretch">
          {EVENTS.map((event, idx) => (
            <Tilt key={event.id} className="w-full flex flex-col h-full">
              <motion.div
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="bg-brand-cream-50 rounded-2xl border border-brand-gold-500/15 p-6 md:p-8 shadow-md relative flex flex-col justify-between hover:shadow-lg transition-all duration-300 h-full"
              >
                <CornerOrnament />

                {/* Event Content */}
                <div>
                  {/* Event Category Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-brand-terracotta-500" />
                    <h3 className="text-xl font-display font-bold text-brand-burgundy-800">
                      {event.title}
                    </h3>
                  </div>

                  <div className="w-full h-[1px] bg-brand-gold-500/15 mb-6" />

                  {/* Event Metadata (Date, Time, Location) */}
                  <div className="space-y-4 mb-8">
                    {/* Date */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-brand-terracotta-50 text-brand-terracotta-600 mt-0.5">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-brand-burgundy-500/70 font-semibold uppercase tracking-wider">Tanggal</p>
                        <p className="text-sm font-bold text-brand-burgundy-900">{event.date}</p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-brand-terracotta-50 text-brand-terracotta-600 mt-0.5">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-brand-burgundy-500/70 font-semibold uppercase tracking-wider">Waktu</p>
                        <p className="text-sm font-bold text-brand-burgundy-900">{event.time}</p>
                      </div>
                    </div>

                    {/* Location Address */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-brand-terracotta-50 text-brand-terracotta-600 mt-0.5">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-brand-burgundy-500/70 font-semibold uppercase tracking-wider">Tempat</p>
                        <p className="text-sm font-bold text-brand-burgundy-900 leading-snug">{event.locationName}</p>
                        <p className="text-xs text-brand-burgundy-950/70 mt-1 leading-relaxed">{event.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons with Mobile-Friendly Touch Targets (>= 44px) */}
                <div className="flex flex-col gap-3 mt-auto z-10 relative">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-terracotta-500 to-brand-terracotta-600 hover:from-brand-terracotta-600 hover:to-brand-terracotta-700 text-brand-cream-50 text-sm font-semibold py-3 px-4 rounded-xl shadow-sm transition-all duration-300 select-none cursor-pointer border border-brand-gold-500/10 min-h-[44px] pointer-events-auto"
                  >
                    <MapPin size={16} className="text-brand-gold-200" />
                    <span>Buka Peta Lokasi</span>
                    <ExternalLink size={12} className="opacity-80" />
                  </a>

                  <a
                    href={event.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-brand-cream-100 hover:bg-brand-cream-200 text-brand-burgundy-800 text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 select-none cursor-pointer border border-brand-gold-500/20 min-h-[44px] pointer-events-auto"
                  >
                    <CalendarPlus size={16} className="text-brand-terracotta-600" />
                    <span>Simpan ke Kalender</span>
                  </a>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>

        <div className="w-full max-w-md mt-12">
          <DiamondDivider color="var(--color-brand-terracotta-500)" />
        </div>
      </div>
    </section>
  );
};
