import { useState } from 'react';
import { useWeddingData } from '../../../context/WeddingDataContext';
import { useTranslation } from 'react-i18next';

export function ThemeEditor() {
  const { t } = useTranslation();
  const { data, updateData } = useWeddingData();
  const [theme, setTheme] = useState(data.theme);

  const handleChange = (field: string, value: string) => {
    const updated = { ...theme, [field]: value };
    setTheme(updated);
    updateData({ ...data, theme: updated });
  };

  const presetThemes = [
    {
      name: 'Rose Gold (Default)',
      colors: { primaryColor: 'var(--color-primary)', secondaryColor: 'var(--color-secondary)', accentColor: 'var(--color-accent)' }
    },
    {
      name: 'Lavender Dream',
      colors: { primaryColor: '#9B7EBD', secondaryColor: '#2D1B3D', accentColor: '#E8B4F1' }
    },
    {
      name: 'Ocean Blue',
      colors: { primaryColor: '#4A90A4', secondaryColor: '#1A3A52', accentColor: '#87CEEB' }
    },
    {
      name: 'Forest Green',
      colors: { primaryColor: '#6B8E23', secondaryColor: '#2F4F2F', accentColor: '#9ACD32' }
    },
    {
      name: 'Sunset Orange',
      colors: { primaryColor: '#FF6B6B', secondaryColor: '#4A1C1C', accentColor: '#FFD93D' }
    }
  ];

  const applyPreset = (colors: typeof theme) => {
    setTheme(colors);
    updateData({ ...data, theme: colors });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl text-[var(--color-secondary)] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          {t('admin.theme.title')}
        </h2>
        <p className="text-[#8B5E66] mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {t('admin.theme.subtitle')}
        </p>
      </div>

      {/* Color Pickers */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80 space-y-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
            {t('admin.theme.primary')}
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={theme.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="var(--color-primary)"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{t('admin.theme.hint_primary')}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
            {t('admin.theme.secondary')}
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={theme.secondaryColor}
              onChange={(e) => handleChange('secondaryColor', e.target.value)}
              className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={theme.secondaryColor}
              onChange={(e) => handleChange('secondaryColor', e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="var(--color-secondary)"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{t('admin.theme.hint_secondary')}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
            {t('admin.theme.accent')}
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={theme.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={theme.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="var(--color-accent)"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{t('admin.theme.hint_accent')}</p>
        </div>
      </div>

      {/* Preset Themes */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80">
        <h3 className="text-lg font-medium text-[var(--color-secondary)] mb-4">{t('admin.theme.presets')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presetThemes.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.colors)}
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-[var(--color-primary)] transition-colors text-left"
            >
              <div className="flex gap-1">
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: preset.colors.primaryColor }}
                />
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: preset.colors.secondaryColor }}
                />
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: preset.colors.accentColor }}
                />
              </div>
              <span className="font-medium text-sm">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80">
        <h3 className="text-lg font-medium text-[var(--color-secondary)] mb-4">{t('admin.theme.preview')}</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              className="w-full h-16 rounded-lg flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: theme.primaryColor }}
            >
              primaryColor
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-full h-16 rounded-lg flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: theme.secondaryColor }}
            >
              secondaryColor
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-full h-16 rounded-lg flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: theme.accentColor }}
            >
              accentColor
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800" dangerouslySetInnerHTML={{ __html: t('admin.theme.note') }} />
      </div>
    </div>
  );
}

