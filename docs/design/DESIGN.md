# Care Care - DESIGN.md

Versi 1.0 | Pasangan dari `docs/spec/carecare-app-spec.json`

Dokumen ini menentukan **bagaimana Care Care terlihat, terasa, dan terbaca**. Spec JSON menentukan **apa yang dilakukan aplikasi**. Jika keduanya bertentangan soal visual, **DESIGN.md menang**. Jika bertentangan soal perilaku (stok, harga, status pesanan), **spec JSON menang**.

Cara pakai untuk AI coder: baca seluruh dokumen sebelum membuat atau mengubah UI apa pun. Bagian 2 (daftar larangan) dan Bagian 14 (checklist review) wajib diperiksa setiap kali.

---

## 1. Gagasan desain

### Konsep: Kotak dan Lipatan

**Care Care** berarti *pakaian* dalam bahasa Makassar. Dua hal dari dunia pakaian dan dari logo menjadi dasar seluruh desain:

1. **Kotak.** Logo dibangun dari balok persegi yang saling mengunci, dan sarung sutra Sulawesi Selatan terkenal dengan motif kotak-kotak tenun. Maka tata letak toko ini adalah **kisi (lattice)**: sel-sel produk berbagi garis navy yang sama, seperti kain tenun atau lembar lookbook yang ditempel. Bukan kumpulan kartu terpisah.
2. **Lipatan.** Logo punya sudut kertas yang terlipat dengan bayangan terracotta gelap. Dari sini lahir dua bentuk: **potongan sudut 45 derajat** (chamfer) untuk blok besar, dan **sudut halaman yang dilipat** (dog-ear) sebagai tanda wishlist, seperti melipat pojok halaman katalog yang ingin kamu ingat.

### Satu hal yang harus diingat orang

**Sudut yang terlipat.** Itu satu-satunya "momen ajaib" di desain ini. Semua hal lain sengaja tenang dan disiplin supaya lipatan itu menonjol.

### Kepribadian

Tegas, jujur, dan hangat. Seperti toko pakaian yang pemiliknya mengenal pembelinya. Brutalis dalam struktur (garis tebal, bayangan keras), tapi **bukan** berisik: sedikit warna, sedikit stiker, banyak ruang di dalam sel.

### Perubahan terhadap spec v1.1 (hasil review desain)

Setelah dicek terhadap pola desain "bawaan AI" yang umum, beberapa pilihan di spec sebelumnya saya ganti:

| Di spec v1.1 | Masalahnya | Sekarang |
|---|---|---|
| Latar krem `#FBF7F2` + aksen terracotta | Kombinasi krem + terracotta adalah klise desain buatan AI | Latar **abu-lavender dingin** `#F3F3F8` yang berasal dari navy logo |
| Font Archivo Black / Space Grotesk, Inter / DM Sans | Pilihan default yang dipakai di mana-mana | **Archivo variabel (lebar diperluas)** + **Instrument Sans** |
| Teks "kapital semua" untuk label | Ciri khas halaman hasil generate | Kapital hanya untuk judul display. Label memakai huruf kecil biasa |
| Hitam `#1B1B38` | Hitam bernuansa adalah pengganti hitam yang klise | Teks memakai **navy logo** langsung |
| Warna terracotta dipakai untuk teks | Kontras `#B8523C` di atas `#F3F3F8` hanya 4,41 (gagal AA) | Teks tautan memakai **brick-deep** `#9A3F2B` (6,09) |
| Badge stiker di banyak tempat | Dekorasi tanpa makna | Stiker hanya untuk status produk, maksimal satu per produk |

---

## 2. Daftar larangan (anti "AI slop")

AI coder dilarang membuat hal-hal berikut. Ini bukan selera, ini aturan.

### Gaya dan struktur

- Kartu bulat identik dengan bayangan abu lembut (`shadow-md`, `rounded-xl`). Kita memakai **kisi dengan garis bersama**.
- Gradien sebagai dekorasi (`bg-gradient-*`), efek kaca (`backdrop-blur`), glow, atau blob.
- Satu radius untuk semua. Aturan radius ada di Bagian 5.
- Latar krem hangat, atau latar hitam dengan satu aksen neon.
- Menaruh label huruf kapital ber-tracking lebar di atas setiap judul (eyebrow).
- Penanda nomor `01 / 02 / 03` pada konten yang bukan urutan. Nomor hanya boleh untuk langkah checkout dan timeline pengiriman.
- Rangkaian meta dengan titik tengah (`A · B · C`) atau label berbentuk `KATA — potongan`.
- Panah `→` yang ditempel di akhir teks tombol atau tautan.
- Font monospace untuk label kecil atau data. Nomor resi dan nomor pesanan memakai `tabular-nums` pada font body.
- Mengaksenkan satu kata di judul dengan warna atau miring.
- Animasi fade-and-slide-up pada setiap section, atau hover transisi pada setiap kartu.
- Emoji di antarmuka.
- Teks placeholder seperti "Lorem ipsum" atau salinan klise ("Solusi terbaik untuk gayamu").

### Kelas Tailwind yang dilarang

`rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `bg-gradient-*`, `from-*`, `via-*`, `to-*`, `backdrop-blur-*`, `text-gray-*`, `bg-gray-*`, `bg-slate-*`, `text-slate-*`, `ring-blue-*`, warna Tailwind bawaan apa pun. **Hanya token dari Bagian 3 yang boleh dipakai.** Satu-satunya `rounded` yang diizinkan adalah `rounded-full` pada stiker dan status pill.

### Komponen bawaan

shadcn/ui memakai radius dan bayangan lembut secara default. **Semua komponen shadcn yang dipakai harus di-override** sesuai Bagian 9. Jangan membiarkan tampilan bawaannya lolos.

---

## 3. Warna

### Token

| Token | Hex | Peran | Catatan |
|---|---|---|---|
| `ink` | `#2D2D56` | Teks utama, semua garis, blok gelap | Navy dari logo |
| `brick` | `#B8523C` | Tombol utama, blok warna besar, aksen | Terracotta dari logo |
| `brick-deep` | `#9A3F2B` | Teks berwarna, tautan, hover tombol utama | Versi aman untuk teks. Bukan warna bayangan logo (`#A3412D`) |
| `gold` | `#F0B429` | Stiker, penanda, sorotan kecil | Benang emas tenun. **Aksen pendukung, pakai hemat** |
| `page` | `#F3F3F8` | Latar halaman | Abu-lavender dingin |
| `surface` | `#FFFFFF` | Isi sel, form, tabel | |
| `line-soft` | `#E4E4EE` | Pemisah baris di dalam tabel dan daftar | |
| `muted` | `#5B5B7B` | Teks sekunder | |
| `success` | `#1F7A4D` | Berhasil, selesai | |
| `danger` | `#B3261E` | Error, hapus | |
| `warning` | `#8A5A00` | Teks peringatan (latar memakai `gold`) | |
| `info` | `#245AA8` | Informasi netral | |

### Proporsi pemakaian

Sekitar **60% `page` dan `surface`**, **30% `ink`** (garis, teks, blok gelap), **9% `brick`**, **1% `gold`**. Jika sebuah layar terasa terlalu oranye atau terlalu kuning, kurangi.

### Pasangan warna terverifikasi (WCAG 2.1)

| Teks | Latar | Rasio | Boleh untuk |
|---|---|---|---|
| `ink` | `surface` | 12,95 | Semua teks |
| `ink` | `page` | 11,71 | Semua teks |
| `surface` (putih) | `ink` | 12,95 | Semua teks |
| `surface` (putih) | `brick` | 4,87 | Teks 16px ke atas, tebal. Tombol utama |
| `surface` (putih) | `brick-deep` | 6,73 | Semua teks |
| `ink` | `gold` | 6,95 | Semua teks (stiker) |
| `gold` | `ink` | 6,95 | Semua teks |
| `muted` | `page` | 5,88 | Teks sekunder |
| `brick-deep` | `page` | 6,09 | Teks dan tautan |
| `success` / `danger` / `warning` / `info` | `surface` | 5,3 sampai 6,8 | Teks status |

### Pasangan yang DILARANG

| Pasangan | Rasio | Alasan |
|---|---|---|
| `ink` di atas `brick` | 2,66 | Gagal total |
| `brick` sebagai teks di atas `page` | 4,41 | Gagal AA. Pakai `brick-deep` |
| `gold` sebagai teks di atas `surface` atau `page` | rendah | Tidak terbaca. `gold` hanya sebagai latar |
| Teks berwarna apa pun di atas foto tanpa lapisan solid | tidak terukur | Beri blok `ink` atau `surface` di belakang teks |

### Aturan lain

- **Warna tidak pernah menjadi satu-satunya penanda.** Status selalu punya ikon dan teks.
- Mode gelap **tidak ada** di storefront versi 1. Identitas ini bergantung pada permukaan terang dan garis navy.

---

## 4. Tipografi

### Font

| Peran | Font | Pengaturan |
|---|---|---|
| **Display** (nama brand, hero, H1, H2) | **Archivo** (variabel) | Berat 800 sampai 900, `wdth` 112 sampai 125 (diperluas), huruf kapital, tracking `-0.02em`, line-height 0,92 sampai 1,05 |
| **Body dan antarmuka** (H3 ke bawah, teks, tombol, form, tabel) | **Instrument Sans** | Berat 400, 500, 600, 700. Sentence case |

Alasan: Archivo yang diperluas terasa seperti papan nama dan label pakaian, selaras dengan balok logo yang lebar dan kokoh. Instrument Sans netral dan jernih untuk teks Indonesia yang panjang. Keduanya tersedia di Google Fonts dan bisa dimuat lewat `next/font`.

**Verifikasi saat implementasi:** cek bahwa sumbu `wdth` Archivo benar-benar termuat di hasil build. Jika tidak, tampilan melebar tidak akan muncul dan kita perlu menyesuaikan konfigurasi font.

### Skala (mobile sampai desktop)

| Gaya | Ukuran | Line-height | Font | Dipakai untuk |
|---|---|---|---|---|
| `display` | 56 sampai 128px | 0,92 | Archivo 900, wdth 125 | Nama brand di hero. **Sekali per halaman** |
| `h1` | 36 sampai 64px | 1,0 | Archivo 800, wdth 118 | Judul halaman |
| `h2` | 28 sampai 44px | 1,05 | Archivo 800, wdth 112 | Judul section |
| `h3` | 22 sampai 28px | 1,2 | Instrument Sans 700 | Sub-judul, nama koleksi |
| `h4` | 18 sampai 20px | 1,3 | Instrument Sans 700 | Judul kartu dan panel |
| `body` | 16px | 1,55 | Instrument Sans 400 | Teks utama |
| `small` | 14px | 1,5 | Instrument Sans 400 atau 500 | Deskripsi, tabel admin |
| `micro` | 13px | 1,4 | Instrument Sans 600 | **Hanya** stiker dan teks hukum |

Tidak ada teks di bawah 13px. Teks isi dan deskripsi tidak di bawah 14px.

### Aturan

- **Huruf kapital hanya untuk `display`, `h1`, `h2`, dan wordmark.** Tombol, label, nama produk, dan navigasi memakai sentence case.
- Panjang baris teks maksimal **65 karakter** (`max-w-prose` atau `max-w-[65ch]`).
- Harga memakai **angka tabular** (`font-variant-numeric: tabular-nums`) dan berat 700.
- Format rupiah: `Rp 160.000` dengan spasi tak terputus (`Rp\u00A0160.000`). Harga coret (`compare_at_price`) memakai `muted` dan `line-through`, selalu di samping harga aktif.
- Teks berbahasa Indonesia rata-rata lebih panjang dari Inggris. Rancang tombol dan label agar muat tanpa terpotong. Jangan memakai lebar tetap pada teks.
- Rata kiri. Jangan rata tengah kecuali judul hero, empty state, dan halaman 404.

---

## 5. Bentuk: garis, radius, bayangan, potongan, lipatan

### Garis (informasi, bukan hiasan)

Ketebalan garis **menandakan hierarki**:

| Ketebalan | Warna | Dipakai untuk |
|---|---|---|
| **3px** | `ink` | Bingkai halaman (header, hero), tombol utama, garis atas panel penting |
| **2px** | `ink` | Elemen interaktif (input, tombol sekunder, chip ukuran) dan garis kisi katalog |
| **1px** | `line-soft` | Pemisah baris dalam tabel dan daftar. Data, bukan struktur |

Di mobile, 3px menjadi 2px dan 2px menjadi 1,5px agar tidak terlalu berat.

### Radius

| Elemen | Radius |
|---|---|
| Sel, kartu, tombol, input, chip, tabel, modal | **0** |
| Stiker dan status pill | **pill penuh** (`rounded-full`) |
| Avatar | **0** (persegi) |

Tidak ada nilai radius di antaranya.

### Bayangan keras

Bayangan hanya ada untuk menandakan **elemen yang bisa ditekan**.

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `shadow-hard` | `4px 4px 0 0 ink` | Tombol utama dan sekunder dalam keadaan normal |
| `shadow-hard-sm` | `2px 2px 0 0 ink` | Saat hover. Elemen bergeser `2px 2px` mendekati bayangan |
| tanpa bayangan | | Saat ditekan (`active`): elemen turun penuh ke posisi bayangan |

Sel kisi katalog, panel, dan tabel **tidak** punya bayangan.

### Potongan sudut (chamfer)

Sudut kanan atas dipotong 45 derajat, mengulang diagonal pada logo. Hanya untuk **blok besar**:

- hero
- panel total pembayaran di checkout
- blok CTA di footer
- gambar utama halaman About

Ukuran potongan: `20px` di mobile, `32px` di desktop. Maksimal **dua blok chamfer per layar**.

Karena `clip-path` memotong garis tepi, elemen bergaris yang dipotong memakai teknik dua lapis (lihat Bagian 13).

### Lipatan (dog-ear) = wishlist

| Keadaan | Tampilan |
|---|---|
| Belum di-wishlist | Ikon sudut kecil (garis, 20px) di pojok kanan atas gambar. Area sentuh 44x44px |
| Sudah di-wishlist | Pojok gambar **terlipat**: segitiga `brick-deep` 28px dengan sisi miringnya menampilkan warna `page`. Animasi melipat 160ms |
| Pengguna belum login | Tap membuka dialog masuk, bukan melipat |

Lipatan juga dipakai di **PDP** (tombol wishlist di pojok gambar utama) dan **halaman Wishlist** (semua kartu terlipat). Tidak dipakai untuk hal lain.

### Stiker (status produk)

- Bentuk: pill, miring `-3` sampai `3` derajat, garis 2px `ink`.
- Latar `gold` dengan teks `ink`, kecuali **Habis** (latar `ink`, teks putih).
- Teks: sentence case, 13px, berat 600. Contoh: "Baru", "Terlaris", "Sale", "Drop panas".
- **Satu stiker per produk.** `Habis` mengalahkan stiker lain.
- Stiker menempel di pojok kiri atas gambar dan boleh menimpa garis sel sedikit.
- Tidak ada stiker bentuk bintang (starburst). Bentuk itu milik desain lama.

---

## 6. Tata letak dan kisi

### Dasar

| Aspek | Nilai |
|---|---|
| Satuan spasi | kelipatan 4px: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128` |
| Lebar maksimum konten | `1360px` |
| Padding halaman | 16px (mobile), 24px (tablet), 40px (desktop) |
| Kolom | 4 (mobile), 8 (tablet), 12 (desktop) |
| Titik patah | `640px` (tablet), `1024px` (desktop) |
| Area sentuh minimum | 44x44px |

### Kisi katalog (lattice)

Sel produk **berbagi garis**. Tidak ada celah antar sel dan tidak ada bayangan.

| Layar | Kolom |
|---|---|
| Mobile | 2 |
| Tablet | 3 |
| Desktop | 4 |

Pada desktop, setiap sekitar 8 sel boleh ada **satu sel besar 2x2** untuk produk unggulan, supaya ritme kisi tidak monoton. Maksimal satu sel besar per layar penuh.

### Wireframe

**Beranda (desktop)**

```
+--------------------------------------------------------------------------+
| [logo]  Baru  Pria  Wanita  Aksesori        Cari   Wishlist  Keranjang(2)|
+==========================================================================+
|                                       /---------------------------------+|
|  care-care                           /   foto drop terbaru              ||
|  (display, besar)                   |   (bingkai 3px, chamfer,         ||
|                                     |    garis bingkai kedua bergeser  ||
|  pakaian dalam bahasa Makassar.     |    di belakang, seperti logo)    ||
|  Drop terbaru: [nama drop]          |                                  ||
|  [Lihat koleksi terbaru]            |                                  ||
+--------------------------------------------------------------------------+
|  Kategori: kisi 4 sel berbagi garis (foto + nama)                        |
+--------------------------------------------------------------------------+
|  Produk terbaru (kisi 4 kolom, sel 2x2 untuk produk unggulan)            |
+--------------------------------------------------------------------------+
|  Tentang nama Care Care (satu paragraf, rata kiri, foto kecil)           |
+--------------------------------------------------------------------------+
|  Footer: blok ink + pita tenun kotak-kotak + info toko + tautan          |
+--------------------------------------------------------------------------+
```

**Katalog (desktop)**

```
+--------------------------------------------------------------------------+
| Katalog                                       Urutkan: [Terbaru   v]     |
+---------------+----------------------------------------------------------+
| Filter        |  +----------+----------+----------+----------+           |
| Kategori      |  | foto     | foto     | foto     | foto     |           |
| Ukuran        |  | Nama     | Nama     | Nama     | Nama     |           |
| Warna         |  | Rp xxx   | Rp xxx   | Rp xxx   | Rp xxx   |           |
| Harga         |  +----------+----------+----------+----------+           |
| Ketersediaan  |  | ...      | (2x2)    |          | ...      |           |
+---------------+----------------------------------------------------------+
```
Di mobile, filter menjadi drawer dari bawah dengan tombol "Filter" dan "Urutkan" yang menempel di atas daftar.

**Detail produk (mobile)**

```
+-------------------------------+
| < Katalog              [bag 2]|
+-------------------------------+
| [foto utama 4:5, geser]   [/] |  <- [/] = lipatan wishlist
|  (stiker)                     |
+-------------------------------+
| Nama produk                   |
| Rp 160.000   Rp 200.000       |
| Ukuran                        |
| [S] [M] [L] [XL]  (XL habis)  |
| Warna: Hitam                  |
| Jumlah  [- 1 +]               |
| Stok tinggal 3                |
+-------------------------------+
| > Deskripsi                   |
| > Panduan ukuran              |
| > Pengiriman dan retur        |
+-------------------------------+
| Ulasan 4,8 (23)               |
+-------------------------------+
| Produk lain                   |
+-------------------------------+
| [ Masukkan ke keranjang ]     |  <- menempel di bawah layar
+-------------------------------+
```

**Checkout (desktop)**

```
+--------------------------------------+-----------------------+
| 1 Alamat                             | Ringkasan pesanan     |
|   alamat tersimpan / tambah baru     |  item, jumlah         |
| 2 Pengiriman                         |  Subtotal             |
|   pilihan kurir dari Biteship        |  Diskon               |
| 3 Pembayaran                         |  Ongkos kirim         |
|   VA / E-Wallet / QRIS               |  Biaya layanan        |
|   (biaya layanan tampil di sini)     |  [Total  Rp xxx]      |
|                                      |  (blok ink, chamfer)  |
|                                      |  [Bayar sekarang]     |
+--------------------------------------+-----------------------+
```
Nomor 1, 2, 3 di sini sah karena memang urutan langkah.

**Dashboard admin**

```
+----------+------------------------------------------------+
| Sidebar  | Hari ini: Pendapatan | Pesanan | Perlu diproses |
| (ink)    +------------------------------------------------+
| Dashboard| Grafik penjualan (satu warna: brick)           |
| Pesanan  +----------------------+-------------------------+
| Produk   | Pesanan perlu aksi   | Stok menipis            |
| ...      | (tabel padat)        | (tabel padat)           |
+----------+----------------------+-------------------------+
```

---

## 7. Gerak

Prinsip: **gerak menjawab tindakan pengguna.** Tidak ada gerak dekoratif yang berjalan sendiri, kecuali satu.

### Satu momen terorkestrasi

Saat beranda dimuat pertama kali dalam satu sesi, **blok-blok logo bergeser dan saling mengunci** menjadi logo penuh di hero (sekitar 900ms), lalu berhenti. Setelah itu tidak ada lagi. Ditandai di `sessionStorage` supaya tidak berulang di setiap kunjungan beranda dalam sesi yang sama.

### Gerak sebagai respons

| Tindakan | Gerak | Durasi |
|---|---|---|
| Tekan tombol | Turun ke posisi bayangan | 80ms |
| Hover tombol | Bergeser mendekati bayangan | 80ms |
| Tap wishlist | Pojok melipat | 160ms |
| Masukkan ke keranjang | Angka di ikon keranjang naik sekali, toast muncul | 200ms |
| Buka drawer keranjang atau filter | Meluncur masuk, ease-out | 220ms |
| Ganti tab, buka akordeon | Tinggi berubah tanpa pantulan | 160ms |
| Stepper jumlah | Angka berganti langsung, tanpa animasi | 0ms |

### Larangan

- Fade dan slide-up saat scroll.
- Animasi hover pada kartu produk selain perubahan garis sel (hanya jika sel interaktif, durasi di bawah 100ms).
- Parallax, marquee otomatis, animasi loop.
- Pantulan (bounce) dan easing elastis.

### Aksesibilitas gerak

Dengan `prefers-reduced-motion: reduce`: momen logo ditiadakan (langsung tampil), lipatan wishlist berpindah tanpa animasi, drawer muncul langsung. Fungsi tidak boleh bergantung pada animasi.

---

## 8. Foto dan motif

Foto adalah 70% dari kesan toko. Desain tidak bisa menyelamatkan foto yang buruk.

### Arahan foto produk (katalog)

- Rasio **4:5**, ditata konsisten di seluruh katalog.
- Latar polos satu warna: `#E9E9F1` (sedikit lebih gelap dari `page` supaya produk putih tetap terlihat).
- Cahaya natural dan lembut. Pakaian tampak dipakai atau digantung dengan jatuh kain yang jelas.
- Satu foto detail kain per produk dan satu foto belakang.
- Alt text diisi di admin untuk setiap foto (wajib).

### Arahan foto editorial (hero, koleksi, About)

- Model Indonesia yang beragam, bukan model stok generik.
- Lokasi khas Makassar (pelabuhan, benteng, pasar, jalanan kota), bukan latar studio netral.
- Latar blok warna `brick` atau `ink` diizinkan untuk foto kampanye.
- Foto hero dan About boleh memakai **bingkai bergeser**: bingkai `ink` 3px di foto, dan garis 2px kedua bergeser 12px di belakangnya, mengulang bingkai tipis pada logo.

### Motif tenun kotak-kotak

Motif kotak-kotak terinspirasi sarung sutra Sulawesi Selatan. Ia adalah **tekstur merek**, jadi pemakaiannya dibatasi pada daftar ini:

| Dipakai | Tampilan |
|---|---|
| Overlay produk **habis** | Kotak 24px berwarna `ink` 12% di atas foto |
| Pita di footer | Satu pita tinggi 24px |
| Halaman 404 dan empty state | Latar blok |
| Halaman sukses pembayaran | Pita di bawah judul |

Pemakaian lain harus disetujui pemilik. Pemilik perlu memastikan nyaman dengan referensi budaya ini sebelum dikunci (lihat Bagian 15).

### Ikon

Gunakan **Lucide** dengan `stroke-width: 2`, dan override CSS agar ujung garis persegi (`stroke-linecap: square`, `stroke-linejoin: miter`) supaya serasi dengan bahasa bentuk kotak. Tidak ada ikon berwarna. Ikon selalu `currentColor`.

### Ilustrasi

Tidak ada ilustrasi vektor, maskot, atau gambar stok. Elemen grafis hanya: foto, blok warna dari logo, motif kotak, dan bingkai bergeser.

---

## 9. Komponen

### Tombol

| Varian | Tampilan | Pakai untuk |
|---|---|---|
| **Utama** | Latar `brick`, teks putih berat 600, garis 3px `ink`, `shadow-hard`. Hover: latar `brick-deep`. | Satu aksi terpenting per layar |
| **Sekunder** | Latar `surface`, teks `ink`, garis 2px `ink`, `shadow-hard`. | Aksi pendamping |
| **Teks** | Tanpa garis dan tanpa bayangan, teks `brick-deep`, garis bawah 2px. | Aksi ringan, tautan dalam kalimat |
| **Bahaya** | Latar `danger`, teks putih, garis 3px `ink`. | Hapus, batalkan, tolak |

Aturan: **satu tombol utama per layar.** Tinggi minimum 48px (mobile) dan 44px (desktop). Padding horizontal 24px. Keadaan nonaktif: latar `line-soft`, teks `muted`, tanpa bayangan, `cursor: not-allowed`. Keadaan memuat: spinner kotak berputar di kiri teks, tombol tetap lebar sama. Fokus: lihat Bagian 12.

### Input, select, textarea

Latar `surface`, garis 2px `ink`, tinggi 48px, teks 16px (mencegah zoom otomatis di iOS). Label **di atas** input, 14px berat 600, sentence case. Teks bantu di bawah, `muted`. Error: garis `danger` 3px, ikon, dan pesan teks di bawah. Tidak ada placeholder sebagai pengganti label.

### Sel produk (ProductCell)

```
+----------------------+
| (stiker)         [/] |   <- lipatan wishlist
|                      |
|     foto 4:5         |
|                      |
+----------------------+
| Nama produk          |   h4, satu atau dua baris
| Hitam, 4 ukuran      |   small, muted
| Rp 160.000           |   harga, tabular
| [ Tambah cepat ]     |   tombol sekunder, lebar penuh sel
+----------------------+
```

- Sel berbagi garis 2px dengan tetangganya. Tidak ada radius dan tidak ada bayangan.
- Seluruh sel adalah tautan ke detail produk, kecuali area wishlist dan tombol tambah cepat.
- Mobile: tombol "Tambah cepat" diganti tombol ikon persegi 44x44 di kanan bawah (dengan `aria-label`).
- Stok habis: foto 55% opasitas dengan overlay tenun, stiker "Habis", tombol diganti teks "Stok habis" (nonaktif).
- Tambah cepat pada produk berbagai varian membuka pemilih ukuran kecil (drawer), bukan menambah varian acak.

### Pemilih varian

- **Ukuran:** chip persegi 48x48 (atau lebih lebar untuk label panjang), garis 2px. Terpilih: latar `ink`, teks putih. Habis: teks `muted` dengan **garis diagonal** melintang dan label aksesibel "Habis". Tetap bisa difokus, tidak bisa dipilih.
- **Warna:** kotak warna 40x40 dengan garis 2px. Terpilih: garis 3px dan tanda centang di dalamnya. Nama warna ditampilkan sebagai teks di bawah.
- Sisa stok rendah ("Stok tinggal 3") tampil jika stok varian terpilih di bawah ambang di pengaturan.

### Harga

`Rp 160.000` berat 700, tabular. Jika ada harga coret: harga coret `muted` dengan `line-through` di sebelahnya, dan stiker "Sale" ditampilkan di gambar (bukan di samping harga).

### Stepper jumlah

Tiga kotak: `[-]`, angka, `[+]`. Garis 2px, tinggi 44px. Tombol `+` nonaktif saat mencapai stok, disertai teks "Maksimal sesuai stok".

### Status pesanan (StatusPill)

Pill dengan **ikon + teks**, tidak boleh warna saja:

| Status | Label | Gaya |
|---|---|---|
| `PENDING_PAYMENT` | Menunggu pembayaran | Latar `gold`, teks `ink`, ikon jam |
| `PROCESSING` | Diproses | Latar `ink`, teks putih, ikon kotak |
| `SHIPPED` | Dikirim | Latar `surface`, garis `ink`, ikon truk |
| `COMPLETED` | Selesai | Garis dan teks `success`, ikon centang |
| `CANCELLED` | Dibatalkan | Garis dan teks `muted`, ikon silang |
| `RETURN` | Retur | Garis dan teks `brick-deep`, ikon panah balik |

### Toast

Muncul di bawah (mobile) atau kanan atas (desktop). Latar `ink`, teks putih, garis kiri 6px sesuai jenis (`success`, `danger`, `info`), ikon persegi. Hilang sendiri setelah 5 detik, kecuali error yang menetap sampai ditutup. `role="status"` (atau `alert` untuk error).

### Modal dan drawer

Latar `surface`, garis 3px `ink`, tanpa radius. Backdrop `ink` 60% (tanpa blur). Drawer keranjang dari kanan (desktop) atau bawah (mobile). Fokus terjebak di dalam dan kembali ke pemicu saat ditutup. Esc menutup.

### Tabel (admin)

Header baris `ink` teks putih. Baris `surface` dengan pemisah 1px `line-soft`. Baris zebra tidak dipakai. Angka rata kanan dengan `tabular-nums`. Baris yang bisa dibuka punya latar `page` saat hover. Aksi baris berupa tombol teks atau ikon, bukan tombol utama.

### Skeleton

Blok datar `line-soft` dengan bentuk persis konten yang akan muncul. Berdenyut opasitas 100% ke 60% (1,2 detik). Tanpa gradien shimmer. Dengan `prefers-reduced-motion`: statis.

### Empty state

Judul satu kalimat, satu baris penjelasan, **satu tombol aksi**. Latar boleh memakai motif tenun. Contoh teks ada di Bagian 11.

### Timeline pelacakan

Garis vertikal 2px `ink`. Setiap peristiwa adalah kotak persegi 12px di garis. Peristiwa terbaru di atas, kotaknya terisi `brick`, yang lama terisi `ink`. Tanggal dan jam di samping, `small`. Nomor resi memiliki tombol salin.

### Halaman pembayaran

Hitung mundur 15 menit tampil besar (`h1`, tabular). Di bawah 2 menit: teks berubah `brick-deep` **dan** muncul kalimat "Sisa waktu kurang dari 2 menit". Nomor VA besar dengan tombol "Salin nomor". Status diperbarui otomatis. Keadaan: menunggu, berhasil, kedaluwarsa, gagal.

---

## 10. Arahan per halaman

| Halaman | Arahan |
|---|---|
| **Beranda** | Hero membuka dengan **arti nama**: "care-care" sebagai teks `display`, di bawahnya "pakaian dalam bahasa Makassar", lalu drop terbaru dan satu tombol utama. Foto drop dengan chamfer dan bingkai bergeser. Tidak ada angka statistik, tidak ada gradien. |
| **Katalog** | Kisi lattice. Filter tetap terlihat di desktop (kolom kiri) dan sebagai drawer di mobile. Jumlah hasil ditampilkan. Pagination memakai tombol persegi. |
| **Detail produk** | Foto di kiri (desktop) dengan thumbnail vertikal, panel info menempel di kanan. Pemilih ukuran besar dan jelas. Tombol "Masukkan ke keranjang" menempel di bawah layar mobile. Panduan ukuran terbuka dalam drawer, tidak pindah halaman. |
| **Keranjang** | Baris seperti tabel: foto kecil, nama, varian, stepper, harga. Jika gratis ongkir aktif, tampilkan kekurangan belanja: "Belanja Rp 40.000 lagi untuk gratis ongkir." |
| **Checkout** | Tiga langkah bernomor (sah karena berurutan). Rincian biaya sebagai buku besar dengan angka rata kanan. Total dalam blok `ink` dengan chamfer. Semua biaya, termasuk biaya layanan, terlihat **sebelum** tombol bayar. |
| **Pembayaran** | Lihat komponen "Halaman pembayaran". |
| **Akun** | Navigasi samping (desktop) atau tab (mobile). Riwayat pesanan sebagai daftar dengan StatusPill. |
| **Admin** | Sama token, **lebih tenang dan padat**: tanpa stiker, tanpa chamfer, tanpa motif tenun. Sidebar `ink`. Tombol utama hanya satu per halaman. Tabel padat dengan teks 14px. Fokus pada kecepatan: pencarian, filter, aksi massal. |
| **Halaman sistem** | 404, 500, 403, dan maintenance memakai motif tenun dan teks lugas dengan satu tombol aksi. |

---

## 11. Suara dan teks antarmuka

### Prinsip

- **Bahasa Indonesia**, memakai **"kamu"**. Hangat dan langsung, tidak kaku, tidak sok gaul.
- **Sentence case.** Aktif, kata kerja jelas.
- Tidak ada seruan berlebihan, emoji, atau "Oops!".
- Tombol menyebut persis apa yang terjadi. Nama aksi **sama** di tombol, toast, dan riwayat.
- Error menjelaskan **apa yang salah dan cara memperbaikinya**, tanpa meminta maaf berlebihan.
- Kosong adalah ajakan bertindak, bukan suasana hati.

### Kosakata baku

| Konsep | Istilah di UI |
|---|---|
| Cart | Keranjang |
| Wishlist | Wishlist |
| Order | Pesanan |
| Tracking number | Nomor resi |
| Shipping cost | Ongkos kirim (judul), ongkir (ruang sempit) |
| Payment fee | Biaya layanan |
| Variant (size/color) | Ukuran, Warna |
| Return | Retur |
| Voucher | Voucher |

Jangan memakai "Tas" atau "Bag" untuk keranjang.

### Contoh pola (tombol dan toast sepadan)

| Tombol | Toast |
|---|---|
| Masukkan ke keranjang | Masuk ke keranjang |
| Simpan alamat | Alamat disimpan |
| Hapus dari keranjang | Dihapus dari keranjang |
| Ajukan retur | Retur diajukan |
| Salin nomor | Nomor disalin |
| Kirim pesanan (admin) | Pesanan dikirim. Resi: [nomor] |

### Contoh error

| Situasi | Teks |
|---|---|
| Stok kurang | "Stok ukuran M tinggal 2. Kurangi jumlahnya atau pilih ukuran lain." |
| Pembayaran kedaluwarsa | "Waktu pembayaran habis. Pesanan dibatalkan dan stok dikembalikan. Pilih produknya lagi untuk memesan ulang." |
| Voucher tidak valid | "Voucher ini sudah habis dipakai." atau "Belanja minimal Rp 200.000 untuk memakai voucher ini." |
| Kode pos tidak valid | "Kode pos tidak ditemukan. Periksa lagi atau pilih kecamatan dari daftar." |
| Gagal memuat | "Data tidak bisa dimuat. Periksa koneksimu lalu coba lagi." + tombol "Coba lagi" |
| Email sudah terdaftar | "Email ini sudah terdaftar. Masuk atau reset password." |

### Contoh empty state dan halaman sistem

| Tempat | Teks |
|---|---|
| Keranjang kosong | "Keranjangmu masih kosong." Penjelasan: "Produk yang kamu masukkan akan muncul di sini." Tombol: "Lihat produk terbaru" |
| Wishlist kosong | "Belum ada yang dilipat." Penjelasan: "Lipat pojok produk untuk menyimpannya di sini." Tombol: "Jelajahi katalog" |
| Belum ada pesanan | "Kamu belum punya pesanan." Tombol: "Mulai belanja" |
| 404 | "Halaman ini tidak ada." Penjelasan: "Linknya mungkin salah, atau produknya sudah dihapus." Tombol: "Ke beranda" dan kolom pencarian |
| 500 | "Ada masalah di sisi kami." Penjelasan: "Pesananmu aman. Coba muat ulang halaman ini." Tombol: "Muat ulang" |
| Maintenance | "Care Care sedang diperbarui." Penjelasan: "Kami kembali sebentar lagi." |

### Catatan

Semua teks di atas adalah **contoh arah suara**, bukan teks final. Semua teks UI tetap disimpan di `messages/id.json`. Tagline brand belum diputuskan (lihat Bagian 15) dan tidak boleh dikarang oleh AI coder.

---

## 12. Aksesibilitas dan responsif (lantai kualitas)

- Standar **WCAG 2.1 AA**. Semua pasangan warna ada di Bagian 3.
- **Fokus terlihat**: cincin ganda `box-shadow: 0 0 0 2px surface, 0 0 0 5px ink`. Di atas latar `ink` memakai `gold`. Jangan menghapus outline tanpa pengganti.
- Navigasi keyboard penuh: menu, drawer, modal, filter, pemilih varian, akordeon. Urutan tab mengikuti urutan visual.
- Area sentuh minimum 44x44px.
- Setiap gambar produk punya alt text dari admin. Gambar dekoratif memakai `alt=""`.
- Label form terhubung ke input. Pesan error terhubung lewat `aria-describedby`.
- Hitung mundur pembayaran tidak diumumkan setiap detik ke pembaca layar. Umumkan pada 10 menit, 5 menit, 2 menit, dan saat habis.
- Hormati `prefers-reduced-motion`.
- Desain **mobile dulu**. Uji pada 360px lebar. Tidak ada scroll horizontal pada halaman (tabel lebar scroll di dalam wadahnya).
- Teks 16px pada input untuk mencegah zoom otomatis di iOS.
- Performa: gambar lewat `next/image` dengan `sizes` yang benar, font lewat `next/font` dengan `display: swap`.

---

## 13. Implementasi

### Lokasi token

Project dibuat dengan `create-next-app@latest` yang memakai **Tailwind v4**, jadi token ditaruh di `app/globals.css` lewat `@theme`, bukan `tailwind.config.ts`. (Jika ternyata project memakai Tailwind v3, pindahkan nilai yang sama ke `tailwind.config.ts`.)

```css
@import "tailwindcss";

@theme {
  /* Warna */
  --color-ink: #2D2D56;
  --color-brick: #B8523C;
  --color-brick-deep: #9A3F2B;
  --color-gold: #F0B429;
  --color-page: #F3F3F8;
  --color-surface: #FFFFFF;
  --color-line-soft: #E4E4EE;
  --color-muted: #5B5B7B;
  --color-success: #1F7A4D;
  --color-danger: #B3261E;
  --color-warning: #8A5A00;
  --color-info: #245AA8;

  /* Font */
  --font-display: var(--font-archivo), "Arial Black", Arial, sans-serif;
  --font-body: var(--font-instrument), system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;

  /* Bayangan keras */
  --shadow-hard: 4px 4px 0 0 var(--color-ink);
  --shadow-hard-sm: 2px 2px 0 0 var(--color-ink);
}

:root {
  --border-strong: 3px;
  --border-base: 2px;
  --cut: 20px;
}
@media (min-width: 640px)  { :root { --cut: 28px; } }
@media (min-width: 1024px) { :root { --cut: 32px; --border-strong: 3px; } }
@media (max-width: 639px)  { :root { --border-strong: 2px; --border-base: 1.5px; } }

body { background: var(--color-page); color: var(--color-ink); font-family: var(--font-body); }

/* Ikon bersudut persegi */
svg.lucide { stroke-linecap: square; stroke-linejoin: miter; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### Font (`app/layout.tsx`)

```tsx
import { Archivo, Instrument_Sans } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],           // sumbu lebar, wajib untuk tampilan diperluas
  variable: "--font-archivo",
  display: "swap",
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
// <html lang="id" className={`${archivo.variable} ${instrument.variable}`}>
```

Untuk teks display: `font-stretch: 125%; font-weight: 900; text-transform: uppercase;`. Jika tampilan tidak melebar, sumbu `wdth` belum termuat. Periksa dulu sebelum lanjut.

### Potongan sudut dengan garis tepi (teknik dua lapis)

`clip-path` memotong garis tepi, jadi elemen bergaris dibuat dari dua lapis:

```css
.cut-frame {                       /* lapisan luar = warna garis */
  --b: 3px;
  background: var(--color-ink);
  padding: var(--b);
  clip-path: polygon(0 0, calc(100% - var(--cut)) 0, 100% var(--cut), 100% 100%, 0 100%);
}
.cut-frame > .cut-inner {          /* lapisan dalam = isi */
  --c-in: calc(var(--cut) - var(--b) * 0.586);   /* geometri garis diagonal sejajar */
  background: var(--color-surface);
  clip-path: polygon(0 0, calc(100% - var(--c-in)) 0, 100% var(--c-in), 100% 100%, 0 100%);
}
```

### Lipatan wishlist

Segitiga dibuat dengan `clip-path: polygon(100% 0, 0 0, 100% 100%)` pada elemen 28x28px di pojok kanan atas gambar, berwarna `brick-deep`. Pojok gambar di bawahnya dipotong dengan `clip-path` yang sesuai sehingga warna `page` terlihat di belakang lipatan. Animasikan `transform: scale(0 -> 1)` dari titik sudut selama 160ms.

### Pemetaan shadcn/ui

Atur variabel shadcn agar komponen bawaan mengikuti token kita, lalu override gaya tiap komponen (radius 0, garis, bayangan keras).

| Variabel shadcn | Token Care Care |
|---|---|
| `--background` | `page` |
| `--foreground` | `ink` |
| `--card`, `--popover` | `surface` |
| `--primary` | `brick` (teks `surface`) |
| `--secondary` | `surface` (garis `ink`) |
| `--accent` | `gold` (teks `ink`) |
| `--muted` | `line-soft` |
| `--muted-foreground` | `muted` |
| `--destructive` | `danger` |
| `--border`, `--input` | `ink` |
| `--ring` | `ink` |
| `--radius` | `0` |

### Komponen dan lokasi

| Komponen | File |
|---|---|
| Primitif UI (Button, Input, Badge, Modal) | `components/ui/` |
| Komponen fitur (ProductCell, CartDrawer, VariantSelector, StatusPill, Countdown) | `components/features/` |
| Layout (Header, Footer, AdminSidebar) | `components/layout/` |

---

## 14. Checklist review (sebelum menggabungkan UI apa pun)

Setiap halaman atau komponen baru harus lolos semua:

1. Hanya memakai token warna dari Bagian 3. Tidak ada warna Tailwind bawaan atau hex acak.
2. Tidak ada kelas terlarang dari Bagian 2.
3. Radius hanya `0` atau `rounded-full` (stiker, status pill).
4. Bayangan hanya `shadow-hard` pada elemen interaktif.
5. Ketebalan garis sesuai hierarki (3px, 2px, 1px).
6. Satu tombol utama per layar.
7. Maksimal satu stiker per produk. Tidak ada stiker bintang.
8. Huruf kapital hanya di `display`, `h1`, `h2`, dan wordmark.
9. Tidak ada eyebrow, `01/02/03` non-urutan, `A · B · C`, atau `→` pada tombol.
10. Semua teks dari `messages/id.json`, sentence case, kosakata sesuai Bagian 11.
11. Semua pasangan warna lolos AA. Status memakai ikon + teks.
12. Fokus keyboard terlihat. Area sentuh minimal 44px.
13. Tampil benar di 360px, tanpa scroll horizontal.
14. Ada state memuat (skeleton), kosong, dan error.
15. Gerak hanya sebagai respons tindakan, dan menghormati `prefers-reduced-motion`.
16. Tidak ada gradien, glow, blur kaca, atau ilustrasi stok.
17. Hanya satu "momen" visual per layar. Jika dua, hapus salah satu.

---

## 15. Keputusan desain yang masih terbuka

| # | Pertanyaan | Default sampai diputuskan |
|---|---|---|
| DD-01 | Setujui motif tenun kotak-kotak sebagai referensi budaya? | Dipakai sesuai Bagian 8 |
| DD-02 | Setujui `gold` `#F0B429` sebagai aksen pendukung? | Dipakai untuk stiker saja |
| DD-03 | Hex asli warna logo (ambil dari file desain, bukan taksiran dari gambar) | Nilai di Bagian 3 |
| DD-04 | Konfirmasi Archivo + Instrument Sans setelah diuji dengan teks dan foto asli | Dipakai |
| DD-05 | Tagline brand | **Tidak ada.** Jangan dikarang |
| DD-06 | Konsep hero (arti nama + drop terbaru) disetujui? | Dipakai |
| DD-07 | Gaya foto editorial dan lokasi pemotretan | Arahan Bagian 8 |
| DD-08 | Mode gelap untuk admin? | Tidak ada di versi 1 |
| DD-09 | Logo SVG dan varian (penuh, satu warna, ikon, horizontal) | Menunggu file |
| DD-10 | Istilah "Wishlist" tetap, atau diganti ("Favorit", "Simpanan")? | "Wishlist" |

---

## Lampiran: ringkasan satu halaman untuk AI coder

- **Konsep:** Kotak dan Lipatan. Kisi berbagi garis, potongan sudut 45 derajat, lipatan sudut sebagai wishlist.
- **Warna:** `ink #2D2D56`, `brick #B8523C`, `brick-deep #9A3F2B`, `gold #F0B429` (hemat), `page #F3F3F8`, `surface #FFFFFF`.
- **Font:** Archivo diperluas kapital (display, h1, h2), Instrument Sans sentence case (semua lainnya).
- **Bentuk:** radius 0, garis 3/2/1px menandakan hierarki, bayangan keras hanya pada elemen yang bisa ditekan.
- **Gerak:** satu momen logo di beranda, sisanya respons tindakan.
- **Suara:** Indonesia, "kamu", sentence case, aksi konsisten, error menjelaskan solusi.
- **Larangan:** kartu bulat, gradien, krem, eyebrow kapital, `→` di tombol, monospace label, emoji, fade scroll.
- **Sebelum selesai:** jalankan Checklist di Bagian 14.
