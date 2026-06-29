import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Users, MessageSquare, Send, CalendarCheck, Sparkles, Heart, Search, Play, Pause } from 'lucide-react';
import { DiamondDivider, CornerOrnament, EthnicMandala } from './Ornament';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface RsvpResponse {
  id: string;
  name: string;
  attendance: 'hadir' | 'absen' | 'ragu';
  guestCount: number;
  message: string;
  date: string;
  reactions?: {
    heart: number;
    pray: number;
    sparkle: number;
  };
}

const QUICK_WISHES_PRESETS = [
  "Selamat menempuh hidup baru! Semoga cinta kalian abadi selamanya. ❤️",
  "Happy Wedding Arman & Dian! Semoga selalu diberkati, bahagia, dan penuh sukacita. ✨",
  "Tuhan Yesus memberkati pernikahan kalian berdua hingga maut memisahkan. 🙏",
  "Selamat berbahagia! Kiranya menjadi berkat yang berkelimpahan untuk sesama. 🌸",
];

const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const duration = 1000; // ms
    const startTime = performance.now();

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      
      const currentCount = Math.round(end * easeProgress);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <span>{count}</span>;
};

export const RsvpSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'absen' | 'ragu'>('hadir');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState<RsvpResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const hadirCount = responses.filter(r => r.attendance === 'hadir').length;
  const totalGuests = responses.filter(r => r.attendance === 'hadir').reduce((acc, r) => acc + (r.guestCount || 1), 0);
  const absenCount = responses.filter(r => r.attendance === 'absen').length;
  const raguCount = responses.filter(r => r.attendance === 'ragu').length;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const initialOffset = prefersReducedMotion ? 0 : 25;

  // Load and seed responses from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('wedding_rsvp_responses');
    if (stored) {
      setResponses(JSON.parse(stored));
    } else {
      // Seed with some lovely realistic wishes matching the family circles
      const seedData: RsvpResponse[] = [
        {
          id: 'seed-1',
          name: 'Kel. Pdt. Noh Ruku',
          attendance: 'hadir',
          guestCount: 2,
          message: 'Selamat berbahagia Arman dan Dian! Kiranya Tuhan selalu menuntun setiap langkah perjalanan keluarga baru ini menjadi berkat yang berkelimpahan untuk sesama.',
          date: '28 Juni 2026, 18.23',
          reactions: { heart: 8, pray: 12, sparkle: 5 }
        },
        {
          id: 'seed-2',
          name: 'Masriani Siregar',
          attendance: 'hadir',
          guestCount: 1,
          message: 'Happy wedding Dian sayang! Turut bersukacita atas persatuan kudus ini. Tuhan Yesus memberkati pernikahan kalian berdua hingga maut memisahkan.',
          date: '29 Juni 2026, 09.05',
          reactions: { heart: 14, pray: 9, sparkle: 8 }
        },
        {
          id: 'seed-3',
          name: 'Yustus & Ruth (Sahabat Dian)',
          attendance: 'hadir',
          guestCount: 2,
          message: 'Sangat terharu melihat perjalanan cinta kalian. Akhirnya bersatu di GKST Imanuel Parigi. Maaf belum bisa hadir langsung, doa kami menyertai dari jauh!',
          date: '29 Juni 2026, 11.45',
          reactions: { heart: 11, pray: 6, sparkle: 12 }
        }
      ];
      localStorage.setItem('wedding_rsvp_responses', JSON.stringify(seedData));
      setResponses(seedData);
    }
  }, []);

  // Live Auto-Scroll Ticker Effect
  useEffect(() => {
    if (!isAutoScrolling || prefersReducedMotion) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 25; // pixels per second

    const scroll = (currentTime: number) => {
      if (!scrollContainerRef.current) return;
      const el = scrollContainerRef.current;

      const elapsed = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // If user is hovering or dragging, pause temporarily
      if (!el.matches(':hover')) {
        el.scrollTop += speed * elapsed;

        // Wrap around smoothly if reached the bottom
        if (el.scrollTop >= el.scrollHeight - el.clientHeight - 2) {
          el.scrollTop = 0;
        }
      } else {
        // Keep updating time even when paused so it doesn't jump
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoScrolling, prefersReducedMotion, responses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = `${now.getDate()} ${getMonthName(now.getMonth())} ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;

    const newResponse: RsvpResponse = {
      id: `rsvp-${Date.now()}`,
      name: name.trim(),
      attendance,
      guestCount: attendance === 'hadir' ? guestCount : 0,
      message: message.trim(),
      date: formattedDate,
      reactions: { heart: 0, pray: 0, sparkle: 0 }
    };

    setTimeout(() => {
      const updated = [newResponse, ...responses];
      localStorage.setItem('wedding_rsvp_responses', JSON.stringify(updated));
      setResponses(updated);
      
      setIsSubmitting(false);
      setShowSuccess(true);

      // Clear form fields
      setName('');
      setMessage('');
      setGuestCount(1);
    }, 1000);
  };

  const handleReaction = (id: string, type: 'heart' | 'pray' | 'sparkle') => {
    const updated = responses.map(rsvp => {
      if (rsvp.id === id) {
        const reactions = rsvp.reactions || { heart: 0, pray: 0, sparkle: 0 };
        return {
          ...rsvp,
          reactions: {
            ...reactions,
            [type]: reactions[type] + 1
          }
        };
      }
      return rsvp;
    });
    setResponses(updated);
    localStorage.setItem('wedding_rsvp_responses', JSON.stringify(updated));
  };

  const getMonthName = (monthIdx: number) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return months[monthIdx];
  };

  const attendanceLabels = {
    hadir: { text: 'Hadir', bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' },
    absen: { text: 'Tidak Hadir', bg: 'bg-rose-500/10 text-rose-700 border-rose-500/20' },
    ragu: { text: 'Masih Ragu', bg: 'bg-amber-500/10 text-amber-700 border-amber-500/20' }
  };

  const filteredResponses = responses.filter(rsvp => 
    rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rsvp.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="rsvp" className="py-24 px-6 bg-brand-cream-100/40 relative overflow-hidden flex flex-col items-center">
      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: initialOffset, scale: prefersReducedMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] font-serif font-bold text-brand-terracotta-600 mb-2">
            Konfirmasi Kehadiran
          </p>
          <h2 className="text-3xl font-display text-brand-burgundy-800">R.S.V.P & Wishes Board</h2>
          <div className="w-12 h-1 bg-brand-gold-500 mx-auto mt-3" />
          <p className="text-xs text-brand-burgundy-950/70 mt-4 max-w-sm mx-auto leading-relaxed">
            Mohon kesediaan Bapak/Ibu/Saudara/i untuk mengonfirmasi kehadiran Anda pada acara pernikahan kami serta memberikan ucapan hangat.
          </p>
        </motion.div>

        {/* RSVP Summary Panel */}
        {responses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full max-w-4xl mb-10"
          >
            <div className="bg-brand-cream-50/80 border border-brand-gold-500/25 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-sm relative overflow-hidden">
              {/* Artistic subtle watermark */}
              <div className="absolute -top-6 -right-6 p-4 opacity-10 pointer-events-none">
                <EthnicMandala size={110} className="text-brand-gold-500" />
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 pb-3 border-b border-brand-gold-500/15">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta-600">Statistik Kehadiran</p>
                    <h3 className="text-sm font-display font-bold text-brand-burgundy-800 uppercase tracking-wider">
                      RSVP Summary Board
                    </h3>
                  </div>
                  <div className="bg-brand-cream-100/70 border border-brand-gold-500/15 rounded-full px-4 py-1 text-[11px] font-bold text-brand-burgundy-900 tracking-wide flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta-500 animate-pulse" />
                    <span>Sudah <AnimatedCounter value={responses.length} /> kerabat memberikan konfirmasi</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card Hadir */}
                  <div className="bg-brand-cream-50 border border-brand-gold-500/15 rounded-xl p-4 flex items-start gap-3 transition-all duration-300 hover:border-brand-gold-500/30 shadow-xs hover:shadow-sm">
                    <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/10 rounded-full text-emerald-600 flex-shrink-0">
                      <Users size={16} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] uppercase font-bold tracking-widest text-brand-burgundy-950/40">👥 Hadir</p>
                      <h4 className="text-base font-display font-extrabold text-brand-burgundy-950">
                        <AnimatedCounter value={hadirCount} /> <span className="text-[10px] font-bold text-brand-burgundy-950/50 uppercase">Konfirmasi</span>
                      </h4>
                      <p className="text-[11px] font-bold text-emerald-700/90 tracking-wide">
                        Total <AnimatedCounter value={totalGuests} /> Tamu (Pax)
                      </p>
                    </div>
                  </div>

                  {/* Card Absen */}
                  <div className="bg-brand-cream-50 border border-brand-gold-500/15 rounded-xl p-4 flex items-start gap-3 transition-all duration-300 hover:border-brand-gold-500/30 shadow-xs hover:shadow-sm">
                    <div className="p-2.5 bg-rose-500/10 border border-rose-500/10 rounded-full text-rose-600 flex-shrink-0 flex items-center justify-center w-9 h-9">
                      <span className="font-serif font-extrabold text-xs leading-none">✕</span>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] uppercase font-bold tracking-widest text-brand-burgundy-950/40">✕ Absen</p>
                      <h4 className="text-base font-display font-extrabold text-brand-burgundy-950">
                        <AnimatedCounter value={absenCount} /> <span className="text-[10px] font-bold text-brand-burgundy-950/50 uppercase">Tamu</span>
                      </h4>
                      <p className="text-[11px] font-bold text-rose-700/90 tracking-wide">
                        Berhalangan Hadir
                      </p>
                    </div>
                  </div>

                  {/* Card Ragu-ragu */}
                  <div className="bg-brand-cream-50 border border-brand-gold-500/15 rounded-xl p-4 flex items-start gap-3 transition-all duration-300 hover:border-brand-gold-500/30 shadow-xs hover:shadow-sm">
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/10 rounded-full text-amber-600 flex-shrink-0 flex items-center justify-center w-9 h-9">
                      <span className="font-sans font-extrabold text-xs leading-none">❓</span>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] uppercase font-bold tracking-widest text-brand-burgundy-950/40">🤔 Ragu-Ragu</p>
                      <h4 className="text-base font-display font-extrabold text-brand-burgundy-950">
                        <AnimatedCounter value={raguCount} /> <span className="text-[10px] font-bold text-brand-burgundy-950/50 uppercase">Tamu</span>
                      </h4>
                      <p className="text-[11px] font-bold text-amber-700/90 tracking-wide">
                        Menunggu Kepastian
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start max-w-4xl">
          
          {/* LEFT: RSVP FORM */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30, scale: prefersReducedMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 bg-brand-cream-50 rounded-3xl border border-brand-gold-500/15 p-6 md:p-8 shadow-md relative overflow-hidden"
          >
            <CornerOrnament />
            
            <h3 className="text-xl font-display font-bold text-brand-burgundy-800 mb-6 flex items-center gap-2">
              <CalendarCheck size={20} className="text-brand-terracotta-500" />
              <span>Isi Kehadiran</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 z-10 relative">
              {/* Name Field */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-brand-burgundy-950/70 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Bpk. Stefanus"
                  className="w-full bg-brand-cream-100/50 border border-brand-gold-500/25 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-brand-terracotta-500 transition-colors placeholder-brand-burgundy-950/30"
                />
              </div>

              {/* Attendance Options */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-brand-burgundy-950/70 mb-2">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['hadir', 'absen', 'ragu'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAttendance(opt)}
                      className={`text-xs font-semibold py-3.5 px-2 rounded-xl border transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-center min-h-[44px] ${
                        attendance === opt
                          ? 'bg-gradient-to-r from-brand-terracotta-500 to-brand-burgundy-600 text-brand-cream-50 border-transparent shadow-sm'
                          : 'bg-brand-cream-100/30 border-brand-gold-500/15 text-brand-burgundy-800 hover:bg-brand-cream-100/75'
                      }`}
                    >
                      <span className="capitalize">{opt === 'ragu' ? 'Ragu-ragu' : opt === 'hadir' ? 'Hadir' : 'Absen'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count (Only shows when Attending) */}
              <AnimatePresence>
                {attendance === 'hadir' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-brand-burgundy-950/70 mb-1.5">
                      Jumlah Tamu (Pax)
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-brand-terracotta-50 text-brand-terracotta-600">
                        <Users size={16} />
                      </div>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="flex-1 bg-brand-cream-100/50 border border-brand-gold-500/25 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-terracotta-500 transition-colors"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} Orang
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wishes Message */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-brand-burgundy-950/70 mb-1.5 flex justify-between items-center">
                  <span>Ucapan & Doa Restu</span>
                  <span className="text-[9px] font-bold text-brand-gold-600 uppercase tracking-widest">Wishes Wall</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Berikan doa restu atau ucapan hangat Anda di sini..."
                  rows={4}
                  className="w-full bg-brand-cream-100/50 border border-brand-gold-500/25 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-brand-terracotta-500 transition-colors placeholder-brand-burgundy-950/30 resize-none"
                />

                {/* QUICK PRESETS */}
                <div className="mt-3">
                  <p className="text-[10px] text-brand-burgundy-950/60 font-semibold mb-1.5 uppercase tracking-wider">Pilihan Ucapan Cepat:</p>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_WISHES_PRESETS.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setMessage(preset)}
                        className="text-left text-[11px] font-medium bg-brand-cream-100/40 hover:bg-brand-cream-100/90 border border-brand-gold-500/10 hover:border-brand-gold-500/30 px-3 py-1.5 rounded-lg text-brand-burgundy-900 transition-colors duration-200 line-clamp-1 truncate cursor-pointer"
                        title={preset}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-terracotta-500 to-brand-burgundy-600 hover:from-brand-terracotta-600 hover:to-brand-burgundy-700 text-brand-cream-50 font-semibold py-3.5 px-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 min-h-[44px]"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-brand-cream-50 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} className="text-brand-gold-200" />
                    <span>Kirim Konfirmasi</span>
                  </>
                )}
              </button>
            </form>

            {/* Success Modal/Banner overlay */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-brand-cream-50/98 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-lg font-display font-bold text-brand-burgundy-800">
                    Terima Kasih Banyak!
                  </h4>
                  <p className="text-xs text-brand-burgundy-950/75 mt-2 max-w-[240px] leading-relaxed">
                    Konfirmasi dan doa restu Anda telah sukses terkirim ke Wishes Wall.
                  </p>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="mt-6 bg-brand-cream-100 hover:bg-brand-cream-200 text-brand-burgundy-800 font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded-full border border-brand-gold-500/20 cursor-pointer min-h-[40px]"
                  >
                    Isi Lagi
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: WISHES BOARD */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30, scale: prefersReducedMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 w-full flex flex-col h-[580px]"
          >
            <div className="flex flex-col gap-4 mb-4 pb-2 border-b border-brand-gold-500/20">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-display font-bold text-brand-burgundy-800 flex items-center gap-2">
                  <MessageSquare size={20} className="text-brand-terracotta-500" />
                  <span>Wishes Wall</span>
                </h3>
                <span className="text-xs font-semibold bg-brand-terracotta-50 text-brand-terracotta-700 px-3 py-1 rounded-full border border-brand-gold-500/15 flex items-center gap-1.5">
                  <Heart size={12} className="fill-brand-terracotta-500 text-brand-terracotta-500" />
                  {responses.length} Doa Terkirim
                </span>
              </div>

              {/* SEARCH & TICKER TOGGLE */}
              <div className="flex items-center gap-2.5">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-burgundy-950/40" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari nama ucapan..."
                    className="w-full bg-brand-cream-50 border border-brand-gold-500/15 rounded-full pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:border-brand-terracotta-500 transition-colors placeholder-brand-burgundy-950/30"
                  />
                </div>
                {!prefersReducedMotion && (
                  <button
                    onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer min-h-[34px] ${
                      isAutoScrolling
                        ? 'bg-brand-gold-500/15 border-brand-gold-500/40 text-brand-gold-800'
                        : 'bg-brand-cream-100 border-brand-gold-500/10 text-brand-burgundy-950/60 hover:bg-brand-cream-200'
                    }`}
                    title={isAutoScrolling ? "Matikan gulir otomatis" : "Aktifkan gulir otomatis"}
                  >
                    {isAutoScrolling ? <Pause size={10} /> : <Play size={10} />}
                    <span>{isAutoScrolling ? "Auto-Scroll On" : "Auto-Scroll Off"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable list with Custom styling */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto space-y-4 pr-1.5 max-h-[460px] custom-scrollbar scroll-smooth"
            >
              <AnimatePresence initial={false}>
                {filteredResponses.map((rsvp) => {
                  const reactions = rsvp.reactions || { heart: 0, pray: 0, sparkle: 0 };
                  return (
                    <motion.div
                      key={rsvp.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-brand-cream-50/90 hover:bg-brand-cream-50 rounded-2xl border border-brand-gold-500/10 hover:border-brand-gold-500/25 p-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Header: Name and Label status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-500" />
                          <h4 className="font-bold text-sm text-brand-burgundy-800 leading-tight">
                            {rsvp.name}
                          </h4>
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${attendanceLabels[rsvp.attendance]?.bg || ''}`}>
                          {attendanceLabels[rsvp.attendance]?.text}
                          {rsvp.attendance === 'hadir' && rsvp.guestCount > 1 && ` (${rsvp.guestCount} Pax)`}
                        </span>
                      </div>

                      {/* Congratulatory message */}
                      {rsvp.message && (
                        <p className="text-xs text-brand-burgundy-950/85 leading-relaxed font-medium bg-brand-cream-100/25 p-3 rounded-xl border border-brand-gold-500/5 mb-3 italic">
                          “{rsvp.message}”
                        </p>
                      )}

                      {/* Date & Interactive Reactions */}
                      <div className="flex items-center justify-between pt-1 border-t border-brand-gold-500/5">
                        {/* Reactions Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleReaction(rsvp.id, 'heart')}
                            className="flex items-center gap-1.5 text-[10px] font-bold text-brand-burgundy-950/60 hover:text-rose-600 bg-rose-500/5 hover:bg-rose-500/10 border border-brand-gold-500/5 rounded-full px-2 py-1 transition-colors cursor-pointer"
                          >
                            <span>❤️</span>
                            <span>{reactions.heart}</span>
                          </button>
                          <button
                            onClick={() => handleReaction(rsvp.id, 'pray')}
                            className="flex items-center gap-1.5 text-[10px] font-bold text-brand-burgundy-950/60 hover:text-emerald-600 bg-emerald-500/5 hover:bg-emerald-500/10 border border-brand-gold-500/5 rounded-full px-2 py-1 transition-colors cursor-pointer"
                          >
                            <span>🙏</span>
                            <span>{reactions.pray}</span>
                          </button>
                          <button
                            onClick={() => handleReaction(rsvp.id, 'sparkle')}
                            className="flex items-center gap-1.5 text-[10px] font-bold text-brand-burgundy-950/60 hover:text-amber-600 bg-amber-500/5 hover:bg-amber-500/10 border border-brand-gold-500/5 rounded-full px-2 py-1 transition-colors cursor-pointer"
                          >
                            <span>✨</span>
                            <span>{reactions.sparkle}</span>
                          </button>
                        </div>

                        {/* Date timestamp */}
                        <p className="text-[9px] text-brand-burgundy-950/45 font-semibold font-serif uppercase tracking-wider">
                          {rsvp.date}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredResponses.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 text-brand-burgundy-950/40">
                  <EthnicMandala size={48} className="opacity-30 mb-3" />
                  <p className="text-xs font-semibold">Tidak ditemukan ucapan cocok.</p>
                  <p className="text-[10px] opacity-70">Coba ubah kata kunci pencarian Anda.</p>
                </div>
              )}
            </div>
          </motion.div>

        </div>

        <div className="w-full max-w-md mt-16">
          <DiamondDivider color="var(--color-brand-terracotta-500)" />
        </div>
      </div>
    </section>
  );
};
