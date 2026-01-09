# 💒 Undangan Pernikahan Modern

Website undangan pernikahan yang elegan dan interaktif dengan fitur admin panel untuk kustomisasi konten secara real-time. Dibangun dengan React, TypeScript, dan Tailwind CSS.

![Wedding Invitation](https://img.shields.io/badge/Wedding-Invitation-pink?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Fitur Utama

### 🎨 Website Undangan
- **Opening Card 3D** - Animasi envelope reveal yang menarik
- **Hero Section** - Background image dinamis dengan glassmorphism effect
- **Countdown Timer** - Hitung mundur otomatis ke hari pernikahan
- **Love Story Timeline** - Timeline perjalanan cinta dengan animasi
- **Gallery Masonry** - Galeri foto responsif dengan lightbox
- **RSVP Form** - Formulir konfirmasi kehadiran dengan penyimpanan data
- **Wishes Section** - Ucapan dan doa dari tamu
- **Floating Buttons** - Navigasi cepat ke section penting
- **Background Particles** - Efek partikel mengambang dengan parallax
- **Music Player** - Background music dengan kontrol play/pause

### 🎛️ Admin Panel
- **Data Pasangan** - Edit nama, foto, dan informasi orang tua
- **Detail Acara** - Kelola tanggal, waktu, lokasi acara
- **Pesan Pembuka** - Kustomisasi pesan sambutan
- **Love Story** - Tambah/edit timeline perjalanan cinta
- **Galeri Foto** - Upload dan kelola foto (drag & drop)
- **Tema Warna** - Ubah warna tema website secara real-time
- **Data RSVP** - Lihat dan export data konfirmasi kehadiran ke CSV
- **Import/Export** - Backup dan restore data dalam format JSON

### 📊 RSVP Management
- **Data Persistence** - Penyimpanan otomatis ke localStorage
- **Statistics Dashboard** - Total respon, hadir, tidak hadir, total tamu
- **CSV Export** - Download data RSVP dalam format Excel-friendly
- **Responsive Table** - Tabel data dengan filter dan sorting

### 🎯 Konten Dinamis
- **Dynamic Title** - Title browser mengikuti nama pasangan
- **Dynamic Deadline** - Deadline RSVP otomatis 7 hari sebelum acara
- **Dynamic Footer** - Hashtag dan copyright otomatis ter-generate
- **Real-time Preview** - Perubahan di admin langsung terlihat

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm atau pnpm

### Installation

1. **Clone repository**
```bash
git clone https://github.com/arifhidayat25/undangan-pernikahan-modern.git
cd undangan-pernikahan-modern
```

2. **Install dependencies**
```bash
npm install
# atau
pnpm install
```

3. **Run development server**
```bash
npm run dev
# atau
pnpm dev
```

4. **Open browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
# atau
pnpm build
```

Output akan ada di folder `dist/`

## 📁 Struktur Folder

```
src/
├── app/
│   ├── components/          # Komponen website utama
│   │   ├── HeroSection.tsx
│   │   ├── CountdownTimer.tsx
│   │   ├── RsvpSection.tsx
│   │   ├── FooterSection.tsx
│   │   └── ...
│   ├── admin/              # Admin panel
│   │   ├── components/     # Komponen admin
│   │   ├── AdminLayout.tsx
│   │   └── AdminPage.tsx
│   ├── App.tsx
│   └── MainSite.tsx
├── context/                # React Context
│   ├── WeddingDataContext.tsx
│   └── ThemeProvider.tsx
├── data/                   # Data default
│   └── weddingData.ts
├── utils/                  # Utility functions
│   └── rsvpStorage.ts
└── main.tsx
```

## 🎨 Kustomisasi

### Mengubah Data Pernikahan

1. **Via Admin Panel** (Recommended)
   - Buka `http://localhost:5173/admin`
   - Login dengan password: `password`
   - Edit data sesuai kebutuhan
   - Klik "Save" untuk menyimpan

2. **Via Code**
   - Edit file `src/data/weddingData.ts`
   - Ubah data default sesuai kebutuhan

### Mengubah Tema Warna

**Via Admin Panel:**
1. Login ke admin panel
2. Pilih menu "Tema Warna"
3. Pilih warna menggunakan color picker
4. Klik "Save"

**Via Code:**
Edit `src/data/weddingData.ts`:
```typescript
theme: {
  primaryColor: "#B76E79",    // Rose Gold
  secondaryColor: "#4A2C32",  // Dark Brown
  accentColor: "#D4AF37"      // Gold
}
```

### Upload Foto

**Via Admin Panel:**
1. Login ke admin panel
2. Pilih menu "Galeri Foto"
3. Drag & drop foto atau klik "Choose Files"
4. Foto akan otomatis di-convert ke base64

**Supported formats:** JPG, PNG, WebP

## 📱 Admin Panel

### Login
- **URL:** `http://localhost:5173/admin`
- **Password:** `password` (ubah di `src/app/admin/AdminLogin.tsx`)

### Menu Admin

| Menu | Fungsi |
|------|--------|
| Data Pasangan | Edit nama, foto, info orang tua |
| Detail Acara | Tanggal, waktu, lokasi, maps |
| Pesan Pembuka | Subtitle, title, pesan sambutan |
| Love Story | Timeline perjalanan cinta |
| Galeri Foto | Upload dan kelola foto |
| Tema Warna | Ubah warna tema website |
| Data RSVP | Lihat dan export data RSVP |

### Export/Import Data

**Export:**
1. Klik tombol "Export" di header admin
2. File JSON akan otomatis terdownload

**Import:**
1. Klik tombol "Import" di header admin
2. Pilih file JSON yang sudah di-export sebelumnya
3. Data akan otomatis ter-restore

## 📊 RSVP Features

### Melihat Data RSVP
1. Login ke admin panel
2. Klik menu "Data RSVP"
3. Lihat statistik dan tabel data

### Export ke CSV
1. Di halaman Data RSVP
2. Klik tombol "Export CSV"
3. File akan terdownload dengan format:
   - No | Nama | Jumlah Tamu | Kehadiran | Pesan | Waktu Submit

### Clear Data
1. Klik tombol "Hapus Semua"
2. Konfirmasi penghapusan
3. Semua data RSVP akan terhapus

## 🛠️ Tech Stack

- **Framework:** React 18.3.1
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1
- **Animation:** Motion (Framer Motion)
- **Routing:** React Router DOM 7.12
- **Icons:** Lucide React
- **Build Tool:** Vite 6.3
- **UI Components:** Radix UI

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

MIT License - feel free to use this project for your wedding! 💕

## 👨‍💻 Developer

**Achmad Arif Hidayat**
- GitHub: [@arifhidayat25](https://github.com/arifhidayat25)

## 🙏 Credits

Original design from [Figma Community](https://www.figma.com/design/PhMPwj8u8TtdrNtkXx2Zpd/Undangan-Pernikahan-Modern)

## 💡 Tips

1. **Backup Data:** Selalu export data sebelum melakukan perubahan besar
2. **Test RSVP:** Test form RSVP sebelum share ke tamu
3. **Optimize Images:** Compress foto sebelum upload untuk performa lebih baik
4. **Mobile First:** Selalu test di mobile device
5. **Browser Test:** Test di berbagai browser sebelum deploy

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Deploy otomatis

### Netlify
1. Push code ke GitHub
2. Import project di [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat [GitHub Issue](https://github.com/arifhidayat25/undangan-pernikahan-modern/issues)

---

**Made with ❤️ by [Achmad Arif Hidayat](https://github.com/arifhidayat25)**