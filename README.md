# GerbangCak — Sistem Registrasi & Validasi Kendaraan Angkutan

Sistem berbasis web untuk verifikasi kendaraan dan pengemudi menggunakan **QR Code** oleh Dinas Perhubungan. Dibangun dengan Laravel 13, Inertia.js, dan React.

---

## 🚀 Fitur Utama

| Fitur | Role |
|---|---|
| Manajemen data kendaraan & pengemudi | Super Admin |
| Import data dari Excel | Super Admin |
| Generate & cetak QR Code kendaraan | Super Admin |
| Live Scanner kamera untuk validasi lapangan | Petugas |
| Halaman hasil scan dengan info kendaraan & driver | Admin & Petugas |

---

## ⚙️ Kebutuhan Sistem

Pastikan semua software berikut sudah terinstall di komputer Anda:

| Software | Versi Minimum | Cek dengan |
|---|---|---|
| **PHP** | 8.2+ | `php -v` |
| **Composer** | 2.x | `composer -V` |
| **Node.js** | 18+ | `node -v` |
| **NPM** | 9+ | `npm -v` |
| **MySQL** | 8.x | via XAMPP/Laragon |
| **Git** | - | `git --version` |

> **Rekomendasi:** Gunakan [Laragon](https://laragon.org/) (Windows) karena sudah include PHP, MySQL, dan Composer sekaligus.

---

## 📦 Cara Instalasi & Menjalankan

### Langkah 1 — Clone atau Download Project

```bash
git clone <url-repository-anda> gerbangcak
cd gerbangcak
```

---

### Langkah 2 — Install Dependensi PHP

```bash
composer install
```

---

### Langkah 3 — Install Dependensi Node.js / NPM

```bash
npm install --legacy-peer-deps
```

---

### Langkah 4 — Salin & Konfigurasi File `.env`

```bash
cp .env.example .env
```

Buka file `.env` dan sesuaikan konfigurasi berikut dengan kondisi komputer Anda:

- `APP_NAME` — Nama aplikasi (contoh: GerbangCak)
- `APP_URL` — URL lokal server Anda (contoh: `http://localhost:8000`)
- `DB_DATABASE` — Nama database MySQL yang akan digunakan
- `DB_USERNAME` — Username MySQL Anda
- `DB_PASSWORD` — Password MySQL Anda (kosongkan jika tidak ada password)

> 🔒 **Jangan pernah membagikan isi file `.env` kepada siapapun** karena berisi informasi rahasia seperti APP_KEY dan kredensial database.

---

### Langkah 5 — Generate Application Key

```bash
php artisan key:generate
```

---

### Langkah 6 — Buat Database

Buka **phpMyAdmin** (atau MySQL client lain) dan buat database baru bernama:
```
gerbangcek
```

---

### Langkah 7 — Jalankan Migrasi & Seeder

Perintah ini akan membuat semua tabel dan mengisi data awal (akun Admin & Petugas):

```bash
php artisan migrate --seed
```

> ⚠️ Jika ingin **reset ulang** database dari nol (hapus semua data lama):
> ```bash
> php artisan migrate:fresh --seed
> ```

---

### Langkah 8 — Jalankan Server

Buka **2 terminal terpisah** dan jalankan masing-masing:

**Terminal 1 — Laravel Backend:**
```bash
php artisan serve
```

**Terminal 2 — Vite Frontend (React):**
```bash
npm run dev
```

Aplikasi sekarang dapat diakses di: **[http://localhost:8000](http://localhost:8000)**

---

## 🔑 Akun Default

| Role | Email | Password |
|---|---|---|
| **Super Admin** | `admin@gerbangcek.com` | `password` |
| **Petugas Scan** | `petugas@gerbangcek.com` | `password` |

> ⚠️ Segera ganti password setelah login pertama kali.

---

## 📱 Testing Scanner dari HP (Opsional)

Fitur kamera scanner membutuhkan **HTTPS** untuk berjalan di browser HP. Gunakan Localtunnel untuk membuat tunnel sementara:

**1. Build asset terlebih dahulu:**
```bash
npm run build
```

**2. Jalankan server Laravel:**
```bash
php artisan serve
```

**3. Buka tunnel di terminal baru:**
```bash
npx localtunnel --port 8000
```

**4. Salin URL `https://....loca.lt` yang muncul**, lalu update di `.env`:
```env
APP_URL=https://xxxx-xxxx.loca.lt
```

**5. Clear config & build ulang:**
```bash
php artisan config:clear
npm run build
```

**6. Buka URL tunnel di HP**, klik "Click to Continue" jika diminta, lalu login sebagai **Petugas Scan**.

---

## 📁 Struktur Role & Akses Halaman

```
/ (root)              → Halaman Welcome (publik)
/dashboard            → Dashboard (semua user login)
/pengemudi            → Manajemen Pengemudi (Admin only)
/kendaraan            → Manajemen Kendaraan + Cetak QR (Admin only)
/import               → Import Excel (Admin only)
/petugas/scanner      → Kamera Live Scanner (Petugas only)
/scan/{kode_unik}     → Hasil Scan Validasi (Admin & Petugas)
```

---

## 🛠️ Tech Stack

- **Backend:** Laravel 13, Spatie Permission
- **Frontend:** React 18, Inertia.js, Tailwind CSS
- **Build Tool:** Vite
- **QR Code (Generate):** qrcode.react
- **QR Code (Scan):** html5-qrcode
- **Database:** MySQL

---

## 📝 Catatan

- Data kendaraan dan pengemudi dapat diimport dari file Excel melalui menu **Import** di panel Admin.
- QR Code kendaraan di-generate otomatis saat kendaraan ditambahkan dan dapat dicetak dari tabel **Manajemen Kendaraan** (tombol "Cetak QR").
- Setiap kendaraan memiliki `kode_unik` yang menjadi identifier pada URL hasil scan.
