import { WeddingEvent, GalleryItem, FamilyGroup } from './types';

export const HERO_IMAGES = [
  'https://storage.googleapis.com/aistudio-user-uploads/649922817876/bb6cd194a21147a4ba713eb7cc5f2061/image.png',
  'https://storage.googleapis.com/aistudio-user-uploads/649922817876/013054116bc94fc7b2a6138f6b0f19c3/image.png',
  'https://storage.googleapis.com/aistudio-user-uploads/649922817876/abfe9326f4364ab6afccab2612a84a6c/image.png'
];

export const BRIDE_GROOM = {
  groom: {
    fullName: 'Arman Kanaf',
    shortName: 'Arman',
    parents: 'Bpk. Felipus Kanaf & Ibu Frida A.B.T Baok',
    childOf: 'Anak ke-4',
  },
  bride: {
    fullName: 'Dian Hezedila Sharon',
    shortName: 'Dian',
    parents: 'Alm. Bpk. I Wayan Wismayasa & Ibu Elim Sia Wasti Tehampa',
    childOf: 'Anak ke-2',
  },
};

export const DOA_HARAPAN = 
  "Dalam setiap doa kami dan dalam kasih-Nya yang kekal, Tuhan mempertemukan kami, bukan hanya untuk berjalan bersama, tetapi untuk dipersatukan dalam satu panggilan: menjadi terang dan saksi kasih Kristus bagi bangsa-bangsa.";

export const BIBLE_VERSE = {
  passage: "1 Tawarikh 17:27 (TB)",
  text: "Kiranya Engkau sekarang berkenan memberkati keluarga hamba-Mu ini, supaya tetap ada di hadapan-Mu untuk selama-lamanya. Sebab apa yang Engkau berkati, ya TUHAN, diberkati untuk selama-lamanya."
};

export const EVENTS: WeddingEvent[] = [
  {
    id: 'pemberkatan',
    title: 'Pemberkatan Nikah',
    date: 'Sabtu, 25 Juli 2026',
    time: '11.00 WITA',
    locationName: 'GKST Jemaat Imanuel Parigi',
    address: 'Parigi, Kabupaten Parigi Moutong, Sulawesi Tengah',
    mapUrl: 'https://maps.google.com/?q=GKST+Jemaat+Imanuel+Parigi',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pemberkatan+Nikah+Arman+%26+Dian&dates=20260725T030000Z/20260725T050000Z&details=Pemberkatan+Nikah+Arman+Kanaf+%26+Dian+Hezedila+Sharon+di+GKST+Jemaat+Imanuel+Parigi&location=GKST+Jemaat+Imanuel+Parigi,+Sulawesi+Tengah'
  },
  {
    id: 'resepsi',
    title: 'Resepsi Pernikahan',
    date: 'Sabtu, 25 Juli 2026',
    time: '19.00 WITA',
    locationName: 'Auditorium Kantor Bupati Parigi Moutong',
    address: 'Parigi, Kabupaten Parigi Moutong, Sulawesi Tengah',
    mapUrl: 'https://maps.google.com/?q=Auditorium+Kantor+Bupati+Parigi+Moutong',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+Arman+%26+Dian&dates=20260725T110000Z/20260725T140000Z&details=Resepsi+Pernikahan+Arman+Kanaf+%26+Dian+Hezedila+Sharon&location=Auditorium+Kantor+Bupati+Parigi+Moutong,+Sulawesi+Tengah'
  }
];

export const FAMILIES: FamilyGroup[] = [
  {
    side: 'groom',
    title: 'Keluarga Besar Mempelai Pria',
    names: [
      'Kel. Kanaf - Baok',
      'Kel. Neno - Nenoharan',
      'Kel. Pdt. Noh Ruku',
      'Kel. Masriani Ruthi Tiara Lina Siregar'
    ]
  },
  {
    side: 'bride',
    title: 'Keluarga Besar Mempelai Wanita',
    names: [
      'Kel. Wismayasa – Tehampa',
      'Kel. Tehampa – Louhenapessy',
      'Kel. Bartolomius – Wirati',
      'Kel. Nyolo-nyolo - Tangkidi'
    ]
  }
];

// 30 Beautiful curated Unsplash photos with warm tones (Terracotta, Burgundy, Cream, Gold)
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    alt: 'Bunga Pernikahan Elegan Tepi Pantai',
    category: 'Detail Indah'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
    alt: 'Dansa Pengantin Romantis',
    category: 'Sesi Pranikah'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800',
    alt: 'Genggaman Tangan Hangat Pasangan',
    category: 'Momen Bersama'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80&w=800',
    alt: 'Senyuman Bahagia Pengantin Baru',
    category: 'Momen Bersama'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
    alt: 'Kemeriahan Kembang Api Pernikahan',
    category: 'Momen Bersama'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1519225495810-7517cb1df9ee?auto=format&fit=crop&q=80&w=800',
    alt: 'Pasangan di Bawah Cahaya Senja Mas',
    category: 'Sesi Pranikah'
  },
  {
    id: 'g7',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800',
    alt: 'Detail Cincin Pernikahan Emas',
    category: 'Detail Indah'
  },
  {
    id: 'g8',
    url: 'https://images.unsplash.com/photo-1507504038482-7621c518ceab?auto=format&fit=crop&q=80&w=800',
    alt: 'Siluet Pasangan Menatap Sunset Romantis',
    category: 'Sesi Pranikah'
  },
  {
    id: 'g9',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
    alt: 'Berjalan Bersama di Jalur Alam',
    category: 'Momen Bersama'
  },
  {
    id: 'g10',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
    alt: 'Canda Tawa Hangat Berdua',
    category: 'Sesi Pranikah'
  },
  {
    id: 'g11',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=800',
    alt: 'Abstrak Siluet Cinta di Senja',
    category: 'Sesi Pranikah'
  },
  {
    id: 'g12',
    url: 'https://images.unsplash.com/photo-1529636798458-92182e65f76b?auto=format&fit=crop&q=80&w=800',
    alt: 'Berdiri di Padang Rumput Keemasan',
    category: 'Sesi Pranikah'
  },
  {
    id: 'g13',
    url: 'https://images.unsplash.com/photo-1510076857177-7473892fc14d?auto=format&fit=crop&q=80&w=800',
    alt: 'Detail Buket Bunga Mawar Terracotta',
    category: 'Detail Indah'
  },
  {
    id: 'g14',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    alt: 'Ekspresi Senyum Lembut Kebahagiaan',
    category: 'Momen Bersama'
  },
  {
    id: 'g15',
    url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=800',
    alt: 'Pasangan Menikmati Kebersamaan',
    category: 'Momen Bersama'
  },
  {
    id: 'g16',
    url: 'https://images.unsplash.com/photo-1537907690979-ee8e01276184?auto=format&fit=crop&q=80&w=800',
    alt: 'Genggaman Tangan Menyambut Masa Depan',
    category: 'Momen Bersama'
  },
  {
    id: 'g17',
    url: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&q=80&w=800',
    alt: 'Dua Gelas Toast Perayaan Pernikahan',
    category: 'Detail Indah'
  },
  {
    id: 'g18',
    url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800',
    alt: 'Detail Tekstur Kain Tenun Etnik Tradisional',
    category: 'Detail Indah'
  },
  {
    id: 'g19',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800',
    alt: 'Dekorasi Meja Jamuan Burgundy Terracotta',
    category: 'Detail Indah'
  },
  {
    id: 'g20',
    url: 'https://images.unsplash.com/photo-1502472545319-97740027f997?auto=format&fit=crop&q=80&w=800',
    alt: 'Lilin-Lilin Hangat Dekorasi Pernikahan',
    category: 'Detail Indah'
  },
  {
    id: 'g21',
    url: 'https://images.unsplash.com/photo-1616166330003-8e551a406665?auto=format&fit=crop&q=80&w=800',
    alt: 'Lampu Hangat Resepsi Modern Adat',
    category: 'Detail Indah'
  },
  {
    id: 'g22',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    alt: 'Potret Bahagia dengan Jas Burgundy',
    category: 'Detail Indah'
  },
  {
    id: 'g23',
    url: 'https://images.unsplash.com/photo-1621478306865-3ac748cbdd50?auto=format&fit=crop&q=80&w=800',
    alt: 'Pasangan Menatap Cakrawala',
    category: 'Sesi Pranikah'
  },
  {
    id: 'g24',
    url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
    alt: 'Kriya Kain Etnik Nusantara',
    category: 'Detail Indah'
  },
  {
    id: 'g25',
    url: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=800',
    alt: 'Daun Kering Terracotta Estetis',
    category: 'Detail Indah'
  },
  {
    id: 'g26',
    url: 'https://images.unsplash.com/photo-1611106211090-8f3c79ee8542?auto=format&fit=crop&q=80&w=800',
    alt: 'Sudut Estetik Meja Makan Pernikahan Boho',
    category: 'Detail Indah'
  },
  {
    id: 'g27',
    url: 'https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21a?auto=format&fit=crop&q=80&w=800',
    alt: 'Kebersamaan Hangat di Balkon Rumah',
    category: 'Sesi Pranikah'
  },
  {
    id: 'g28',
    url: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800',
    alt: 'Tekstur Wol Lembut Burgundy',
    category: 'Detail Indah'
  },
  {
    id: 'g29',
    url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=800',
    alt: 'Setangkai Mawar Merah Hangat',
    category: 'Detail Indah'
  },
  {
    id: 'g30',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    alt: 'Cahaya Keemasan Melingkari Altar',
    category: 'Detail Indah'
  }
];
