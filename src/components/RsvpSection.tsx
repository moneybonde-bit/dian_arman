import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Users, MessageSquare, Send, CalendarCheck, Sparkles, Heart } from 'lucide-react';
import { DiamondDivider, CornerOrnament, EthnicMandala } from './Ornament';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface RsvpResponse {
  id: string;
  name: string;
  attendance: 'hadir' | 'absen' | 'ragu';
  guestCount: number;
  message: string;
  date: string;
}

export const RsvpSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'absen' | 'ragu'>('hadir');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState<RsvpResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
          date: '28 Juni 2026, 18.23'
        },
        {
          id: 'seed-2',
          name: 'Masriani Siregar',
          attendance: 'hadir',
          guestCount: 1,
          message: 'Happy wedding Dian sayang! Turut bersukacita atas persatuan kudus ini. Tuhan Yesus memberkati pernikahan kalian berdua hingga maut memisahkan.',
          date: '29 Juni 2026, 09.05'
        },
        {
          id: 'seed-3',
          name: 'Yustus & Ruth (Sahabat Dian)',
          attendance: 'hadir',
          guestCount: 2,
          message: 'Sangat terharu melihat perjalanan cinta kalian. Akhirnya bersatu di GKST Imanuel Parigi. Maaf belum bisa hadir langsung, doa kami menyertai dari jauh!',
          date: '29 Juni 2026, 11.45'
        }
      ];
      localStorage.setItem('wedding_rsvp_responses', JSON.stringify(seedData));
      setResponses(seedData);
    }
  }, []);

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
      date: formattedDate
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
            Mohon kesediaan Bapak/Ibu/Saudara/i untuk mengonfirmasi kehadiran Anda pada acara pernikahan kami.
          </p>
        </motion.div>

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
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-brand-burgundy-950/70 mb-1.5">
                  Ucapan & Doa Restu
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Berikan doa restu atau ucapan hangat Anda di sini..."
                  rows={4}
                  className="w-full bg-brand-cream-100/50 border border-brand-gold-500/25 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-brand-terracotta-500 transition-colors placeholder-brand-burgundy-950/30 resize-none"
                />
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
                    Konfirmasi dan doa restu Anda telah sukses terkirim ke Wishes Board.
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
            className="lg:col-span-7 w-full flex flex-col h-[520px]"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-brand-gold-500/20">
              <h3 className="text-xl font-display font-bold text-brand-burgundy-800 flex items-center gap-2">
                <MessageSquare size={20} className="text-brand-terracotta-500" />
                <span>Wishes Board</span>
              </h3>
              <span className="text-xs font-semibold bg-brand-terracotta-50 text-brand-terracotta-700 px-3 py-1 rounded-full border border-brand-gold-500/15 flex items-center gap-1.5">
                <Heart size={12} className="fill-brand-terracotta-500 text-brand-terracotta-500" />
                {responses.length} Doa Terkirim
              </span>
            </div>

            {/* Scrollable list with Custom styling */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 max-h-[460px] custom-scrollbar">
              <AnimatePresence initial={false}>
                {responses.map((rsvp) => (
                  <motion.div
                    key={rsvp.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-brand-cream-50/80 hover:bg-brand-cream-50 rounded-2xl border border-brand-gold-500/10 p-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
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
                      <p className="text-xs text-brand-burgundy-950/85 leading-relaxed font-medium bg-brand-cream-100/25 p-3 rounded-xl border border-brand-gold-500/5 mb-2 italic">
                        “{rsvp.message}”
                      </p>
                    )}

                    {/* Date timestamp */}
                    <div className="flex items-center justify-end">
                      <p className="text-[9px] text-brand-burgundy-950/45 font-semibold font-serif uppercase tracking-wider">
                        {rsvp.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {responses.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 text-brand-burgundy-950/40">
                  <EthnicMandala size={48} className="opacity-30 mb-3" />
                  <p className="text-xs font-semibold">Belum ada doa restu terkumpul.</p>
                  <p className="text-[10px] opacity-70">Jadilah yang pertama mengirimkan berkat!</p>
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
