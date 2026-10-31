# 0002 - Tidak memakai Docker

Keputusan: project ini tidak memakai Docker. Database development memakai Neon (branch dev), produksi memakai branch main.

Alasan: lebih sederhana untuk pemilik, tidak perlu mengelola container, hosting sudah terkelola (Vercel + Neon).

Konsekuensi: jangan buat Dockerfile atau docker-compose. Migrasi memakai DIRECT_URL.
