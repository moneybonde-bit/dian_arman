# Setup Template Repo (`moneybonde-bit/undangan-template`)

Panduan sekali-jalan untuk membuat repo template yang dipakai
`scripts/new-client.sh`. Dilakukan manual di GitHub karena butuh akses
UI (setting `Template repository` toggle).

## Langkah

1. **Buat repo baru** di GitHub:
   - Owner: `moneybonde-bit`
   - Name: `undangan-template`
   - Visibility: Private
   - Init: kosong (jangan add README/gitignore/license)

2. **Salin isi repo `dian_arman` ini** ke lokal, minus konten
   spesifik klien:

   ```bash
   git clone git@github.com:moneybonde-bit/dian_arman.git undangan-template
   cd undangan-template
   rm -rf .git
   git init
   ```

3. **Ganti bagian klien-spesifik menjadi placeholder**:

   - `wrangler.jsonc`
     - `"name": "dian-arman"` → `"name": "{{CLIENT_SUBDOMAIN}}"`
     - `"pattern": "dian-arman.luxavian.it.com"` →
       `"pattern": "{{CLIENT_SUBDOMAIN}}.luxavian.it.com"`

   - `src/data.ts` → ganti semua nama/tanggal/URL dengan placeholder
     dummy tapi struktur tetap. Contoh:
     `groom.fullName: 'Nama Mempelai Pria'`, `EVENTS[].date: 'TBD'`, dll.
     Sisakan komentar `// TODO: ganti untuk klien` di tiap section.

   - `index.html` `<title>` → `Undangan Pernikahan`
   - `README.md` → generic template intro
   - Hapus `metadata.json` (spesifik AI Studio) atau kosongkan
   - Hapus `assets/` isi klien (folder tetap ada, gitkeep)

4. **Push ke GitHub**:
   ```bash
   git add .
   git commit -m "chore: initial template scaffold"
   git branch -M main
   git remote add origin git@github.com:moneybonde-bit/undangan-template.git
   git push -u origin main
   ```

5. **Aktifkan sebagai template**:
   GitHub → Settings → General → centang **Template repository**.

6. **Set org-level secrets** (Settings → Secrets → Actions, di
   organization level `moneybonde-bit`):
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   Scope: pilih "Selected repositories" dan tambahkan pattern untuk
   repo undangan (atau "All repositories" kalau org khusus).

7. **Test dengan klien dummy**:
   ```bash
   ./scripts/new-client.sh test-klien
   ```
   Verifikasi flow sampai `curl -I` menghasilkan 200. Setelah OK,
   `wrangler delete` dan hapus repo test.

## Setelah template siap

Script `scripts/new-client.sh` di repo ini bisa dipindah/disalin ke
lokasi terpusat (misal repo tools terpisah, atau ke home directory
sebagai alias). Simpan di sini juga OK — semua repo klien lain punya
salinan yang sama karena diturunkan dari template.
