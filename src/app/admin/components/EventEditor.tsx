import { useState } from 'react';
import { useWeddingData } from '../../../context/WeddingDataContext';
import { RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function EventEditor() {
  const { t } = useTranslation();
  const { data, updateData } = useWeddingData();
  const [event, setEvent] = useState(data.event);

  const formatIndonesianDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    // Use proper locale formatting based on selection? For now preserving original logic but could be improved.
    // Ideally this date format should also support English if the admin panel switches language.
    // But since the output "Minggu, 15 Juni 2026" is likely intended for the Indonesian invitation context, sticking to ID might be safer unless requested.
    // However, let's stick to the current implementation but maybe consider using toLocaleString if we want dynamic.
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dayName = days[date.getDay()];
    const month = months[date.getMonth()];
    
    return `${dayName}, ${day} ${month} ${year}`;
  };

  const syncDateFromMain = (section: 'ceremony' | 'reception') => {
    const formattedDate = formatIndonesianDate(event.weddingDate);
    handleChange(section, 'date', formattedDate);
  };

  const handleChange = (section: 'ceremony' | 'reception' | 'root', field: string, value: string) => {
    let updated;
    if (section === 'root') {
      updated = { ...event, [field]: value };
    } else {
      updated = {
        ...event,
        [section]: {
          ...event[section],
          [field]: value
        }
      };
    }
    setEvent(updated);
    updateData({ ...data, event: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl text-[var(--color-secondary)] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          {t('admin.event.title')}
        </h2>
        <p className="text-[#8B5E66] mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {t('admin.event.subtitle')}
        </p>
      </div>

      {/* Wedding Date */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80">
        <h3 className="text-xl text-[var(--color-primary)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          {t('admin.event.wedding_date')}
        </h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-800" dangerouslySetInnerHTML={{ __html: t('admin.event.auto_sync_info') }} />
        </div>
        <input
          type="datetime-local"
          value={event.weddingDate.slice(0, 16)}
          onChange={(e) => handleChange('root', 'weddingDate', e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>

      {/* Ceremony */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80">
        <h3 className="text-xl text-[var(--color-primary)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          {t('admin.event.ceremony')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_title')}</label>
            <input
              type="text"
              value={event.ceremony.title}
              onChange={(e) => handleChange('ceremony', 'title', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_date')}</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={event.ceremony.date}
                onChange={(e) => handleChange('ceremony', 'date', e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="Minggu, 15 Juni 2026"
              />
              <button
                onClick={() => syncDateFromMain('ceremony')}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                title={t('admin.event.sync_btn')}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">{t('admin.event.sync_hint')}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_time')}</label>
            <input
              type="text"
              value={event.ceremony.time}
              onChange={(e) => handleChange('ceremony', 'time', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Pukul 09:00 - 10:00 WIB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_venue')}</label>
            <input
              type="text"
              value={event.ceremony.venue}
              onChange={(e) => handleChange('ceremony', 'venue', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_address')}</label>
            <input
              type="text"
              value={event.ceremony.address}
              onChange={(e) => handleChange('ceremony', 'address', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_gcal')}</label>
            <input
              type="text"
              value={event.ceremony.googleCalendarUrl}
              onChange={(e) => handleChange('ceremony', 'googleCalendarUrl', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>
      </div>

      {/* Reception */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80">
        <h3 className="text-xl text-[var(--color-primary)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          {t('admin.event.reception')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_title')}</label>
            <input
              type="text"
              value={event.reception.title}
              onChange={(e) => handleChange('reception', 'title', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_date')}</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={event.reception.date}
                onChange={(e) => handleChange('reception', 'date', e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="Minggu, 15 Juni 2026"
              />
              <button
                onClick={() => syncDateFromMain('reception')}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                title={t('admin.event.sync_btn')}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">{t('admin.event.sync_hint')}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_time')}</label>
            <input
              type="text"
              value={event.reception.time}
              onChange={(e) => handleChange('reception', 'time', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Pukul 11:00 - 14:00 WIB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_venue')}</label>
            <input
              type="text"
              value={event.reception.venue}
              onChange={(e) => handleChange('reception', 'venue', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_address')}</label>
            <input
              type="text"
              value={event.reception.address}
              onChange={(e) => handleChange('reception', 'address', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.label_gcal')}</label>
            <input
              type="text"
              value={event.reception.googleCalendarUrl}
              onChange={(e) => handleChange('reception', 'googleCalendarUrl', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>
      </div>

      {/* Maps */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80">
        <h3 className="text-xl text-[var(--color-primary)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          {t('admin.event.maps_title')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.embed_url')}</label>
            <textarea
              value={event.mapEmbedUrl}
              onChange={(e) => handleChange('root', 'mapEmbedUrl', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              rows={3}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">{t('admin.event.direction_url')}</label>
            <input
              type="text"
              value={event.mapDirectionUrl}
              onChange={(e) => handleChange('root', 'mapDirectionUrl', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="https://maps.google.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

