import { useState } from 'react';
import { useWeddingData } from '../../../context/WeddingDataContext';
import { Upload, X, Link } from 'lucide-react';

export function IntroEditor() {
  const { data, updateData } = useWeddingData();
  const [intro, setIntro] = useState(data.intro);
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload');

  const handleChange = (field: string, value: string) => {
    const updated = { ...intro, [field]: value };
    setIntro(updated);
    updateData({ ...data, intro: updated });
  };

  const handleImageUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file terlalu besar! Maksimal 2MB.');
      return;
    }

    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.src = e.target?.result as string;
      img.onload = () => {
        if (img.width < 1280 || img.height < 720) {
          if (!confirm(`Ukuran gambar ${img.width}x${img.height}px. Disarankan minimal 1280x720px. Lanjutkan?`)) {
            return;
          }
        }
        handleChange('heroBackgroundImage', e.target?.result as string);
      };
    };
    
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    handleChange('heroBackgroundImage', '');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl text-[var(--color-secondary)] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Pesan Pembuka
        </h2>
        <p className="text-[#8B5E66] mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Edit teks pembuka undangan dan background hero section
        </p>
      </div>

      {/* Background Image Upload */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
            Background Hero Section
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Ukuran disarankan: 1920x1080px (landscape) | Maksimal: 2MB (untuk upload)
          </p>

          {/* Tab Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setUploadMethod('upload')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                uploadMethod === 'upload'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload File
            </button>
            <button
              onClick={() => setUploadMethod('url')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                uploadMethod === 'url'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Link className="w-4 h-4" />
              Pakai URL
            </button>
          </div>
          
          {intro.heroBackgroundImage && (
            <div className="relative mb-4">
              <img
                src={intro.heroBackgroundImage}
                alt="Hero Background"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                Preview
              </div>
            </div>
          )}

          {uploadMethod === 'upload' ? (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--color-primary)]/30 rounded-lg cursor-pointer hover:border-[var(--color-primary)] transition-colors bg-gray-50">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
              <Upload className="w-8 h-8 text-[var(--color-primary)]/50 mb-2" />
              <span className="text-sm text-gray-500">Klik untuk upload gambar</span>
              <span className="text-xs text-gray-400 mt-1">Max 2MB</span>
            </label>
          ) : (
            <div>
              <input
                type="url"
                value={intro.heroBackgroundImage || ''}
                onChange={(e) => handleChange('heroBackgroundImage', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Paste URL gambar dari Unsplash, Imgur, atau hosting lainnya
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80 space-y-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
            Subtitle
          </label>
          <input
            type="text"
            value={intro.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="We're getting married!"
          />
          <p className="text-xs text-gray-500 mt-1">Teks kecil di atas judul utama</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
            Title
          </label>
          <input
            type="text"
            value={intro.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Dengan Penuh Sukacita"
          />
          <p className="text-xs text-gray-500 mt-1">Judul utama section intro</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
            Message
          </label>
          <textarea
            value={intro.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            rows={5}
            placeholder="Kami dengan tulus mengundang Anda..."
          />
          <p className="text-xs text-gray-500 mt-1">Pesan undangan lengkap</p>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80">
        <h3 className="text-lg font-medium text-[var(--color-secondary)] mb-4">Preview</h3>
        <div className="text-center space-y-4">
          <p className="text-2xl text-[var(--color-primary)]" style={{ fontFamily: "'Great Vibes', cursive" }}>
            {intro.subtitle}
          </p>
          <h2 className="text-3xl text-[var(--color-secondary)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {intro.title}
          </h2>
          <p className="text-[#6B4B52]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {intro.message}
          </p>
        </div>
      </div>
    </div>
  );
}

