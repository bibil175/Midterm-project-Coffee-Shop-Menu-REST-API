# Midterm Project: Coffee Shop Menu REST API

## Identitas

- **Nama:** Salsabila Azkia
- **NIM:** 20250040060
- **Tema:** Coffee Shop Menu
- **Resource utama:** `/menus`

## Deskripsi

REST API sederhana untuk mengelola menu kedai kopi, dibuat dengan Node.js dan Express 5. Data disimpan di dalam array JavaScript (tanpa database), sehingga data kembali ke awal setiap server dijalankan ulang.

Setiap item menu punya field: `id`, `name`, `category`, `price`, `stock`.

## Cara menjalankan

1. Pastikan Node.js sudah terpasang (`node -v`).
2. Buka terminal di folder project, lalu install dependency:

```bash
npm install
```

3. Jalankan server:

```bash
npm run dev
```

4. Server berjalan di `http://localhost:3000`.

## Token untuk DELETE

Route DELETE dilindungi middleware `requireAuth`. Kirim header berikut:

```
x-auth-token: kopi123
```

Tanpa header ini, server membalas **401 Unauthorized**.

## Daftar route

| No | Method | Path | Fungsi | Kode sukses |
|---|---|---|---|---|
| 1 | GET | `/` | Pesan selamat datang (nama dan tema) | 200 |
| 2 | GET | `/menus` | Tampilkan semua menu | 200 |
| 3 | GET | `/menus/:id` | Tampilkan satu menu, id tidak ada = 404 | 200 |
| 4 | POST | `/menus` | Tambah menu baru, field kurang = 400 | 201 |
| 5 | PUT | `/menus/:id` | Ubah menu, id tidak ada = 404 | 200 |
| 6 | DELETE | `/menus/:id` | Hapus menu, wajib token, tanpa token = 401 | 200 |
| 7 | GET | `/menus/category{/:name}` | Filter menu per kategori, tanpa nama = semua | 200 |
| 8 | GET | `/files/*path` | Tampilkan path wildcard sebagai array | 200 |
| 9 | GET | URL tidak dikenal | Dijawab handler 404 | 404 |

Halaman tambahan: `GET /tampilan` menampilkan menu dalam bentuk kartu (HTML), mengambil data dari `/menus`.

## Contoh body

**POST /menus**

```json
{
  "name": "Mocha",
  "category": "coffee",
  "price": 30000,
  "stock": 10
}
```

**PUT /menus/1** (field yang dikirim saja yang diubah)

```json
{ "price": 20000 }
```

## Struktur folder

```
midterm-20250040060-salsabilaAzkia/
├── index.js          # server: middleware -> routes -> 404 -> error handler
├── middleware.js     # logger, requireAuth, notFound, errorHandler
├── routes/
│   └── menus.js      # route /menus + data array
├── public/
│   └── menu.html     # halaman tampilan menu
├── screenshots/      # bukti tes Postman
├── package.json
└── README.md
```

## Screenshot

Bukti pengujian semua route ada di folder `screenshots/`.
