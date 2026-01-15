import { useState } from 'react';
import { useWeddingData } from '../../../context/WeddingDataContext';
import { Upload, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function CoupleEditor() {
  const { t } = useTranslation();
  const { data, updateData } = useWeddingData();
  const [couple, setCouple] = useState(data.couple);

  const handleChange = (person: 'bride' | 'groom', field: string, value: string) => {
    const updated = {
      ...couple,
      [person]: {
        ...couple[person],
        [field]: value
      }
    };
    setCouple(updated);
    updateData({ ...data, couple: updated });
  };

  const handleImageUpload = (person: 'bride' | 'groom', file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange(person, 'photo', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (person: 'bride' | 'groom') => {
    handleChange(person, 'photo', '');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2
          className="text-3xl text-[var(--color-secondary)] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t('admin.couple.title')}
        </h2>
        <p className="text-[#8B5E66] mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {t('admin.couple.subtitle')}
        </p>
      </div>

      {/* Bride Section */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80">
        <h3
          className="text-2xl text-[var(--color-primary)] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t('admin.couple.bride')}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
              {t('admin.couple.nickname')}
            </label>
            <input
              type="text"
              value={couple.bride.name}
              onChange={(e) => handleChange('bride', 'name', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Sarah"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
              {t('admin.couple.fullname')}
            </label>
            <input
              type="text"
              value={couple.bride.fullName}
              onChange={(e) => handleChange('bride', 'fullName', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Sarah Johnson"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
              {t('admin.couple.parents')}
            </label>
            <input
              type="text"
              value={couple.bride.parents || ''}
              onChange={(e) => handleChange('bride', 'parents', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Mr. & Mrs. Robert Johnson"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
              {t('admin.couple.photo')}
            </label>
            {couple.bride.photo ? (
              <div className="relative inline-block">
                <img
                  src={couple.bride.photo}
                  alt="Bride"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage('bride')}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-[var(--color-primary)]/30 rounded-lg cursor-pointer hover:border-[var(--color-primary)] transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload('bride', file);
                  }}
                />
                <Upload className="w-8 h-8 text-[var(--color-primary)]/50" />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Groom Section */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80">
        <h3
          className="text-2xl text-[var(--color-primary)] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t('admin.couple.groom')}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
              {t('admin.couple.nickname')}
            </label>
            <input
              type="text"
              value={couple.groom.name}
              onChange={(e) => handleChange('groom', 'name', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Daniel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
              {t('admin.couple.fullname')}
            </label>
            <input
              type="text"
              value={couple.groom.fullName}
              onChange={(e) => handleChange('groom', 'fullName', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Daniel Anderson"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
              {t('admin.couple.parents')}
            </label>
            <input
              type="text"
              value={couple.groom.parents || ''}
              onChange={(e) => handleChange('groom', 'parents', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Mr. & Mrs. Michael Anderson"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
              {t('admin.couple.photo')}
            </label>
            {couple.groom.photo ? (
              <div className="relative inline-block">
                <img
                  src={couple.groom.photo}
                  alt="Groom"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage('groom')}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-[var(--color-primary)]/30 rounded-lg cursor-pointer hover:border-[var(--color-primary)] transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload('groom', file);
                  }}
                />
                <Upload className="w-8 h-8 text-[var(--color-primary)]/50" />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

