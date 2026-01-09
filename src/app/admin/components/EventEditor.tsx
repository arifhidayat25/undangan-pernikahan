import { useState } from 'react';
import { useWeddingData } from '../../../context/WeddingDataContext';
import { RefreshCw } from 'lucide-react';

export function EventEditor() {
  const { data, updateData } = useWeddingData();
  const [event, setEvent] = useState(data.event);

  const formatIndonesianDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
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
          Detail Acara
        </h2>
        <p className="text-[#8B5E66] mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Edit informasi waktu dan lokasi acara pernikahan
        </p>
      </div>

      {/* Wedding Date */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80">
        <h3 className="text-xl text-[var(--color-primary)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Tanggal Pernikahan
        </h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Auto-sync:</strong> Tanggal Akad & Resepsi otomatis mengikuti tanggal ini. 
            Jika ingin tanggal berbeda, edit manual di bawah.
          </p>
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
          Akad Nikah
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Judul</label>
            <input
              type="text"
              value={event.ceremony.title}
              onChange={(e) => handleChange('ceremony', 'title', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Tanggal</label>
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
                title="Sync dari tanggal utama"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Klik tombol sync untuk auto-fill dari tanggal utama</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Waktu</label>
            <input
              type="text"
              value={event.ceremony.time}
              onChange={(e) => handleChange('ceremony', 'time', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Pukul 09:00 - 10:00 WIB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Tempat</label>
            <input
              type="text"
              value={event.ceremony.venue}
              onChange={(e) => handleChange('ceremony', 'venue', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Alamat</label>
            <input
              type="text"
              value={event.ceremony.address}
              onChange={(e) => handleChange('ceremony', 'address', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Google Calendar URL</label>
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
          Resepsi
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Judul</label>
            <input
              type="text"
              value={event.reception.title}
              onChange={(e) => handleChange('reception', 'title', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Tanggal</label>
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
                title="Sync dari tanggal utama"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Klik tombol sync untuk auto-fill dari tanggal utama</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Waktu</label>
            <input
              type="text"
              value={event.reception.time}
              onChange={(e) => handleChange('reception', 'time', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Pukul 11:00 - 14:00 WIB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Tempat</label>
            <input
              type="text"
              value={event.reception.venue}
              onChange={(e) => handleChange('reception', 'venue', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Alamat</label>
            <input
              type="text"
              value={event.reception.address}
              onChange={(e) => handleChange('reception', 'address', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Google Calendar URL</label>
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
          Google Maps
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Embed URL</label>
            <textarea
              value={event.mapEmbedUrl}
              onChange={(e) => handleChange('root', 'mapEmbedUrl', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              rows={3}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">Direction URL</label>
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

