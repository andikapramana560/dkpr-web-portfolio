// Project data; preview markup is rendered inside each card's thumbnail.
const projects = [
  {
    id: "perdiknas",
    name: "Perdiknas Web App",
    type: "APLIKASI WEB",
    summary: "Portal yayasan dan administrasi unit kerja.",
    status: "Perancangan",
    detail:
      "Saya merancang portal yang memperkenalkan sejarah, visi misi, dan unit kerja Perdiknas. Area internal dirancang untuk membantu staf mengelola data pegawai, surat, dan arsip.",
    tech: "Desain antarmuka · Alur administrasi",
  },
  {
    id: "hr-mobile",
    name: "Aplikasi HRD",
    type: "APLIKASI MOBILE",
    summary: "Pengelolaan data karyawan dari ponsel.",
    status: "Proyek pengembangan",
    detail:
      "Aplikasi ini menyatukan proses tambah, cari, ubah, dan hapus data karyawan. Fokus pengembangannya mencakup validasi email, pencegahan data ganda, dan sinkronisasi daftar setelah perubahan.",
    tech: "Flutter · Provider · JSON Server",
  },
  {
    id: "ecommerce",
    name: "E-commerce Web App",
    type: "PENGEMBANGAN WEB",
    summary: "Perancangan katalog hingga alur checkout.",
    status: "Perancangan teknis",
    detail:
      "Saya menyusun struktur aplikasi toko online, skema basis data, dan alur checkout. Tantangannya adalah menjaga hubungan antara produk, isi keranjang, dan pesanan tetap jelas selama transaksi.",
    tech: "Next.js · Prisma · Desain basis data",
  },
];
const people = ["Data karyawan", "Daftar pegawai", "Unit kerja", "Informasi kontak"]
  .map((s) => '<div class="person">' + s + "</div>")
  .join("");
// Chart bar heights (%) for the Perdiknas dashboard preview.
const barHeights = [22, 34, 29, 41, 36, 50, 56, 48, 62, 70, 66, 82];
const bars = barHeights.map((h) => `<i style="height:${h}%"></i>`).join("");

const previews = [
  // Perdiknas dashboard
  `<div class="mock">
    <header><b>◈ &nbsp; Perdiknas</b></header>
    <div class="dash">
      <div class="side">Dashboard<br>Unit kerja<br>Pegawai<br>Surat<br>Arsip</div>
      <div>
        <b>Dashboard Yayasan</b>
        <div class="metrics"><i>Unit kerja</i><i>Pegawai</i><i>Arsip</i></div>
        <small>Statistik tahunan</small>
        <div class="bars">${bars}</div>
      </div>
    </div>
  </div>`,
  // HR mobile app
  `<div class="phones">
    <div class="phone"><small>09.41</small><b>Ruang HRD</b>${people}</div>
    <div class="phone"><small>09.41</small><b>Data pegawai</b>${people}</div>
  </div>`,
  // E-commerce store
  `<div class="mock shop">
    <header><b>STORE / KATALOG</b></header>
    <strong>Koleksi terbaru.</strong>
    <div class="tiles"><i>◒</i><i>◈</i><i>◓</i></div>
    <p>Pilihan produk</p>
  </div>`,
];
const copy = {
  stage: "Tahap",
  illustration: "Visual proyek merupakan ilustrasi antarmuka.",
  sending: "Mengirim pesan…",
  sent: "Pesan Anda sudah tersimpan. Terima kasih sudah menghubungi saya.",
  error: "Pesan belum terkirim. Periksa koneksi dan coba lagi.",
};
