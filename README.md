# Teman Pintar — Belajar Gratis

Prototipe web app pendidikan gratis untuk siswa SD dan SMP. Dibuat dengan HTML, CSS, dan JavaScript tanpa framework atau API berbayar.

## Fitur versi 0.1

- Desain responsif untuk ponsel dan desktop.
- Profil ringan (nama panggilan opsional dan kelas).
- Latihan Matematika dan Bahasa Indonesia dengan penjelasan jawaban.
- Tes kemampuan awal sederhana.
- Catatan progres lokal di browser (`localStorage`).
- PWA manifest dan service worker untuk dukungan instalasi/cache dasar.

## Jalankan secara lokal

Buka `index.html` di browser untuk mencoba fitur utama. Untuk menguji service worker/PWA, jalankan melalui server lokal atau hosting HTTPS (misalnya GitHub Pages).

## Publikasikan melalui GitHub Pages

1. Buat repository baru di GitHub, misalnya `teman-pintar`.
2. Unggah semua file di folder ini ke root repository: `index.html`, `manifest.webmanifest`, `sw.js`, `icon.svg`, dan `README.md`.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
6. Tunggu proses publikasi selesai. GitHub akan menampilkan URL Pages di bagian tersebut.

Jika repository memakai nama selain `<username>.github.io`, URL biasanya berbentuk `https://<username>.github.io/<nama-repository>/`.

## Batasan prototipe — wajib dibaca

- Progres hanya tersimpan di browser/perangkat yang digunakan; belum ada akun, sinkronisasi cloud, atau database bersama.
- Materi dan soal adalah contoh awal dan belum merupakan kurikulum lengkap. Minta guru memeriksa akurasi, kesesuaian kelas, serta tingkat kesulitan sebelum digunakan luas.
- Tes ini bukan penilaian resmi sekolah dan tidak boleh digunakan untuk memberi label kemampuan anak.
- Ini belum siap untuk peluncuran publik yang melibatkan anak tanpa peninjauan privasi, keamanan, aksesibilitas, serta proses persetujuan orang tua/wali.
- Jangan memasukkan nama lengkap, alamat, lokasi, nomor telepon, atau informasi sensitif siswa ke prototipe ini.
- Cache offline bersifat dasar; aplikasi belum menjamin seluruh fitur bekerja offline pada setiap browser/perangkat.

## Perlindungan anak sebelum pilot publik

1. Minta persetujuan orang tua/wali yang sesuai dengan ketentuan yang berlaku.
2. Gunakan identitas minimum dan sediakan cara menghapus progres.
3. Jangan menambahkan iklan tertarget, chat anak-orang asing, pelacakan lokasi, atau profil publik.
4. Tinjau semua materi dan soal dengan guru.
5. Sediakan kontak penanggung jawab dan prosedur menangani insiden.

## Lisensi

Kode prototipe dapat dimodifikasi untuk pilot pendidikan nonkomersial. Materi pendidikan pihak ketiga tetap tunduk pada lisensi dan ketentuan sumber masing-masing. Untuk distribusi yang lebih luas, tentukan lisensi proyek secara eksplisit bersama pengelola.
