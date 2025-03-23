# SkiAI - Chatbot AI Modern

![SkiAI Logo](img/image.jpg)  
_Chatbot AI dengan antarmuka modern yang terinspirasi dari ChatGPT_

**SkiAI** adalah aplikasi chatbot berbasis web yang dirancang untuk memberikan pengalaman percakapan interaktif dengan antarmuka pengguna yang elegan dan responsif. Dibangun dengan HTML, Tailwind CSS, dan JavaScript, SkiAI menggunakan API OpenRouter untuk memproses permintaan pengguna dan menghasilkan respons cerdas. Proyek ini ideal untuk keperluan edukasi, eksplorasi AI, atau sebagai dasar untuk pengembangan aplikasi percakapan lebih lanjut.

## Fitur Utama

- **Antarmuka Modern**: Desain gelap yang terinspirasi dari ChatGPT, responsif untuk desktop dan mobile.
- **Percakapan Interaktif**: Mendukung input teks dengan dukungan Markdown untuk respons yang terformat.
- **Saran Otomatis**: Menyediakan saran awal dan saran lanjutan untuk memandu percakapan.
- **Tombol Salin**: Memungkinkan pengguna menyalin respons bot dengan mudah.
- **Animasi Loading**: Indikator loading yang halus saat menunggu respons API.
- **Kustomisasi Mudah**: Menggunakan Tailwind CSS untuk penyesuaian gaya yang cepat dan fleksibel.

## Pratinjau

![Tampilan SkiAI](https://via.placeholder.com/600x400?text=SkiAI+Preview)

## Persyaratan

- Browser modern (Chrome, Firefox, Safari, dll.)
- Koneksi internet untuk mengakses API OpenRouter
- API Key dari OpenRouter (dapat diperoleh di [OpenRouter](https://openrouter.ai/))

## Instalasi

Ikuti langkah-langkah berikut untuk menjalankan SkiAI di lokal Anda:

1. **Clone Repository**

   ```bash
   git clone https://github.com/skimatt/skiAI.git
   cd skiAI
   ```

2. **Buka File HTML**

   - Tidak perlu server lokal, cukup buka file `index.html` di browser Anda:
     ```
     open index.html
     ```
   - Alternatif, gunakan server lokal sederhana untuk pengalaman yang lebih baik (opsional):
     ```bash
     npx serve .
     ```
     Lalu buka `http://localhost:3000` di browser.

3. **Konfigurasi API Key**
   - Buka file `index.html`.
   - Ganti API key di bagian fungsi `sendMessage` dengan key Anda sendiri:
     ```javascript
     Authorization: "Bearer YOUR_OPENROUTER_API_KEY",
     ```
   - Simpan perubahan.

## Penggunaan

1. Buka aplikasi di browser.
2. Anda akan melihat pesan selamat datang dengan saran awal seperti "Jelaskan konsep AI" atau "Tulis email bisnis".
3. Klik salah satu saran atau ketik pertanyaan Anda di kolom input.
4. Tekan tombol kirim (ikon panah) atau tekan `Enter` untuk mengirim pesan.
5. Tunggu respons dari SkiAI, yang akan ditampilkan dengan format Markdown jika berlaku.
6. Gunakan tombol salin untuk menyalin respons bot, atau klik saran lanjutan yang muncul setelah pesan pertama.

### Contoh Interaksi

- **Pengguna**: "Jelaskan konsep AI"
- **SkiAI**: "Artificial Intelligence (AI) adalah cabang ilmu komputer yang bertujuan menciptakan sistem yang dapat meniru kemampuan manusia seperti belajar, berpikir, dan memecahkan masalah. Contohnya adalah machine learning dan deep learning."

## Struktur Proyek

```
ski-ai/
├── index.html       # File utama yang berisi HTML, CSS, dan JS
├── README.md        # Dokumentasi proyek (ini)
```

## Teknologi yang Digunakan

- **HTML5**: Struktur dasar aplikasi.
- **Tailwind CSS**: Framework CSS untuk desain responsif dan modern.
- **JavaScript**: Logika interaksi dan komunikasi API.
- **Marked.js**: Parser Markdown untuk memformat respons bot.
- **OpenRouter API**: Backend AI untuk menghasilkan respons.

## Kustomisasi

### Mengubah Warna

- Edit konfigurasi Tailwind di `<script>` pada bagian `<head>` untuk menyesuaikan warna:
  ```javascript
  colors: {
    dark: {
      100: '#ececf1', // Ubah sesuai keinginan
      // ...
    }
  }
  ```

### Menambahkan Fitur

- **Sidebar**: Tambahkan elemen `<aside>` dan logika toggle pada tombol hamburger di header.
- **Model AI Alternatif**: Ubah `model` di fungsi `sendMessage` ke model lain yang didukung OpenRouter.

## Kontribusi

Kami menyambut kontribusi! Ikuti langkah berikut:

1. Fork repository ini.
2. Buat branch baru (`git checkout -b fitur-baru`).
3. Commit perubahan Anda (`git commit -m "Menambahkan fitur X"`).
4. Push ke branch Anda (`git push origin fitur-baru`).
5. Buat Pull Request.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE). Silakan gunakan, modifikasi, dan distribusikan sesuai kebutuhan Anda.

## Kredit

- Dibuat oleh [Nama Anda] pada Maret 2025.
- Terinspirasi dari antarmuka ChatGPT oleh OpenAI.
- Didukung oleh [OpenRouter](https://openrouter.ai/) untuk kemampuan AI.

## FAQ

**Q: Mengapa respons AI terkadang lambat?**  
A: Kecepatan respons tergantung pada API OpenRouter dan koneksi internet Anda.

**Q: Bisakah saya menggunakan model AI lain?**  
A: Ya, ubah parameter `model` di fungsi `sendMessage` sesuai daftar model yang didukung OpenRouter.

**Q: Apakah SkiAI menyimpan percakapan?**  
A: Tidak, semua percakapan hanya ada di sesi browser Anda dan hilang saat halaman direfresh.

## Kontak

Jika ada pertanyaan atau saran, hubungi saya di:

- Email: [rahmatzkk10@gamil.com]
- GitHub: [skimatt](https://github.com/skimatt)

---

### Catatan Tambahan

- **Gambar Pratinjau**: Ganti URL placeholder (`https://via.placeholder.com/...`) dengan screenshot aktual aplikasi Anda jika diunggah ke repository.
- **Nama dan Kontak**: Ganti "[RAHMAT MULIA]" dan "[rahmatzkk10@gamil.com]" dengan informasi Anda sendiri.
- **Lisensi**: Tambahkan file `LICENSE` di repository jika Anda memilih lisensi MIT atau lainnya.

README ini memberikan gambaran lengkap tentang SkiAI, dari instalasi hingga penggunaan, dan siap digunakan untuk dokumentasi proyek Anda! Jika ada penyesuaian spesifik yang Anda inginkan, beri tahu saya.
