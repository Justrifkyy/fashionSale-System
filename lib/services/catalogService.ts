import {
  Category,
  FaqEntry,
  getProductDisplayPrice,
  getProductTotalStock,
  OrderRecord,
  Product,
  SizeGuideRow,
} from "@/lib/types/domain";
import { DEMO_IMAGES } from "./demoImages";

/**
 * Initial development seed records served through the service layer until
 * Neon PostgreSQL + Prisma 7 are wired in Step 2 of the roadmap.
 * UI components never hardcode products directly; they query this service.
 */
const SEED_CATEGORIES: Category[] = [
  {
    id: "cat-kemeja",
    name: "Kemeja",
    slug: "kemeja",
    description: "Potongan boxy dan kerah terbuka berbahan katun tenun.",
    sortOrder: 1,
    isActive: true,
    accentBlock: "ink",
    imageUrl: DEMO_IMAGES.shirtDenimHanger,
    imageAlt: "Kategori Kemeja Tenun Mandiri Global",
  },
  {
    id: "cat-kaos",
    name: "Kaos",
    slug: "kaos",
    description: "Katun combed 20s dan 16s yang kokoh dipakai harian.",
    sortOrder: 2,
    isActive: true,
    accentBlock: "brick",
    imageUrl: DEMO_IMAGES.teeBlackModel,
    imageAlt: "Kategori Kaos Heavyweight Mandiri Global",
  },
  {
    id: "cat-celana",
    name: "Celana",
    slug: "celana",
    description: "Twill dan chino berpotongan longgar untuk gerak leluasa.",
    sortOrder: 3,
    isActive: true,
    accentBlock: "photo",
    imageUrl: DEMO_IMAGES.chinoKhakiModel,
    imageAlt: "Kategori Celana Chino & Twill Mandiri Global",
  },
  {
    id: "cat-aksesori",
    name: "Aksesori",
    slug: "aksesori",
    description: "Topi kanvas, tas selempang, dan pelengkap harian.",
    sortOrder: 4,
    isActive: true,
    accentBlock: "brick-deep",
    imageUrl: DEMO_IMAGES.capWhite,
    imageAlt: "Kategori Aksesori Topi & Tas Mandiri Global",
  },
];

const SEED_PRODUCTS: Product[] = [
  {
    id: "prod-kemeja-losari",
    name: "Kemeja Boxy Katun Pesisir",
    slug: "kemeja-boxy-katun-pesisir",
    description:
      "Kemeja lengan pendek dengan potongan boxy lebar dan saku dada persegi dua lapis. Ditenun dari katun poplin 185 gsm yang tetap sejuk di udara pesisir.",
    materialNote: "100% katun poplin 185 gsm, kancing resin pekat, jahitan rantai ganda.",
    categoryId: "cat-kemeja",
    categorySlug: "kemeja",
    categoryName: "Kemeja",
    status: "ACTIVE",
    badge: "NEW",
    isFeatured2x2: true,
    isFinalSale: false,
    isReturnable: true,
    images: [
      {
        id: "img-1a",
        url: DEMO_IMAGES.shirtDenimHanger,
        alt: "Kemeja Boxy Katun Pesisir warna Navy Tinta tampak depan",
        label: "Tampak depan",
        swatchHex: "#2D2D56",
        sortOrder: 1,
      },
      {
        id: "img-1b",
        url: DEMO_IMAGES.shirtsFolded,
        alt: "Detail kerah dan lipatan saku Kemeja Boxy Katun Pesisir",
        label: "Detail kain",
        swatchHex: "#2D2D56",
        sortOrder: 2,
      },
      {
        id: "img-1c",
        url: DEMO_IMAGES.rackNeutral,
        alt: "Kemeja Boxy Katun Pesisir tampak belakang",
        label: "Tampak belakang",
        swatchHex: "#2D2D56",
        sortOrder: 3,
      },
    ],
    variants: [
      {
        id: "var-losari-s",
        productId: "prod-kemeja-losari",
        sku: "MG-KMJ-LSR-NVY-S",
        size: "S",
        color: "Navy Tinta",
        colorHex: "#2D2D56",
        price: 225000,
        compareAtPrice: null,
        stock: 8,
        weightGram: 320,
        isActive: true,
      },
      {
        id: "var-losari-m",
        productId: "prod-kemeja-losari",
        sku: "MG-KMJ-LSR-NVY-M",
        size: "M",
        color: "Navy Tinta",
        colorHex: "#2D2D56",
        price: 225000,
        compareAtPrice: null,
        stock: 12,
        weightGram: 340,
        isActive: true,
      },
      {
        id: "var-losari-l",
        productId: "prod-kemeja-losari",
        sku: "MG-KMJ-LSR-NVY-L",
        size: "L",
        color: "Navy Tinta",
        colorHex: "#2D2D56",
        price: 225000,
        compareAtPrice: null,
        stock: 3,
        weightGram: 360,
        isActive: true,
      },
      {
        id: "var-losari-xl",
        productId: "prod-kemeja-losari",
        sku: "MG-KMJ-LSR-NVY-XL",
        size: "XL",
        color: "Navy Tinta",
        colorHex: "#2D2D56",
        price: 225000,
        compareAtPrice: null,
        stock: 0,
        weightGram: 380,
        isActive: true,
      },
    ],
  },
  {
    id: "prod-kaos-paotere",
    name: "Kaos Heavyweight Paotere",
    slug: "kaos-heavyweight-paotere",
    description:
      "Kaos harian berbahan katun 16s 235 gsm dengan rib leher tebal 2,5 cm yang tidak mudah melar setelah dicuci berulang kali.",
    materialNote: "100% katun 16s 235 gsm, potongan boxy rileks.",
    categoryId: "cat-kaos",
    categorySlug: "kaos",
    categoryName: "Kaos",
    status: "ACTIVE",
    badge: "BESTSELLER",
    isFinalSale: false,
    isReturnable: true,
    images: [
      {
        id: "img-2a",
        url: DEMO_IMAGES.teeBlackModel,
        alt: "Kaos Heavyweight Paotere warna Terracotta tampak depan",
        label: "Tampak depan",
        swatchHex: "#B8523C",
        sortOrder: 1,
      },
      {
        id: "img-2b",
        url: DEMO_IMAGES.teesRack,
        alt: "Detail rib kerah Kaos Heavyweight Paotere",
        label: "Detail kain",
        swatchHex: "#B8523C",
        sortOrder: 2,
      },
    ],
    variants: [
      {
        id: "var-paotere-s",
        productId: "prod-kaos-paotere",
        sku: "MG-KAS-PTR-TRC-S",
        size: "S",
        color: "Terracotta",
        colorHex: "#B8523C",
        price: 160000,
        compareAtPrice: null,
        stock: 10,
        weightGram: 280,
        isActive: true,
      },
      {
        id: "var-paotere-m",
        productId: "prod-kaos-paotere",
        sku: "MG-KAS-PTR-TRC-M",
        size: "M",
        color: "Terracotta",
        colorHex: "#B8523C",
        price: 160000,
        compareAtPrice: null,
        stock: 14,
        weightGram: 295,
        isActive: true,
      },
      {
        id: "var-paotere-l",
        productId: "prod-kaos-paotere",
        sku: "MG-KAS-PTR-TRC-L",
        size: "L",
        color: "Terracotta",
        colorHex: "#B8523C",
        price: 160000,
        compareAtPrice: null,
        stock: 6,
        weightGram: 310,
        isActive: true,
      },
    ],
  },
  {
    id: "prod-celana-somba",
    name: "Celana Chino Lebar Somba",
    slug: "celana-chino-lebar-somba",
    description:
      "Celana panjang potongan lurus lebar dengan lipatan depan tunggal dan saku belakang berpenutup kancing. Nyaman untuk duduk maupun berjalan jauh.",
    materialNote: "Katun twill 290 gsm, ritsleting logam YKK.",
    categoryId: "cat-celana",
    categorySlug: "celana",
    categoryName: "Celana",
    status: "ACTIVE",
    badge: "SALE",
    isFinalSale: false,
    isReturnable: true,
    images: [
      {
        id: "img-3a",
        url: DEMO_IMAGES.chinoKhakiModel,
        alt: "Celana Chino Lebar Somba warna Navy Tinta tampak depan",
        label: "Tampak depan",
        swatchHex: "#2D2D56",
        sortOrder: 1,
      },
      {
        id: "img-3b",
        url: DEMO_IMAGES.pantsNavyFlat,
        alt: "Detail lipatan pinggang Celana Chino Lebar Somba",
        label: "Detail jahitan",
        swatchHex: "#2D2D56",
        sortOrder: 2,
      },
    ],
    variants: [
      {
        id: "var-somba-m",
        productId: "prod-celana-somba",
        sku: "MG-CLN-SMB-NVY-M",
        size: "M",
        color: "Navy Tinta",
        colorHex: "#2D2D56",
        price: 285000,
        compareAtPrice: 340000,
        stock: 5,
        weightGram: 520,
        isActive: true,
      },
      {
        id: "var-somba-l",
        productId: "prod-celana-somba",
        sku: "MG-CLN-SMB-NVY-L",
        size: "L",
        color: "Navy Tinta",
        colorHex: "#2D2D56",
        price: 285000,
        compareAtPrice: 340000,
        stock: 4,
        weightGram: 540,
        isActive: true,
      },
      {
        id: "var-somba-xl",
        productId: "prod-celana-somba",
        sku: "MG-CLN-SMB-NVY-XL",
        size: "XL",
        color: "Navy Tinta",
        colorHex: "#2D2D56",
        price: 285000,
        compareAtPrice: 340000,
        stock: 0,
        weightGram: 560,
        isActive: true,
      },
    ],
  },
  {
    id: "prod-topi-benteng",
    name: "Topi Kanvas Enam Panel",
    slug: "topi-kanvas-enam-panel",
    description:
      "Topi enam panel tanpa struktur kaku di bagian mahkota, dilengkapi pengait logam di belakang dan bordir monogram kotak Mandiri Global.",
    materialNote: "Kanvas katun 12 oz, lingkar kepala 55 sampai 61 cm.",
    categoryId: "cat-aksesori",
    categorySlug: "aksesori",
    categoryName: "Aksesori",
    status: "ACTIVE",
    badge: null,
    isFinalSale: false,
    isReturnable: true,
    images: [
      {
        id: "img-4a",
        url: DEMO_IMAGES.capWhite,
        alt: "Topi Kanvas Enam Panel warna Putih Kapur",
        label: "Tampak samping",
        swatchHex: "#FFFFFF",
        sortOrder: 1,
      },
    ],
    variants: [
      {
        id: "var-topi-os",
        productId: "prod-topi-benteng",
        sku: "MG-AKS-TPI-WHT-OS",
        size: "OS",
        color: "Putih Kapur",
        colorHex: "#FFFFFF",
        price: 125000,
        compareAtPrice: null,
        stock: 15,
        weightGram: 140,
        isActive: true,
      },
    ],
  },
  {
    id: "prod-kemeja-tenun-saku",
    name: "Kemeja Kerja Kerah Terbuka",
    slug: "kemeja-kerja-kerah-terbuka",
    description:
      "Kemeja kerah terbuka dengan dua saku bawah berpotongan sudut 45 derajat. Dirancang sebagai luaran ringan maupun kemeja tunggal.",
    materialNote: "Katun oxford 210 gsm, jahitan tepi presisi.",
    categoryId: "cat-kemeja",
    categorySlug: "kemeja",
    categoryName: "Kemeja",
    status: "ACTIVE",
    badge: "HOT_DROP",
    isFinalSale: false,
    isReturnable: true,
    images: [
      {
        id: "img-5a",
        url: DEMO_IMAGES.editorialRed,
        alt: "Kemeja Kerja Kerah Terbuka warna Bata Gelap",
        label: "Tampak depan",
        swatchHex: "#9A3F2B",
        sortOrder: 1,
      },
      {
        id: "img-5b",
        url: DEMO_IMAGES.shirtsFolded,
        alt: "Detail kerah terbuka kemeja kerja",
        label: "Detail lipatan",
        swatchHex: "#9A3F2B",
        sortOrder: 2,
      },
    ],
    variants: [
      {
        id: "var-kerja-m",
        productId: "prod-kemeja-tenun-saku",
        sku: "MG-KMJ-KRJ-BRK-M",
        size: "M",
        color: "Bata Gelap",
        colorHex: "#9A3F2B",
        price: 245000,
        compareAtPrice: null,
        stock: 2,
        weightGram: 370,
        isActive: true,
      },
      {
        id: "var-kerja-l",
        productId: "prod-kemeja-tenun-saku",
        sku: "MG-KMJ-KRJ-BRK-L",
        size: "L",
        color: "Bata Gelap",
        colorHex: "#9A3F2B",
        price: 245000,
        compareAtPrice: null,
        stock: 7,
        weightGram: 390,
        isActive: true,
      },
    ],
  },
  {
    id: "prod-tas-selempang-lipat",
    name: "Tas Selempang Kanvas Lipat",
    slug: "tas-selempang-kanvas-lipat",
    description:
      "Tas selempang harian dengan penutup lipat bersudut 45 derajat dan ruang utama yang muat buku catatan A4 serta botol minum.",
    materialNote: "Kanvas katun 14 oz tahan percikan ringan.",
    categoryId: "cat-aksesori",
    categorySlug: "aksesori",
    categoryName: "Aksesori",
    status: "ACTIVE",
    badge: "NEW",
    isFinalSale: true,
    isReturnable: false,
    images: [
      {
        id: "img-6a",
        url: DEMO_IMAGES.backpackNavy,
        alt: "Tas Selempang Kanvas Lipat warna Navy Tinta",
        label: "Tampak depan",
        swatchHex: "#2D2D56",
        sortOrder: 1,
      },
    ],
    variants: [
      {
        id: "var-tas-os",
        productId: "prod-tas-selempang-lipat",
        sku: "MG-AKS-TAS-NVY-OS",
        size: "OS",
        color: "Navy Tinta",
        colorHex: "#2D2D56",
        price: 195000,
        compareAtPrice: null,
        stock: 0,
        weightGram: 350,
        isActive: true,
      },
    ],
  },
  {
    id: "prod-kaos-garis-pelabuhan",
    name: "Kaos Lengan Panjang Pelabuhan",
    slug: "kaos-lengan-panjang-pelabuhan",
    description:
      "Kaos lengan panjang dengan manset pergelangan rapat dan belahan samping bawah 3 cm agar jatuhnya rapi di pinggang.",
    materialNote: "100% katun combed 20s 210 gsm.",
    categoryId: "cat-kaos",
    categorySlug: "kaos",
    categoryName: "Kaos",
    status: "ACTIVE",
    badge: null,
    isFinalSale: false,
    isReturnable: true,
    images: [
      {
        id: "img-7a",
        url: DEMO_IMAGES.teeWhiteModel,
        alt: "Kaos Lengan Panjang Pelabuhan warna Putih Kapur",
        label: "Tampak depan",
        swatchHex: "#FFFFFF",
        sortOrder: 1,
      },
      {
        id: "img-7b",
        url: DEMO_IMAGES.teePrintedFlat,
        alt: "Detail kerah kaos katun combed",
        label: "Detail kain",
        swatchHex: "#FFFFFF",
        sortOrder: 2,
      },
    ],
    variants: [
      {
        id: "var-pelabuhan-s",
        productId: "prod-kaos-garis-pelabuhan",
        sku: "MG-KAS-PLB-WHT-S",
        size: "S",
        color: "Putih Kapur",
        colorHex: "#FFFFFF",
        price: 185000,
        compareAtPrice: null,
        stock: 9,
        weightGram: 330,
        isActive: true,
      },
      {
        id: "var-pelabuhan-m",
        productId: "prod-kaos-garis-pelabuhan",
        sku: "MG-KAS-PLB-WHT-M",
        size: "M",
        color: "Putih Kapur",
        colorHex: "#FFFFFF",
        price: 185000,
        compareAtPrice: null,
        stock: 11,
        weightGram: 345,
        isActive: true,
      },
      {
        id: "var-pelabuhan-l",
        productId: "prod-kaos-garis-pelabuhan",
        sku: "MG-KAS-PLB-WHT-L",
        size: "L",
        color: "Putih Kapur",
        colorHex: "#FFFFFF",
        price: 185000,
        compareAtPrice: null,
        stock: 4,
        weightGram: 360,
        isActive: true,
      },
    ],
  },
];

const SEED_ORDERS: OrderRecord[] = [
  {
    id: "ord-1",
    orderNumber: "MG-261030-K8M2",
    customerName: "Andi Tenri",
    customerEmail: "tenri@contoh.id",
    customerPhone: "081241239876",
    status: "SHIPPED",
    paymentStatus: "PAID",
    paymentMethodLabel: "Virtual Account BCA",
    vaNumber: "8277081241239876",
    courierLabel: "JNE Reguler",
    waybillId: "JNE88291044712",
    addressLine: "Jl. Pettarani No. 48, Blok B2",
    districtCityProvince: "Panakkukang, Makassar, Sulawesi Selatan",
    postalCode: "90231",
    subtotal: 385000,
    voucherDiscount: 0,
    shippingCost: 14000,
    shippingDiscount: 0,
    taxAmount: 0,
    paymentFee: 4000,
    grandTotal: 403000,
    createdAt: "2026-10-29T10:15:00+08:00",
    expiresAt: "2026-10-29T10:30:00+08:00",
    items: [
      {
        id: "oi-1",
        variantId: "var-losari-m",
        productNameSnapshot: "Kemeja Boxy Katun Pesisir",
        variantLabelSnapshot: "Navy Tinta, Ukuran M",
        skuSnapshot: "MG-KMJ-LSR-NVY-M",
        unitPrice: 225000,
        quantity: 1,
        lineTotal: 225000,
        weightGram: 340,
        swatchHex: "#2D2D56",
        imageSnapshot: DEMO_IMAGES.shirtDenimHanger,
      },
      {
        id: "oi-2",
        variantId: "var-paotere-m",
        productNameSnapshot: "Kaos Heavyweight Paotere",
        variantLabelSnapshot: "Terracotta, Ukuran M",
        skuSnapshot: "MG-KAS-PTR-TRC-M",
        unitPrice: 160000,
        quantity: 1,
        lineTotal: 160000,
        weightGram: 295,
        swatchHex: "#B8523C",
        imageSnapshot: DEMO_IMAGES.teeBlackModel,
      },
    ],
    timeline: [
      {
        id: "ev-4",
        status: "Paket sedang diantar kurir ke alamat tujuan",
        note: "Hub Panakkukang, Makassar",
        occurredAt: "30 Okt 2026, 14.20 WITA",
      },
      {
        id: "ev-3",
        status: "Paket tiba di fasilitas sortir Makassar",
        note: "Gateway Sultan Hasanuddin",
        occurredAt: "30 Okt 2026, 08.05 WITA",
      },
      {
        id: "ev-2",
        status: "Pesanan diserahkan ke kurir JNE",
        note: "Nomor resi JNE88291044712 diterbitkan",
        occurredAt: "29 Okt 2026, 16.40 WITA",
      },
      {
        id: "ev-1",
        status: "Pembayaran terverifikasi dan pesanan dikemas",
        note: "Virtual Account BCA",
        occurredAt: "29 Okt 2026, 10.19 WITA",
      },
    ],
  },
  {
    id: "ord-2",
    orderNumber: "MG-261030-P4R9",
    customerName: "Rizky Pratama",
    customerEmail: "rizky@contoh.id",
    customerPhone: "081355002211",
    status: "PROCESSING",
    paymentStatus: "PAID",
    paymentMethodLabel: "QRIS",
    vaNumber: null,
    courierLabel: "SiCepat REG",
    waybillId: null,
    addressLine: "Jl. Tebet Raya No. 19",
    districtCityProvince: "Tebet, Jakarta Selatan, DKI Jakarta",
    postalCode: "12810",
    subtotal: 285000,
    voucherDiscount: 0,
    shippingCost: 32000,
    shippingDiscount: 0,
    taxAmount: 0,
    paymentFee: 2219,
    grandTotal: 319219,
    createdAt: "2026-10-30T18:10:00+08:00",
    expiresAt: "2026-10-30T18:25:00+08:00",
    items: [
      {
        id: "oi-3",
        variantId: "var-somba-l",
        productNameSnapshot: "Celana Chino Lebar Somba",
        variantLabelSnapshot: "Navy Tinta, Ukuran L",
        skuSnapshot: "MG-CLN-SMB-NVY-L",
        unitPrice: 285000,
        quantity: 1,
        lineTotal: 285000,
        weightGram: 540,
        swatchHex: "#2D2D56",
        imageSnapshot: DEMO_IMAGES.chinoKhakiModel,
      },
    ],
    timeline: [
      {
        id: "ev-20",
        status: "Pembayaran diterima, menunggu pengemasan admin",
        note: "QRIS",
        occurredAt: "30 Okt 2026, 18.12 WITA",
      },
    ],
  },
  {
    id: "ord-3",
    orderNumber: "MG-261030-W9T1",
    customerName: "Nadira Putri",
    customerEmail: "nadira@contoh.id",
    customerPhone: "082199887766",
    status: "PENDING_PAYMENT",
    paymentStatus: "UNPAID",
    paymentMethodLabel: "Virtual Account Mandiri",
    vaNumber: "8902208219988776",
    courierLabel: "J&T Express EZ",
    waybillId: null,
    addressLine: "Jl. Diponegoro No. 72",
    districtCityProvince: "Tegalsari, Surabaya, Jawa Timur",
    postalCode: "60264",
    subtotal: 245000,
    voucherDiscount: 0,
    shippingCost: 26000,
    shippingDiscount: 0,
    taxAmount: 0,
    paymentFee: 4000,
    grandTotal: 275000,
    createdAt: "2026-10-30T20:52:00+08:00",
    expiresAt: "2026-10-30T21:07:00+08:00",
    items: [
      {
        id: "oi-4",
        variantId: "var-kerja-l",
        productNameSnapshot: "Kemeja Kerja Kerah Terbuka",
        variantLabelSnapshot: "Bata Gelap, Ukuran L",
        skuSnapshot: "MG-KMJ-KRJ-BRK-L",
        unitPrice: 245000,
        quantity: 1,
        lineTotal: 245000,
        weightGram: 390,
        swatchHex: "#9A3F2B",
        imageSnapshot: DEMO_IMAGES.editorialRed,
      },
    ],
    timeline: [
      {
        id: "ev-30",
        status: "Pesanan dibuat dan stok dikunci selama 15 menit",
        note: "Menunggu pembayaran Virtual Account Mandiri",
        occurredAt: "30 Okt 2026, 20.52 WITA",
      },
    ],
  },
];

const SEED_FAQ: FaqEntry[] = [
  {
    id: "faq-1",
    category: "Pemesanan dan Pembayaran",
    question: "Berapa lama batas waktu pembayaran pesanan?",
    answer:
      "Setiap pesanan memiliki waktu pembayaran 15 menit sejak kamu menekan tombol Bayar sekarang. Selama 15 menit itu stok dikunci khusus untukmu. Jika lewat 15 menit belum dibayar, pesanan otomatis dibatalkan dan stok dikembalikan ke katalog.",
  },
  {
    id: "faq-2",
    category: "Pemesanan dan Pembayaran",
    question: "Apakah ada biaya tambahan saat membayar?",
    answer:
      "Biaya layanan mengikuti metode pembayaran yang kamu pilih (misalnya Virtual Account atau QRIS) dan selalu ditampilkan sebagai baris tersendiri di ringkasan pesanan sebelum kamu membayar.",
  },
  {
    id: "faq-3",
    category: "Pengiriman",
    question: "Dari mana pesanan dikirim dan berapa lama sampainya?",
    answer:
      "Seluruh pesanan dikirim dari gudang Mandiri Global di Makassar, Sulawesi Selatan. Tarif dan estimasi hari pengiriman dihitung langsung dari lokasi kode pos tujuanmu saat checkout.",
  },
  {
    id: "faq-4",
    category: "Ukuran dan Retur",
    question: "Bagaimana jika ukuran yang saya terima kurang pas?",
    answer:
      "Kamu bisa mengajukan penukaran ukuran maksimal 7 hari sejak pesanan diterima selama produk belum dipakai, belum dicuci, label masih terpasang, dan bukan produk final sale. Ongkos kirim penukaran ukuran ditanggung pembeli.",
  },
];

const SEED_SIZE_GUIDE: SizeGuideRow[] = [
  { size: "S", chestCm: 54, lengthCm: 68, shoulderCm: 47 },
  { size: "M", chestCm: 57, lengthCm: 70, shoulderCm: 49 },
  { size: "L", chestCm: 60, lengthCm: 72, shoulderCm: 51 },
  { size: "XL", chestCm: 63, lengthCm: 74, shoulderCm: 53 },
];

export interface CatalogFilterParams {
  category?: string;
  size?: string;
  color?: string;
  priceRange?: "all" | "under150" | "150to250" | "above250";
  onlyAvailable?: boolean;
  sort?: "newest" | "price_asc" | "price_desc" | "bestseller";
  query?: string;
}

export function listCategories(): Category[] {
  return SEED_CATEGORIES.filter((c) => c.isActive).sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
}

export function listProducts(filters: CatalogFilterParams = {}): Product[] {
  let results = SEED_PRODUCTS.filter((p) => p.status === "ACTIVE");

  if (filters.category && filters.category !== "all") {
    results = results.filter((p) => p.categorySlug === filters.category);
  }

  if (filters.size) {
    results = results.filter((p) =>
      p.variants.some((v) => v.isActive && v.size === filters.size)
    );
  }

  if (filters.color) {
    results = results.filter((p) =>
      p.variants.some((v) => v.isActive && v.color === filters.color)
    );
  }

  if (filters.onlyAvailable) {
    results = results.filter((p) => getProductTotalStock(p) > 0);
  }

  if (filters.priceRange && filters.priceRange !== "all") {
    results = results.filter((p) => {
      const { price } = getProductDisplayPrice(p);
      if (filters.priceRange === "under150") return price < 150000;
      if (filters.priceRange === "150to250")
        return price >= 150000 && price <= 250000;
      if (filters.priceRange === "above250") return price > 250000;
      return true;
    });
  }

  if (filters.query && filters.query.trim().length > 0) {
    const q = filters.query.trim().toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    );
  }

  const sorted = [...results];
  if (filters.sort === "price_asc") {
    sorted.sort(
      (a, b) => getProductDisplayPrice(a).price - getProductDisplayPrice(b).price
    );
  } else if (filters.sort === "price_desc") {
    sorted.sort(
      (a, b) => getProductDisplayPrice(b).price - getProductDisplayPrice(a).price
    );
  } else if (filters.sort === "bestseller") {
    sorted.sort((a, b) => {
      const aBest = a.badge === "BESTSELLER" ? 1 : 0;
      const bBest = b.badge === "BESTSELLER" ? 1 : 0;
      return bBest - aBest;
    });
  }

  return sorted;
}

export function getProductBySlug(slug: string): Product | null {
  return (
    SEED_PRODUCTS.find((p) => p.slug === slug && p.status === "ACTIVE") ?? null
  );
}

export function listRelatedProducts(
  currentProductId: string,
  categoryId: string
): Product[] {
  const sameCategory = SEED_PRODUCTS.filter(
    (p) =>
      p.status === "ACTIVE" &&
      p.id !== currentProductId &&
      p.categoryId === categoryId
  );
  const others = SEED_PRODUCTS.filter(
    (p) =>
      p.status === "ACTIVE" &&
      p.id !== currentProductId &&
      p.categoryId !== categoryId
  );
  return [...sameCategory, ...others].slice(0, 4);
}

export function listAvailableFilterOptions(): {
  sizes: string[];
  colors: Array<{ name: string; hex: string }>;
} {
  const sizes = ["S", "M", "L", "XL", "OS"];
  const colorMap = new Map<string, string>();
  for (const product of SEED_PRODUCTS) {
    for (const variant of product.variants) {
      if (variant.isActive && !colorMap.has(variant.color)) {
        colorMap.set(variant.color, variant.colorHex);
      }
    }
  }
  return {
    sizes,
    colors: Array.from(colorMap.entries()).map(([name, hex]) => ({
      name,
      hex,
    })),
  };
}

export function listOrders(): OrderRecord[] {
  return SEED_ORDERS;
}

export function getOrderByNumber(orderNumber: string): OrderRecord {
  return (
    SEED_ORDERS.find(
      (o) => o.orderNumber.toLowerCase() === orderNumber.toLowerCase()
    ) ?? {
      ...SEED_ORDERS[0],
      orderNumber: orderNumber.toUpperCase(),
    }
  );
}

export function listLowStockVariants(threshold = 5) {
  const items: Array<{
    variantId: string;
    sku: string;
    productName: string;
    size: string;
    color: string;
    stock: number;
  }> = [];

  for (const product of SEED_PRODUCTS) {
    for (const variant of product.variants) {
      if (variant.isActive && variant.stock <= threshold) {
        items.push({
          variantId: variant.id,
          sku: variant.sku,
          productName: product.name,
          size: variant.size,
          color: variant.color,
          stock: variant.stock,
        });
      }
    }
  }

  return items.sort((a, b) => a.stock - b.stock);
}

export function listFaqEntries(): FaqEntry[] {
  return SEED_FAQ;
}

export function listSizeGuideRows(): SizeGuideRow[] {
  return SEED_SIZE_GUIDE;
}

