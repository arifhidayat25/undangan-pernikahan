# Cara Menggunakan Tema Warna Dinamis

## CSS Variables yang Tersedia

Setelah implementasi ini, Anda bisa menggunakan CSS variables berikut di seluruh aplikasi:

```css
var(--color-primary)      /* Warna utama (default: #B76E79) */
var(--color-secondary)    /* Warna sekunder (default: #4A2C32) */
var(--color-accent)       /* Warna aksen (default: #D4AF37) */
```

Untuk warna dengan opacity, gunakan RGB values:

```css
rgba(var(--color-primary-rgb), 0.5)    /* Primary dengan 50% opacity */
rgba(var(--color-secondary-rgb), 0.3)  /* Secondary dengan 30% opacity */
rgba(var(--color-accent-rgb), 0.1)     /* Accent dengan 10% opacity */
```

## Contoh Penggunaan di Komponen

### 1. Inline Style (React)
```tsx
<div style={{ backgroundColor: 'var(--color-primary)' }}>
  Content
</div>

<div style={{ color: 'var(--color-secondary)' }}>
  Text
</div>
```

### 2. Tailwind CSS (Custom Class)
Buat class di CSS file:
```css
.bg-theme-primary {
  background-color: var(--color-primary);
}

.text-theme-secondary {
  color: var(--color-secondary);
}

.border-theme-accent {
  border-color: var(--color-accent);
}
```

### 3. Tailwind Arbitrary Values
```tsx
<div className="bg-[var(--color-primary)]">
  Content
</div>

<button className="text-[var(--color-secondary)] hover:bg-[var(--color-primary)]">
  Button
</button>
```

## Mengganti Hardcoded Colors

### Sebelum (Hardcoded):
```tsx
<div className="bg-[#B76E79] text-[#4A2C32]">
  Content
</div>
```

### Sesudah (Dynamic):
```tsx
<div className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
  Content
</div>
```

## Cara Kerja

1. User mengubah warna di Admin Panel (`/admin` → Tema Warna)
2. Klik tombol "Save"
3. `ThemeProvider` otomatis inject CSS variables ke `document.documentElement`
4. Semua komponen yang menggunakan CSS variables akan langsung berubah warnanya
5. Warna tersimpan di localStorage, jadi tetap ada setelah refresh

## Update Komponen yang Perlu Diubah

Komponen-komponen berikut masih menggunakan hardcoded colors dan perlu diupdate:

- [ ] `HeroSection.tsx` - ganti `#B76E79`, `#4A2C32`, dll
- [ ] `OpeningCard.tsx` - ganti warna hardcoded
- [ ] `DetailsSection.tsx` - ganti warna hardcoded
- [ ] `LoveStoryTimeline.tsx` - ganti warna hardcoded
- [ ] `GallerySection.tsx` - ganti warna hardcoded
- [ ] `CountdownTimer.tsx` - ganti `#C9A87C` dengan accent color
- [ ] `IntroSection.tsx` - ganti warna hardcoded
- [ ] `RsvpSection.tsx` - ganti warna hardcoded
- [ ] `WishesSection.tsx` - ganti warna hardcoded
- [ ] `FooterSection.tsx` - ganti warna hardcoded
- [ ] `FloatingButtons.tsx` - ganti warna hardcoded
- [ ] `MusicPlayer.tsx` - ganti warna hardcoded
- [ ] `BackgroundEffect.tsx` - ganti warna hardcoded

## Testing

1. Buka `/admin`
2. Login dengan password: `password`
3. Klik "Tema Warna" di sidebar
4. Ubah warna (gunakan color picker atau preset)
5. Klik "Save"
6. Klik "Preview" untuk lihat website utama
7. Warna seharusnya berubah otomatis!
