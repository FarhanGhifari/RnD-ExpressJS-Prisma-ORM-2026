# Express Basic - Product API

RESTful API sederhana untuk mengelola data produk menggunakan **Express.js v5.2.1** (dengan middleware JSON bawaan dan penanganan error async native) serta **Prisma ORM** yang diintegrasikan dengan database **PostgreSQL**. Proyek ini dilengkapi dengan otomatisasi seeding database dan pengujian API otomatis menggunakan Postman.

---

## Fitur Utama

- **RESTful API CRUD Lengkap**: Penanganan pembuatan, pembacaan, pembaruan, dan penghapusan produk.
- **Prisma ORM & PostgreSQL**: Manajemen skema database yang aman dengan validasi tipe data mutlak (_Type-Safety_).
- **Otomatisasi Database Seeding**: Skrip pengisian data tiruan (_mock data_) otomatis untuk mempermudah pengujian.
- **Skrip Pengujian Postman**: Collection Postman terintegrasi yang mencakup pengujian sukses, skenario gagal seperti error input atau data tidak ditemukan dan batas performa waktu respon (_Response Time Check_ di bawah 300ms).

---

## Persyaratan Sistem

Pastikan Anda memiliki perangkat lunak berikut terinstal di komputer Anda:

- **Node.js** (Versi LTS, v18.x, v20.x, atau yang lebih baru)
- **NPM** (Bawaan dari Node.js)
- **PostgreSQL** database aktif
- **Text Editor** (direkomendasikan VS Code)

---

## Instalasi & Konfigurasi

Ikuti langkah-langkah di bawah ini untuk memasang proyek secara lokal:

### 1. Pemasangan Dependensi

Buka terminal pada direktori proyek Anda, lalu jalankan perintah berikut untuk mengunduh semua library pihak ketiga yang dibutuhkan:

```bash
npm install
```

### 2. Setup Environment Variables

1. Salin berkas template `.env.example` menjadi berkas `.env` baru:
   ```bash
   cp .env.example .env
   ```
2. Buka berkas `.env` yang baru dibuat, lalu sesuaikan URL koneksi database PostgreSQL Anda pada variabel `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://postgres:password123@localhost:5432/expressbasic?schema=public"
   ```

### 3. Migrasi Skema Database

Jalankan migrasi skema Prisma untuk membentuk struktur tabel `Product` secara fisik di database PostgreSQL Anda:

```bash
npx prisma migrate dev --name init
```

### 4. Database Seeding

Untuk mengisi database Anda dengan data tiruan awal agar API dapat langsung diuji, jalankan skrip seeder bawaan:

```bash
npx prisma db seed
```

---

## Menjalankan Aplikasi

Pilih salah satu perintah di bawah ini untuk menghidupkan server Express:

### Mode Pengembangan (Development)

Untuk menjalankan server dengan fitur _auto-reload_ otomatis saat Anda mengubah kode:

```bash
npm run dev
```

### Mode Produksi (Production)

Untuk menjalankan server dalam mode standar:

```bash
npm start
```

Jika berhasil berjalan, Anda akan melihat pesan berikut di terminal Anda:

```text
Server Express berjalan secara optimal di http://localhost:3000
```

---

## Struktur Folder Proyek

Cetak biru struktur folder dari aplikasi ini adalah sebagai berikut:

```text
express-basic/
├── node_modules/             # Library pihak ketiga dari NPM
├── prisma/
│   ├── migrations/           # Rekam jejak migrasi database
│   ├── schema.prisma         # File konfigurasi utama Prisma ORM & Model Data
│   └── seed.js               # Skrip pengisian data dummy
├── src/
│   ├── config/
│   │   └── prisma.js         # Instansiasi Singleton Prisma Client
│   ├── controllers/
│   │   └── productController.js # Lapisan Logika Bisnis CRUD Produk
│   ├── routes/
│   │   └── productRoute.js   # Lapisan Rute Endpoints HTTP
│   └── app.js                # Entry Point Utama Express server
├── .env                      # File konfigurasi sensitif (diabaikan Git)
├── .env.example              # Template contoh konfigurasi environment
├── .gitignore                # File instruksi untuk mengabaikan berkas di Git
├── Express-Basic-Product-API.postman_collection.json # File pengujian Postman
├── package.json              # Manifes proyek Node.js
└── prisma.config.ts          # File konfigurasi internal Prisma
```

---

## Daftar API Endpoints

Semua endpoint API diawali dengan rute global prefix `/api`.

| HTTP Method | Endpoint            | Deskripsi                            | Request Body (JSON) / Params                                        | Status Sukses |
| :---------- | :------------------ | :----------------------------------- | :------------------------------------------------------------------ | :------------ |
| **POST**    | `/api/products`     | Membuat produk baru                  | `{ "name": "string", "price": number, "stock": number }`            | `201 Created` |
| **GET**     | `/api/products`     | Mengambil seluruh produk             | _Tidak ada_                                                         | `200 OK`      |
| **GET**     | `/api/products/:id` | Mengambil satu produk berdasarkan ID | `id` (integer) pada URL                                             | `200 OK`      |
| **PUT**     | `/api/products/:id` | Memperbarui produk berdasarkan ID    | `{ "name": "string", "price": number, "stock": number }` (opsional) | `200 OK`      |
| **DELETE**  | `/api/products/:id` | Menghapus produk berdasarkan ID      | `id` (integer) pada URL                                             | `200 OK`      |

---

## Pengujian API dengan Postman

Proyek ini telah dilengkapi berkas pengujian otomatis berstandar profesional di [Express-Basic-Product-API.postman_collection.json](./Express-Basic-Product-API.postman_collection.json).

### Cara Mengimpor & Menjalankan Pengujian:

1. Buka aplikasi **Postman**.
2. Klik tombol **Import** di kiri atas, lalu seret file `Express-Basic-Product-API.postman_collection.json` ke dalamnya.
3. Klik nama koleksi **Express Basic Product API** di sidebar kiri.
4. Klik tombol **Run Collection** (Runner) untuk melakukan pengujian otomatis massal.
5. Anda akan melihat total **36 asersi pengujian** berstatus **Passed** (Hijau), yang menguji skenario sukses, skenario gagal, dan memverifikasi kecepatan performa respon API di bawah 300ms.
