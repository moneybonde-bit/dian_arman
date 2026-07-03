# Deployment — Undangan Digital Arman & Dian

Undangan ini di-host di Cloudflare Workers (static assets) di
`https://dian-arman.luxavian.it.com`.

## Prerequisites

- Node.js 20+
- Akun Cloudflare dengan zone `luxavian.it.com` aktif di akun yang sama
- Secrets di GitHub repo (Settings → Secrets → Actions):
  - `CLOUDFLARE_API_TOKEN` — scope: `Account: Workers Scripts:Edit`,
    `Zone: DNS:Edit` (untuk zone luxavian.it.com), `Zone: Workers Routes:Edit`
  - `CLOUDFLARE_ACCOUNT_ID` — dari dashboard CF (sidebar kanan)

## Setup pertama kali (per repo klien)

1. `git clone` repo
2. `npm install`
3. `npm run dev` — verifikasi jalan di http://localhost:3000
4. Edit file di section **Kustomisasi Klien** di bawah

## Kustomisasi klien (checklist file yang diedit per repo)

- [ ] `wrangler.jsonc` — `name` (Worker name, sama dgn subdomain) dan
      `routes[0].pattern` = `{subdomain}.luxavian.it.com`
- [ ] `src/data.ts` — semua konstanta: `BRIDE_GROOM`, `EVENTS`,
      `GALLERY_ITEMS`, `HERO_IMAGES`, `BIBLE_VERSE`, `DOA_HARAPAN`,
      `FAMILY_GROUPS`, gift info
- [ ] `index.html` — `<title>`, `<meta name="description">`,
      opsional `theme-color`
- [ ] `README.md` — nama & link repo klien

## Deploy

### Otomatis (recommended)
Push ke `main` → GitHub Action `.github/workflows/deploy-cf.yml`
menjalankan `npm run build` + `wrangler deploy`. Selesai ~1–2 menit.

### Manual (fallback lokal)
```bash
npm run build
npx wrangler deploy
```
Butuh `wrangler login` sekali di mesin lokal.

## Verifikasi setelah deploy

```bash
curl -I https://dian-arman.luxavian.it.com
```
Yang harus terlihat: `HTTP/2 200`, header `cf-ray:` ada. Lalu buka di
browser desktop + mobile, cek music player, gallery, RSVP.

## Update konten pasca-launch

Edit `src/data.ts` → `git commit` → `git push origin main`. Action
auto-redeploy. Cache CF invalidate otomatis untuk aset yang berubah
(hash di filename).

## Troubleshooting

- **404 setelah deploy**: cek `wrangler deployments list`, pastikan
  versi terbaru aktif. Cek `custom_domain: true` di `wrangler.jsonc`.
- **DNS belum resolve**: tunggu ~2 menit. Cek dashboard CF → DNS →
  record untuk subdomain sudah dibuat otomatis (proxied / orange cloud).
- **Build gagal di CI**: cek Node version di workflow = 20; jalankan
  `npm ci && npm run build` lokal dulu untuk reproduce.
- **Asset gambar tidak muncul**: URL Google Drive di `src/data.ts`
  bisa expire. Fallback: mirror foto ke Cloudflare R2 dan update URL.
- **"You do not have permission" saat deploy**: token belum punya
  scope Workers Routes:Edit untuk zone luxavian.it.com.

## Takedown (setelah acara selesai)

Soft (rekomendasi — repo tetap ada untuk arsip):
```bash
npx wrangler delete
```
Subdomain akan 404, DNS record auto-cleanup oleh CF.

Hard: arsipkan repo di GitHub (Settings → Archive) lalu `wrangler delete`.
