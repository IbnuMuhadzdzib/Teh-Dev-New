// src/data/servicesData.ts

export interface BenefitItem {
  title: string;
  desc: string;
}

export interface ToolItem {
  name: string;
  desc: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  benefitTitle: string;
  benefitSubtitle: string;
  benefits: BenefitItem[];
  techTitle: string;
  techSubtitle: string;
  techSubtitle2?: string; 
  tools: ToolItem[];
}

// ============================================================================
// 1. PENGEMBANGAN WEBSITE
// ============================================================================
export const serviceWebsiteDevelopment: ServiceDetail = {
  slug: 'pengembangan-website',
  title: 'Pengembangan Website Kustom',
  subtitle: 'Bangun kehadiran digital yang berkinerja tinggi dan siap mengakselerasi skala bisnis Anda. Kami tidak sekadar membuat website, kami merancang solusi teknologi kustom yang aman, cepat, dan sepenuhnya disesuaikan dengan visi unik perusahaan Anda.',
  
  benefitTitle: 'Benefit Utama',
  benefitSubtitle: 'Website profesional untuk bisnis Anda. Mudah, cepat, dan dibangun tanpa proses yang rumit untuk hasil yang maksimal.',
  benefits: [
    { 
      title: 'Performa Kilat & Load Time Optimal', 
      desc: 'Kecepatan pemuatan halaman yang optimal adalah kunci retensi pengguna. Kami mengoptimalkan setiap baris kode dan aset visual agar website Anda memuat dalam hitungan detik, memberikan pengalaman yang mulus sekaligus meningkatkan skor SEO secara signifikan.' 
    },
    { 
      title: 'Desain Responsif Multi-Device', 
      desc: 'Tampilan antarmuka yang dirancang agar beradaptasi sempurna di berbagai perangkat. Baik diakses melalui layar ponsel pintar yang sempit maupun monitor desktop ultra-lebar, kami memastikan setiap interaksi tetap natural dan memanjakan mata pengunjung.' 
    },
    { 
      title: 'Skalabilitas Arsitektur Tinggi', 
      desc: 'Infrastruktur basis data dan arsitektur server yang dirancang khusus agar mudah diperbesar kapasitasnya. Seiring dengan melesatnya pertumbuhan pengguna dan lonjakan trafik bisnis Anda, sistem akan tetap berjalan stabil tanpa hambatan.' 
    },
    { 
      title: 'Keamanan Tingkat Lanjut', 
      desc: 'Melindungi data bisnis dan pelanggan Anda adalah prioritas utama kami. Kami menerapkan protokol keamanan standar industri, enkripsi data yang ketat, dan perlindungan proaktif terhadap kerentanan siber untuk memastikan ketenangan pikiran Anda.' 
    },
    { 
      title: 'Dukungan SEO & Analitik Terintegrasi', 
      desc: 'Website tidak hanya sekadar indah, tapi juga harus mudah ditemukan oleh calon klien. Kami membangun struktur web yang ramah mesin pencari (SEO-friendly) sejak hari pertama, lengkap dengan integrasi analitik mendalam untuk memantau perilaku audiens Anda.' 
    }
  ],

  techTitle: 'Tool & Tech Stack',
  techSubtitle: 'Kami menggunakan tumpukan teknologi modern yang teruji di industri untuk memastikan produk perangkat lunak Anda berkinerja tangguh, aman, dan mudah dipelihara di masa depan.',
  techSubtitle2: 'Kombinasi ekosistem JavaScript/TypeScript modern dan framework backend berstandar enterprise ini memungkinkan kami membangun arsitektur sistem yang responsif, terstruktur, serta siap menghadapi lonjakan trafik tanpa kompromi pada aspek keamanan.',
  tools: [
    { name: 'Vue 3', desc: 'Framework frontend progresif untuk membangun antarmuka pengguna yang reaktif, ringan, dan sangat interaktif.' },
    { name: 'React', desc: 'Pustaka JavaScript standar industri untuk menciptakan antarmuka web dinamis dengan komponen yang dapat digunakan ulang.' },
    { name: 'TypeScript', desc: 'Superset JavaScript yang menghadirkan keamanan tipe data (type-safety), meminimalisir bug sejak fase pengembangan.' },
    { name: 'JavaScript (ES6+)', desc: 'Bahasa pemrograman inti yang menghidupkan ekosistem web modern, memastikan interaktivitas mulus di sisi klien.' },
    { name: 'Node.js', desc: 'Runtime environment tangguh untuk mengeksekusi JavaScript di sisi server pada aplikasi berkinerja tinggi.' },
    { name: 'Express.js', desc: 'Framework web minimalis dan fleksibel untuk memfasilitasi pembuatan RESTful API yang cepat dan kokoh.' },
    { name: 'Nest.js', desc: 'Framework Node.js berarsitektur modern untuk membangun sistem backend skala enterprise yang efisien dan skalabel.' },
    { name: 'Laravel', desc: 'Framework PHP elegan dengan ekosistem kaya fitur, ideal untuk membangun aplikasi web aman dengan waktu efisien.' }
  ]
};

// ============================================================================
// 2. UI/UX DESAIN
// ============================================================================
export const serviceUiUxDesign: ServiceDetail = {
  slug: 'ui-ux-desain',
  title: 'Desain UI/UX & Antarmuka Digital',
  subtitle: 'Ciptakan pengalaman pengguna yang intuitif, estetis, dan berbasis data. Kami membantu mengubah ide kompleks Anda menjadi desain antarmuka web dan aplikasi yang tidak hanya memanjakan mata, tetapi juga mampu meningkatkan retensi dan konversi bisnis secara signifikan.',
  
  benefitTitle: 'Benefit Utama',
  benefitSubtitle: 'Solusi desain intuitif yang memprioritaskan kenyamanan pengguna sekaligus memaksimalkan angka konversi produk digital Anda.',
  benefits: [
    { 
      title: 'Riset Pengguna Berbasis Data (User-Centered Research)', 
      desc: 'Kami mendalami perilaku, kebutuhan, dan kendala utama target audiens Anda melalui metode analisis mendalam sebelum menyusun kanvas desain, memastikan produk tepat sasaran sejak awal.' 
    },
    { 
      title: 'Arsitektur Informasi & Wireframing Presisi', 
      desc: 'Menyusun struktur navigasi dan alur pengguna yang logis, efisien, dan tanpa hambatan untuk meminimalkan tingkat kebingungan pengunjung saat mengeksplorasi layanan Anda.' 
    },
    { 
      title: 'Sistem Desain Modular & Konsisten (Design System)', 
      desc: 'Membangun pustaka komponen visual yang terstandarisasi (skema warna, tipografi, ikonografi) sehingga mudah dikembangkan secara konsisten oleh tim pengembang di masa mendatang.' 
    },
    { 
      title: 'Prototyping Interaktif & Usability Testing', 
      desc: 'Menghadirkan simulasi nyata berupa prototipe interaktif yang dapat diuji sebelum tahap koding dimulai, menghemat waktu dan biaya pengembangan secara substansial.' 
    },
    { 
      title: 'Optimasi Konversi (CRO-Oriented UI)', 
      desc: 'Memadukan estetika visual dengan penempatan tata letak dan tombol penyeruan aksi (CTA) yang terbukti secara psikologis mampu mendorong angka transaksi dan keterlibatan pengguna.' 
    }
  ],

  techTitle: 'Tool & Tech Stack',
  techSubtitle: 'Kami memanfaatkan alur kerja dan alat ekosistem desain standar industri internasional untuk menghadirkan sistem desain dan prototipe kelas atas.',
  tools: [
    { name: 'Figma', desc: 'Alat desain kolaboratif terdepan untuk pembuatan UI, prototipe interaktif, dan pengelolaan sistem desain secara real-time.' },
    { name: 'FigJam', desc: 'Papan tulis digital interaktif untuk pemetaan alur pengguna (user flow), petaan konsep, dan kolaborasi brainstorming awal.' },
    { name: 'Adobe XD', desc: 'Platform desain antarmuka modern untuk pembuatan wireframe presisi dan prototipe aplikasi berbasis vektor.' },
    { name: 'Protopie', desc: 'Software prototipe canggih untuk mensimulasikan interaksi mikroseluler, sensor HP, dan animasi kompleks seperti aplikasi rilis.' },
    { name: 'Tailwind CSS', desc: 'Framework CSS berbasis utility untuk menjembatani sistem desain ke dalam tokens kode frontend yang siap diimplementasikan.' },
    { name: 'TypeScript / Vue 3', desc: 'Pemahaman teknis mendalam agar seluruh komponen desain yang dibuat 100% realistis dan efisien untuk dibangun oleh tim dev.' }
  ]
};

// ============================================================================
// 3. VIDEO EDITING
// ============================================================================
export const serviceVideoEditing: ServiceDetail = {
  slug: 'video-editing',
  title: 'Produksi & Video Editing Profesional',
  subtitle: 'Ubah mentahan video Anda menjadi konten visual yang memikat dan menyampaikan pesan brand secara kuat. Kami menghadirkan storytelling visual dinamis, efek khusus, dan tata suara profesional untuk kampanye promosi, media sosial, hingga kebutuhan korporat.',
  
  benefitTitle: 'Benefit Utama',
  benefitSubtitle: 'Konten video berkualitas tinggi yang dirancang untuk menarik perhatian audiens dalam detik-detik awal dan meningkatkan impresi brand Anda.',
  benefits: [
    { 
      title: 'Visual Storytelling yang Memikat', 
      desc: 'Kami menyusun alur narasi video yang terstruktur dan dinamis, memastikan pesan bisnis atau promosi produk Anda tersampaikan secara emosional dan meninggalkan kesan mendalam.' 
    },
    { 
      title: 'Motion Graphics & Visual Effects (VFX)', 
      desc: 'Penambahan elemen grafis bergerak, animasi teks modern, Lower Thirds, dan transisi halus untuk memberikan tampilan kelas atas pada setiap produksi video Anda.' 
    },
    { 
      title: 'Pewarnaan Kelas Sinematik (Color Grading)', 
      desc: 'Mengoptimalkan tone warna dan pencahayaan agar selaras dengan mood brand Anda, memberikan hasil akhir yang estetik, profesional, dan setara standar siaran.' 
    },
    { 
      title: 'Desain Audio & Mixing Presisi', 
      desc: 'Menyelaraskan instrumen musik latar, pembersihan kebisingan latar (noise reduction), dan efek suara (SFX) untuk menghasilkan audio yang jernih dan imersif.' 
    },
    { 
      title: 'Optimasi Multi-Format & Platform', 
      desc: 'Hasil akhir dirender dan disesuaikan secara khusus baik aspek rasio maupun resolusinya untuk kebutuhan TikTok, Instagram Reels, YouTube, maupun presentasi korporat.' 
    }
  ],

  techTitle: 'Tool & Tech Stack',
  techSubtitle: 'Perangkat lunak pemrosesan video dan tata suara kelas profesional untuk menjamin hasil eksekusi visual dengan standar industri penyiaran.',
  tools: [
    { name: 'Adobe Premiere Pro', desc: 'Software editing video standar industri untuk pemotongan presisi, pengorganisasian klip, dan penyusunan timeline utama.' },
    { name: 'Adobe After Effects', desc: 'Platform motion graphics dan efek visual terdepan untuk menciptakan animasi logo, komposisi 2D/3D, dan efek transisi.' },
    { name: 'DaVinci Resolve', desc: 'Perangkat profesional terbaik untuk koreksi warna (color correction), pewarnaan sinematik, dan pengerjaan audio Fairlight.' },
    { name: 'Adobe Audition', desc: 'Workstation audio digital khusus untuk restorasi suara, pembersihan de-noise vokal, serta pencampuran soundtrack.' },
    { name: 'CapCut Pro', desc: 'Solusi efisien untuk akselerasi produksi konten video pendek berformat vertikal yang dioptimalkan untuk tren sosial media.' },
    { name: 'Blender', desc: 'Software open-source 3D untuk pembuatan aset objek tiga dimensi, animasi intro, dan visualisasi produk kustom.' }
  ]
};

// ============================================================================
// 4. GRAPHIC DESAIN
// ============================================================================
export const serviceGraphicDesign: ServiceDetail = {
  slug: 'graphic-desain',
  title: 'Desain Grafis & Identitas Visual Brand',
  subtitle: 'Bangun persepsi positif dan profesionalisme bisnis Anda melalui ekosistem visual yang konsisten dan berkarakter. Kami menghadirkan identitas brand komprehensif, materi pemasaran digital, hingga aset cetak yang menonjolkan keunggulan bisnis Anda di tengah kompetisi.',
  
  benefitTitle: 'Benefit Utama',
  benefitSubtitle: 'Aset visual berestetika tinggi yang memperkuat pesan pemasaran dan meninggalkan kesan profesional bagi calon pelanggan Anda.',
  benefits: [
    { 
      title: 'Penguatan Brand Identity & Brand Guideline', 
      desc: 'Merancang logo yang ikonik, palet warna berkarakter, serta panduan tata letak lengkap yang siap menjaga konsistensi identitas perusahaan Anda di seluruh lini media.' 
    },
    { 
      title: 'Materi Pemasaran Media Sosial yang Konversif', 
      desc: 'Memproduksi konten mikroblog, carousel feed, banner promosi, dan story yang dikonsep khusus untuk memikat perhatian audiens dan meningkatkan tingkat engagement.' 
    },
    { 
      title: 'Aset Vektor Berskala Fleksibel', 
      desc: 'Seluruh ilustrasi dan elemen grafis dibuat dalam format vektor tajam yang dapat diperbesar hingga ukuran baliho/billboard tanpa pernah kehilangan kualitas kejernihannya.' 
    },
    { 
      title: 'Desain Komersial & Cetak Berstandar Produksi', 
      desc: 'Pembuatan brosur, katalog produk, kartu nama, hingga desain kemasan (packaging) yang dikalibrasi sesuai standar warna percetakan profesional (CMYK).' 
    },
    { 
      title: 'Konsep Visual Autentik Tanpa Template', 
      desc: 'Kami memastikan setiap karya dikerjakan dari nol (custom handcrafted) menyesuaikan pesan utama bisnis Anda, menghindarkan brand Anda dari kesan umum/pasaran.' 
    }
  ],

  techTitle: 'Tool & Tech Stack',
  techSubtitle: 'Menggunakan suite aplikasi grafis paling andal di dunia untuk memastikan presisi tinggi dalam penciptaan vektor, tipografi, dan komposisi layout.',
  tools: [
    { name: 'Adobe Illustrator', desc: 'Software grafik vektor utama untuk perancangan logo, ikon, tipografi kustom, serta ilustrasi berskala bebas loss.' },
    { name: 'Adobe Photoshop', desc: 'Perangkat lunak manipulasi foto profesional, compositing visual digital, retouching, dan pembuatan materi promosi.' },
    { name: 'Figma', desc: 'Platform modern untuk penyusunan layout feeds media sosial, sistem grid, dan kolaborasi pengerjaan aset grafis digital.' },
    { name: 'Adobe InDesign', desc: 'Software spesialis tata letak dokumen multi-halaman seperti e-book, katalog produk, company profile, dan laporan tahunan.' },
    { name: 'Canva Enterprise', desc: 'Penyusunan template kustom yang dapat diakses dan diedit dengan mudah oleh tim internal klien untuk kebutuhan harian.' }
  ]
};

// ============================================================================
// COMBINED MAP FOR ROUTER & DYNAMIC PAGES
// ============================================================================
export const servicesData: Record<string, ServiceDetail> = {
  'pengembangan-website': serviceWebsiteDevelopment,
  'ui-ux-desain': serviceUiUxDesign,
  'video-editing': serviceVideoEditing,
  'graphic-desain': serviceGraphicDesign,
};