# Serenity Food and Delivery

Selamat datang di Serenity Food and Delivery, sebuah aplikasi Next.js untuk mencari restoran lokal dan mendapatkan makanan favorit Anda diantar.

## Fitur

- **Pencarian Berbasis AI**: Temukan restoran menggunakan bahasa alami.
- **Restoran Unggulan**: Jelajahi daftar pilihan tempat lokal terbaik.
- **Peta Interaktif**: Temukan restoran di dekat Anda.
- **Menjadi Mitra**: Pemilik restoran dapat mendaftar untuk bergabung dengan platform.
- **Menjadi Kurir**: Individu dapat mendaftar untuk menjadi kurir pengiriman.

## Memulai

Ikuti instruksi ini untuk mendapatkan salinan proyek dan menjalankannya di mesin lokal Anda untuk tujuan pengembangan dan pengujian.

### Prasyarat

- [Node.js](https://nodejs.org/) (versi 20 atau lebih baru)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Instalasi

1.  **Kloning repositori:**
    ```bash
    git clone <url-repositori-anda>
    cd <direktori-repositori>
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Siapkan database:**
    - Pastikan Anda telah menginstal dan menjalankan PostgreSQL.
    - Buat database baru dengan nama `thefood`.
    - Anda dapat menggunakan file `schema.sql` untuk membuat tabel yang diperlukan:
      ```bash
      psql -U postgres -d thefood -a -f schema.sql
      ```

4.  **Siapkan variabel lingkungan:**
    - Buat file `.env` di root proyek.
    - Tambahkan baris berikut, ganti nilainya jika pengaturan PostgreSQL Anda berbeda:
      ```
      DATABASE_URL="postgresql://postgres:postgres@localhost:5432/thefood"
      ```

### Menjalankan Server Pengembangan

1.  **Mulai server pengembangan Genkit:**
    Buka terminal dan jalankan:
    ```bash
    npm run genkit:dev
    ```
    Ini akan memulai alur AI di server lokal.

2.  **Mulai server pengembangan Next.js:**
    Buka terminal kedua dan jalankan:
    ```bash
    npm run dev
    ```

3.  Buka [http://localhost:9002](http://localhost:9002) dengan browser Anda untuk melihat hasilnya.

## Tumpukan Teknologi

- **Kerangka Kerja**: [Next.js](https://nextjs.org/)
- **Gaya**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **AI**: [Google Genkit](https://firebase.google.com/docs/genkit)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Pemetaan**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
