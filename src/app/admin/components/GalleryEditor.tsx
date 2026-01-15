import { useState } from 'react';
import { useWeddingData } from '../../../context/WeddingDataContext';
import { Plus, Trash2, Upload, X, GripVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function GalleryEditor() {
  const { t } = useTranslation();
  const { data, updateData } = useWeddingData();
  const [gallery, setGallery] = useState(data.gallery);

  const handleChange = (id: string, field: string, value: string) => {
    const updated = gallery.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setGallery(updated);
    updateData({ ...data, gallery: updated });
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange(id, 'url', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      url: '',
      caption: ''
    };
    const updated = [...gallery, newItem];
    setGallery(updated);
    updateData({ ...data, gallery: updated });
  };

  const removeItem = (id: string) => {
    const updated = gallery.filter(item => item.id !== id);
    setGallery(updated);
    updateData({ ...data, gallery: updated });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= gallery.length) return;

    const updated = [...gallery];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setGallery(updated);
    updateData({ ...data, gallery: updated });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-[var(--color-secondary)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('admin.gallery.title')}
          </h2>
          <p className="text-[#8B5E66]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {t('admin.gallery.subtitle')}
          </p>
        </div>
        <button
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[#A8636B] transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('admin.gallery.add_photo')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gallery.map((item, index) => (
          <div
            key={item.id}
            className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/80"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <GripVertical className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === gallery.length - 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <GripVertical className="w-4 h-4 rotate-180" />
                </button>
              </div>

              <div className="flex-1">
                {item.url ? (
                  <div className="relative">
                    <img
                      src={item.url}
                      alt={item.caption || 'Gallery image'}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleChange(item.id, 'url', '')}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[var(--color-primary)]/30 rounded-lg cursor-pointer hover:border-[var(--color-primary)] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(item.id, file);
                      }}
                    />
                    <Upload className="w-8 h-8 text-[var(--color-primary)]/50 mb-2" />
                    <span className="text-sm text-gray-500">{t('admin.gallery.upload_text')}</span>
                  </label>
                )}

                <div className="mt-3">
                  <input
                    type="text"
                    value={item.caption || ''}
                    onChange={(e) => handleChange(item.id, 'caption', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder={t('admin.gallery.caption_placeholder')}
                  />
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {gallery.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {t('admin.gallery.empty_state')}
        </div>
      )}
    </div>
  );
}

