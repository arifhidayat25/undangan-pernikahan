import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Download, Trash2, Users, UserCheck, UserX, Calendar } from 'lucide-react';
import { getAllRsvps, getRsvpStats, exportRsvpToCsv, clearAllRsvps, RsvpEntry } from '../../../utils/rsvpStorage';

export function RsvpManager() {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);
  const [stats, setStats] = useState({ total: 0, attending: 0, notAttending: 0, totalGuests: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRsvps(getAllRsvps());
    setStats(getRsvpStats());
  };

  const handleExport = () => {
    exportRsvpToCsv();
  };

  const handleClear = () => {
    clearAllRsvps();
    loadData();
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2
            className="text-3xl text-[var(--color-secondary)] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Data RSVP
          </h2>
          <p
            className="text-[var(--color-secondary)]/70"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Kelola dan ekspor data konfirmasi kehadiran tamu
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            disabled={rsvps.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[#A8636B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={handleClear}
            disabled={rsvps.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <Trash2 className="w-4 h-4" />
            Hapus Semua
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className="bg-white/60 backdrop-blur-md p-6 rounded-xl border border-white/60 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-secondary)]/70" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Total Respon
              </p>
              <p className="text-2xl font-bold text-[var(--color-secondary)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stats.total}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/60 backdrop-blur-md p-6 rounded-xl border border-white/60 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-secondary)]/70" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Hadir
              </p>
              <p className="text-2xl font-bold text-[var(--color-secondary)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stats.attending}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/60 backdrop-blur-md p-6 rounded-xl border border-white/60 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-secondary)]/70" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Tidak Hadir
              </p>
              <p className="text-2xl font-bold text-[var(--color-secondary)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stats.notAttending}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/60 backdrop-blur-md p-6 rounded-xl border border-white/60 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-secondary)]/70" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Total Tamu
              </p>
              <p className="text-2xl font-bold text-[var(--color-secondary)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stats.totalGuests}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RSVP Table */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl border border-white/60 shadow-sm overflow-hidden">
        {rsvps.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-[var(--color-secondary)]/30 mx-auto mb-4" />
            <p
              className="text-lg text-[var(--color-secondary)]/70"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Belum ada data RSVP
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-primary)]/10">
                <tr>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-secondary)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    No
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-secondary)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Nama
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-secondary)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Jumlah Tamu
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-secondary)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Kehadiran
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-secondary)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Pesan
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-secondary)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Waktu Submit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-primary)]/10">
                {rsvps.map((rsvp, index) => (
                  <motion.tr
                    key={rsvp.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-[var(--color-primary)]/5 transition-colors"
                  >
                    <td
                      className="px-6 py-4 text-sm text-[var(--color-secondary)]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium text-[var(--color-secondary)]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {rsvp.name}
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-[var(--color-secondary)]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {rsvp.guests}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          rsvp.attendance === 'hadir'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {rsvp.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-[var(--color-secondary)] max-w-xs truncate"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      title={rsvp.message}
                    >
                      {rsvp.message || '-'}
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-[var(--color-secondary)]/70"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {formatDate(rsvp.timestamp)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
