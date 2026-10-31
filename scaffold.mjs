// scaffold.mjs - membuat struktur folder Care Care (aman dijalankan ulang, tidak menimpa file yang sudah ada)
// Jalankan dari ROOT project:  node scaffold.mjs
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const dirs = [
  // dokumentasi
  "docs/spec", "docs/brand/logo", "docs/design/wireframes", "docs/design/mockups",
  "docs/flows", "docs/legal", "docs/decisions", "docs/runbook",
  // halaman
  "app/(shop)/products", "app/(shop)/collections", "app/(shop)/journal", "app/(shop)/cart",
  "app/(shop)/checkout", "app/(shop)/account", "app/(shop)/track-order", "app/(shop)/(info)",
  "app/(auth)/login", "app/(auth)/register", "app/(auth)/forgot-password",
  "app/(auth)/reset-password", "app/(auth)/verify",
  "app/admin/(panel)", "app/admin/login",
  "app/api/webhooks/midtrans", "app/api/webhooks/biteship", "app/api/cron",
  // komponen
  "components/ui", "components/features", "components/layout", "components/emails",
  // logika
  "lib/pricing", "lib/services", "lib/integrations", "lib/validators", "lib/utils",
  // lainnya
  "prisma", "messages", "public/logo", "public/fonts", "public/images",
  "tests/unit", "tests/e2e", "scripts", ".github",
];

const files = {
  "docs/README.md": "# Dokumentasi Care Care\n\n- spec/carecare-app-spec.json : sumber kebenaran utama (baca ini dulu)\n- brand/ : logo dan panduan brand\n- design/DESIGN.md : sumber kebenaran visual (baca sebelum membuat UI)\n- design/ : wireframe dan mockup\n- flows/ : diagram alur (status pesanan, checkout, reservasi stok)\n- legal/ : draf kebijakan (arsip, versi tayang diedit lewat admin)\n- decisions/ : catatan keputusan (satu file per keputusan)\n- runbook/ : deploy, backup, penanganan insiden\n",
  "docs/CHANGELOG.md": "# Changelog\n\n## [Unreleased]\n- Inisialisasi project\n",
  "docs/decisions/0001-stack.md": "# 0001 - Pemilihan stack\n\nTanggal: (isi)\n\nKeputusan: Next.js + TypeScript + Tailwind + shadcn/ui + PostgreSQL + Prisma + Auth.js + Midtrans + Biteship + Resend + Vercel.\n\nAlasan: satu bahasa, ekosistem besar, hosting terkelola, mudah dirawat.\n",
  "docs/decisions/0002-no-docker.md": "# 0002 - Tidak memakai Docker\n\nKeputusan: project ini tidak memakai Docker. Database development memakai Neon (branch dev), produksi memakai branch main.\n\nAlasan: lebih sederhana untuk pemilik, tidak perlu mengelola container, hosting sudah terkelola (Vercel + Neon).\n\nKonsekuensi: jangan buat Dockerfile atau docker-compose. Migrasi memakai DIRECT_URL.\n",
  "docs/flows/order-status.md": "# Status pesanan\n\nPENDING_PAYMENT -> PROCESSING | CANCELLED\nPROCESSING -> SHIPPED | CANCELLED\nSHIPPED -> COMPLETED | RETURN\nCOMPLETED -> RETURN\nRETURN -> COMPLETED | CANCELLED\n\nDetail lengkap: docs/spec/carecare-app-spec.json > business_rules.order_status\n",
  "docs/flows/checkout-payment.md": "# Alur checkout dan pembayaran\n\n(isi diagram dari spec: pricing_calculation dan business_rules.payment)\n",
  "docs/flows/stock-reservation.md": "# Reservasi stok\n\nStok direservasi 15 menit saat order dibuat. Detail: spec > business_rules.stock_reservation\n",
  "docs/runbook/deploy.md": "# Deploy\n\n(isi langkah deploy ke Vercel)\n",
  "docs/runbook/backup-restore.md": "# Backup dan restore database\n\n(isi prosedur)\n",
  "docs/runbook/incident.md": "# Penanganan insiden\n\n(isi: pembayaran tidak masuk, stok selisih, webhook gagal)\n",
  "docs/legal/privacy-policy.md": "# Kebijakan Privasi (draf)\n\nSesuaikan dengan UU PDP No. 27/2022 dan konsultasikan dengan ahli hukum.\n",
  "docs/legal/terms.md": "# Syarat dan Ketentuan (draf)\n",
  "docs/legal/return-policy.md": "# Kebijakan Retur dan Refund (draf)\n",
  "docs/legal/shipping-policy.md": "# Kebijakan Pengiriman (draf)\n",
  "messages/id.json": "{\n  \"common\": {\n    \"brand\": \"Care Care\"\n  }\n}\n",
};

const aiInstructions = `# Instruksi untuk AI coder - Care Care

Sebelum mengerjakan tugas apa pun:
1. Baca docs/spec/carecare-app-spec.json sampai selesai.
2. Ikuti bagian ai_coder_rules di dalamnya.
3. Kerjakan hanya fitur fase yang sedang aktif (lihat roadmap). Jangan membangun fase berikutnya tanpa diminta.
4. Jika sesuatu ada di open_decisions, JANGAN menebak. Pakai default yang tertulis atau tanyakan owner.
5. Semua perhitungan harga, stok, voucher, ongkir, pajak, dan biaya dilakukan di server (lib/pricing dan lib/services).
6. Teks UI berbahasa Indonesia dan disimpan di messages/id.json. Kode dan komentar berbahasa Inggris.\n   Untuk UI APA PUN, baca docs/design/DESIGN.md sampai selesai dan lolos checklist-nya (bagian 14). Jika bentrok soal visual, DESIGN.md menang.
7. Next.js 16: file proteksi route bernama proxy.ts (bukan middleware.ts).\n8. Jangan membuat Dockerfile atau docker-compose. Project ini tidak memakai Docker (database: Neon).
9. Jika perilaku aplikasi berubah, perbarui spec di commit yang sama.
`;
for (const f of ["AGENTS.md", "CLAUDE.md", ".github/copilot-instructions.md"]) files[f] = aiInstructions;

let created = 0, skipped = 0;
for (const d of dirs) {
  mkdirSync(d, { recursive: true });
  const keep = join(d, ".gitkeep");
  if (!existsSync(keep)) writeFileSync(keep, "");
}
for (const [path, content] of Object.entries(files)) {
  mkdirSync(dirname(path), { recursive: true });
  if (existsSync(path)) { skipped++; continue; }
  writeFileSync(path, content);
  created++;
}
console.log(`Selesai. Folder: ${dirs.length}. File baru: ${created}. Dilewati (sudah ada): ${skipped}.`);
console.log("Langkah berikut: salin carecare-app-spec.json ke docs/spec/, DESIGN.md ke docs/design/, dan salin logo ke docs/brand/logo/ dan public/logo/.");
