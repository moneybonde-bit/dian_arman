import { WeddingEvent, GalleryItem, FamilyGroup } from './types';

export const HERO_IMAGES = [
  'https://storage.googleapis.com/aistudio-user-uploads/649922817876/97b489a2eb2a4f4e8abf2f3f7215359a/image.png'
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
    url: 'https://lh3.googleusercontent.com/d/19yHO_r2dWJ1DjtoFtODXpk3zZlgKaNGC',
    alt: 'Momen Bersama - MLB03472',
    category: 'Momen Bersama'
  },
  {
    id: 'g2',
    url: 'https://lh3.googleusercontent.com/d/1HaZck_KXlVYrCfnx-j4_AR60GKLP2XoG',
    alt: 'Momen Bersama - MLB03486',
    category: 'Momen Bersama'
  },
  {
    id: 'g3',
    url: 'https://lh3.googleusercontent.com/d/1WCDBcrSOrutVQ65MPht-9lajJFFfOwUX',
    alt: 'Momen Bersama - MLB03496',
    category: 'Momen Bersama'
  },
  {
    id: 'g4',
    url: 'https://lh3.googleusercontent.com/d/1EZwrN7SB-xfwT_bLhbIDjhibcfMki5Le',
    alt: 'Momen Bersama - MLB03510',
    category: 'Momen Bersama'
  },
  {
    id: 'g5',
    url: 'https://lh3.googleusercontent.com/d/1P9YxVMCHUVQNZW0HywcA-W4PmRf9rYtl',
    alt: 'Momen Bersama - MLB03526',
    category: 'Momen Bersama'
  },
  {
    id: 'g6',
    url: 'https://lh3.googleusercontent.com/d/1eVTN6pYQSVFqjS05hczssHI6svzwK-Oa',
    alt: 'Momen Bersama - MLB03532',
    category: 'Momen Bersama'
  },
  {
    id: 'g7',
    url: 'https://lh3.googleusercontent.com/d/11_p4ZBalTSen_xYBlC540qSVjHZcmkAe',
    alt: 'Momen Bersama - MLB03565',
    category: 'Momen Bersama'
  },
  {
    id: 'g8',
    url: 'https://lh3.googleusercontent.com/d/1B5m8ayVKD2_XqJJMBt1SMDegKE9Ydsl_',
    alt: 'Momen Bersama - MLB03593',
    category: 'Momen Bersama'
  },
  {
    id: 'g9',
    url: 'https://lh3.googleusercontent.com/d/1_TlIWM9myOY5rswxvMtffXJZ0NtgRNr7',
    alt: 'Momen Bersama - MLJ06181',
    category: 'Momen Bersama'
  },
  {
    id: 'g10',
    url: 'https://lh3.googleusercontent.com/d/1t3Df27EerTQtOx9_fxz6VCI_dqiwKqIV',
    alt: 'Momen Bersama - MLJ06191',
    category: 'Momen Bersama'
  },
  {
    id: 'g11',
    url: 'https://lh3.googleusercontent.com/d/11iZ84mfaITmGcRPHRtyZ5a5fYPUNBQq7',
    alt: 'Momen Bersama - MLJ06201',
    category: 'Momen Bersama'
  },
  {
    id: 'g12',
    url: 'https://lh3.googleusercontent.com/d/1T20pyLERNP3AMipbCvKWLRkQ995y6p2_',
    alt: 'Momen Bersama - MLJ06205',
    category: 'Momen Bersama'
  },
  {
    id: 'g13',
    url: 'https://lh3.googleusercontent.com/d/1bkVCptThVNFaKKru0JTksWuwQETkhSNV',
    alt: 'Momen Bersama - MLJ06215',
    category: 'Momen Bersama'
  },
  {
    id: 'g14',
    url: 'https://lh3.googleusercontent.com/d/1_AMjEcP0SR63vtZc-fCAyy_OJ1gVXQHA',
    alt: 'Momen Bersama - MLJ06242',
    category: 'Momen Bersama'
  },
  {
    id: 'g15',
    url: 'https://lh3.googleusercontent.com/d/1GenGqvBk4xXLmG5j1OOD9xHBXUv_LWGs',
    alt: 'Momen Bersama - MLJ06267',
    category: 'Momen Bersama'
  },
  {
    id: 'g16',
    url: 'https://lh3.googleusercontent.com/d/1xjNyEzIJmAk5RvON8TxNPvw0rkEEJAjC',
    alt: 'Momen Bersama - MLJ06296',
    category: 'Momen Bersama'
  },
  {
    id: 'g17',
    url: 'https://lh3.googleusercontent.com/d/1PtxGqIeFqCfNVOoe0i93Kp1iVsv-Qett',
    alt: 'Adat Bada - MLB03251',
    category: 'Adat Bada'
  },
  {
    id: 'g18',
    url: 'https://lh3.googleusercontent.com/d/1k77v2Wv_E0d6H4UwTw56qvZUQY88_5Wc',
    alt: 'Adat Bada - MLB03264',
    category: 'Adat Bada'
  },
  {
    id: 'g19',
    url: 'https://lh3.googleusercontent.com/d/1KxztDeHSnnMeKPX7LPy0ZqLlMn-UPKqC',
    alt: 'Adat Bada - MLB03282',
    category: 'Adat Bada'
  },
  {
    id: 'g20',
    url: 'https://lh3.googleusercontent.com/d/1sEgKM0akC4J8Lz86y4p3zr2GBf1WRi_Q',
    alt: 'Adat Bada - MLB03311',
    category: 'Adat Bada'
  },
  {
    id: 'g21',
    url: 'https://lh3.googleusercontent.com/d/1ocxGvF4JncfEg0FVSJoYjSqzZdRQadj7',
    alt: 'Adat Bada - MLB03332',
    category: 'Adat Bada'
  },
  {
    id: 'g22',
    url: 'https://lh3.googleusercontent.com/d/1dDLdzgOPMJXC6447O8xgsI18caaRgpkG',
    alt: 'Adat Bada - MLB03345',
    category: 'Adat Bada'
  },
  {
    id: 'g23',
    url: 'https://lh3.googleusercontent.com/d/1of_y_q2Kh_FOcD4JVDsgdwmcszPCMEmL',
    alt: 'Adat Bada - MLB03385',
    category: 'Adat Bada'
  },
  {
    id: 'g24',
    url: 'https://lh3.googleusercontent.com/d/1fWhRtyjnCQg3WFjABhuDeETeXQ330J5J',
    alt: 'Adat Bada - MLB03403',
    category: 'Adat Bada'
  },
  {
    id: 'g25',
    url: 'https://lh3.googleusercontent.com/d/17X9IQO85u6IO-pKLZDSrKitJ7FDbcXBA',
    alt: 'Adat Bada - MLB03425',
    category: 'Adat Bada'
  },
  {
    id: 'g26',
    url: 'https://lh3.googleusercontent.com/d/1SaMmul4y43lXICi4JLCXSDN0z54NznTR',
    alt: 'Adat Bada - MLB03447',
    category: 'Adat Bada'
  },
  {
    id: 'g27',
    url: 'https://lh3.googleusercontent.com/d/1uwx8A62Pfbndi6KXD4s3fsF8EAWMwz97',
    alt: 'Adat Bali - MLJ05719',
    category: 'Adat Bali'
  },
  {
    id: 'g28',
    url: 'https://lh3.googleusercontent.com/d/1nfkLlR8Ev_yMCnmcJaNYssBLmfRVzuQw',
    alt: 'Adat Bali - MLJ05750',
    category: 'Adat Bali'
  },
  {
    id: 'g29',
    url: 'https://lh3.googleusercontent.com/d/1FkpjmbmMXzJqVeZ2wyZaN1PN1SlxJAKt',
    alt: 'Adat Bali - MLJ05825',
    category: 'Adat Bali'
  },
  {
    id: 'g30',
    url: 'https://lh3.googleusercontent.com/d/11tFW8cEl-uxubKmFxjiOC3UwotUSNk78',
    alt: 'Adat Bali - MLJ05831',
    category: 'Adat Bali'
  },
  {
    id: 'g31',
    url: 'https://lh3.googleusercontent.com/d/1eZVpwVmqBIAxdpnWQwOa0aCIJcLWF20m',
    alt: 'Adat Bali - MLJ05839',
    category: 'Adat Bali'
  },
  {
    id: 'g32',
    url: 'https://lh3.googleusercontent.com/d/1H8nsKsxHC6_ZUOaq8-446K1_x85p1JL7',
    alt: 'Adat Bali - MLJ05870',
    category: 'Adat Bali'
  },
  {
    id: 'g33',
    url: 'https://lh3.googleusercontent.com/d/12DYiywDvmX1AhE6oIPzyLjTDynwRK7Dm',
    alt: 'Adat Bali - MLJ05911',
    category: 'Adat Bali'
  },
  {
    id: 'g34',
    url: 'https://lh3.googleusercontent.com/d/1WxC2PmMLGNVWbxmIM0PEyGG5Je7820Sb',
    alt: 'Adat Bali - MLJ05929',
    category: 'Adat Bali'
  },
  {
    id: 'g35',
    url: 'https://lh3.googleusercontent.com/d/1N_aLv6yaDpN23u7YYRjDgf4t1cbVoCU_',
    alt: 'Adat Bali - MLJ05944',
    category: 'Adat Bali'
  },
  {
    id: 'g36',
    url: 'https://lh3.googleusercontent.com/d/1OSJ8A0V0DMOwkgSfaL3Sr242GSdE5yu4',
    alt: 'Adat Bali - MLJ05965',
    category: 'Adat Bali'
  },
  {
    id: 'g37',
    url: 'https://lh3.googleusercontent.com/d/17WojC2mXGkXZ4XEbSz1XVyFdFzH05YGv',
    alt: 'Adat Timor Amarasi - MLJ05968',
    category: 'Adat Timor Amarasi'
  },
  {
    id: 'g38',
    url: 'https://lh3.googleusercontent.com/d/1LE3UTF5j1cxTEEeYUPrlituPZw--1Tds',
    alt: 'Adat Timor Amarasi - MLJ05992',
    category: 'Adat Timor Amarasi'
  },
  {
    id: 'g39',
    url: 'https://lh3.googleusercontent.com/d/1mFuPdM3S6GOk8NG9w026Cdke-UXUojU8',
    alt: 'Adat Timor Amarasi - MLJ06003',
    category: 'Adat Timor Amarasi'
  },
  {
    id: 'g40',
    url: 'https://lh3.googleusercontent.com/d/1BXExMoZ3rx9n16g_Dw6L41_86NrZuuMe',
    alt: 'Adat Timor Amarasi - MLJ06008',
    category: 'Adat Timor Amarasi'
  },
  {
    id: 'g41',
    url: 'https://lh3.googleusercontent.com/d/1vE5FluB0L_EZpFe4YdVYdjYAfPEvGjh9',
    alt: 'Adat Timor Amarasi - MLJ06031',
    category: 'Adat Timor Amarasi'
  },
  {
    id: 'g42',
    url: 'https://lh3.googleusercontent.com/d/1uEzNrLmulwXmOkLSM8In166wjp-z3dyN',
    alt: 'Adat Timor Amarasi - MLJ06061',
    category: 'Adat Timor Amarasi'
  },
  {
    id: 'g43',
    url: 'https://lh3.googleusercontent.com/d/17iixftA63H9bcRPxbg1R-Ibo1qlezz7P',
    alt: 'Adat Timor Amarasi - MLJ06130',
    category: 'Adat Timor Amarasi'
  },
  {
    id: 'g44',
    url: 'https://lh3.googleusercontent.com/d/1ZjfqhuIAfR6rbOdgguD2uEdTurLTZ7Kw',
    alt: 'Adat Timor Amarasi - MLJ06141',
    category: 'Adat Timor Amarasi'
  },
  {
    id: 'g45',
    url: 'https://lh3.googleusercontent.com/d/1d0D7DdwNhKCSsGErhRYsoNGu4xQGdnjD',
    alt: 'Adat Timor Amarasi - MLJ06150',
    category: 'Adat Timor Amarasi'
  },
  {
    id: 'g46',
    url: 'https://lh3.googleusercontent.com/d/1r4JAcAAGNLtrFQSjSdomsBsx7qQrWihF',
    alt: 'Adat Timor Amarasi - MLJ06178',
    category: 'Adat Timor Amarasi'
  }
];
