# Instruksi untuk AI coder - Care Care

Sebelum mengerjakan tugas apa pun:
1. Baca docs/spec/carecare-app-spec.json sampai selesai.
2. Ikuti bagian ai_coder_rules di dalamnya.
3. Kerjakan hanya fitur fase yang sedang aktif (lihat roadmap). Jangan membangun fase berikutnya tanpa diminta.
4. Jika sesuatu ada di open_decisions, JANGAN menebak. Pakai default yang tertulis atau tanyakan owner.
5. Semua perhitungan harga, stok, voucher, ongkir, pajak, dan biaya dilakukan di server (lib/pricing dan lib/services).
6. Teks UI berbahasa Indonesia dan disimpan di messages/id.json. Kode dan komentar berbahasa Inggris.
   Untuk UI APA PUN, baca docs/design/DESIGN.md sampai selesai dan lolos checklist-nya (bagian 14). Jika bentrok soal visual, DESIGN.md menang.
7. Next.js 16: file proteksi route bernama proxy.ts (bukan middleware.ts).
8. Jangan membuat Dockerfile atau docker-compose. Project ini tidak memakai Docker (database: Neon).
9. Jika perilaku aplikasi berubah, perbarui spec di commit yang sama.
