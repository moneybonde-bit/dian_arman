# Undangan Pernikahan — Arman & Dian

Undangan pernikahan digital untuk Arman Kanaf & Dian Hezedila Sharon,
25 Juli 2026 di Parigi Moutong, Sulawesi Tengah.

Live: https://dian-arman.luxavian.it.com

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4
- Motion (Framer Motion) untuk animasi
- Cloudflare Workers (static assets) untuk hosting

## Development

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Deploy

Push ke `main` → auto-deploy ke Cloudflare Workers. Detail lengkap:
[DEPLOYMENT.md](./DEPLOYMENT.md).

## Struktur konten

Semua data yang bisa diedit klien ada di [`src/data.ts`](./src/data.ts):
nama, tanggal, acara, gallery, gift info, verse, doa.
