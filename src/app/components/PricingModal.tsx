import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Crown, Package, Zap } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const whatsappNumber = '6289506609757';
  
  const handleOrderClick = (packageName: string) => {
    const message = encodeURIComponent(
      `Halo! Saya tertarik dengan ${packageName}. Bisa info lebih lanjut?`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full relative"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center pt-8 pb-6 px-6 border-b">
                  <h2
                    className="text-3xl md:text-4xl mb-2 text-[var(--color-secondary)]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Paket Harga Undangan Digital
                  </h2>
                  <p
                    className="text-[var(--color-secondary)]/70"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Pilih paket yang sesuai dengan kebutuhan Anda
                  </p>
                </div>

                {/* Pricing Cards */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* BASIC */}
                    <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[var(--color-primary)] transition-all">
                      <div className="flex items-center gap-2 mb-4">
                        <Package className="w-5 h-5 text-blue-500" />
                        <h3 className="text-xl font-bold text-[var(--color-secondary)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          PAKET BASIC
                        </h3>
                      </div>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-[var(--color-secondary)]">Rp 99.000</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Cocok untuk pasangan hemat
                      </p>

                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Opening Card animasi</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Hero Section + Countdown</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Detail Acara (Akad/Resepsi)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Galeri foto (maks. 8 foto)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Background music</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Responsive mobile & desktop</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Link undangan shareable</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Masa aktif 3 bulan</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Subdomain standar</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-red-500">
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Tanpa Admin Panel</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-red-500">
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Tanpa RSVP & Wishes</span>
                        </li>
                      </ul>

                      <button
                        onClick={() => handleOrderClick('Paket Basic')}
                        className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-[var(--color-secondary)] rounded-lg font-semibold transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Pesan Sekarang
                      </button>
                      <p className="text-xs text-center mt-3 text-gray-500">
                        Cocok untuk undangan simpel & elegan
                      </p>
                    </div>

                    {/* PREMIUM - RECOMMENDED */}
                    <div className="border-2 border-[var(--color-primary)] rounded-xl p-6 relative bg-gradient-to-br from-[#FFF5F5] to-white shadow-lg">
                      {/* Badge */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <div className="bg-[var(--color-primary)] text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          PALING LAKU
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4 mt-2">
                        <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
                        <h3 className="text-xl font-bold text-[var(--color-secondary)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          PAKET PREMIUM
                        </h3>
                      </div>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-[var(--color-primary)]">Rp 249.000</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        ⭐ Paket REKOMENDASI
                      </p>

                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="font-semibold">Semua fitur Paket Basic</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="font-semibold">Admin Panel (edit data sendiri)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="font-semibold">RSVP Form + export CSV</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Wishes & Doa dari tamu</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Love Story Timeline</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Galeri foto (maks. 20 foto)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Tema warna (custom)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Nama tamu personal (?to=Nama)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Masa aktif 6-12 bulan</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Subdomain premium</span>
                        </li>
                      </ul>

                      <button
                        onClick={() => handleOrderClick('Paket Premium')}
                        className="w-full py-3 bg-[var(--color-primary)] hover:bg-[#A8636B] text-white rounded-lg font-semibold transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Pesan Sekarang
                      </button>
                    </div>

                    {/* EXCLUSIVE */}
                    <div className="border-2 border-amber-400 rounded-xl p-6 bg-gradient-to-br from-amber-50 to-white">
                      <div className="flex items-center gap-2 mb-4">
                        <Crown className="w-5 h-5 text-amber-500" />
                        <h3 className="text-xl font-bold text-[var(--color-secondary)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          PAKET EXCLUSIVE
                        </h3>
                      </div>
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-amber-600">Rp 499K - 799K</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Untuk pasangan yang ingin all-in
                      </p>

                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="font-semibold">Semua fitur Paket Premium</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="font-semibold">Custom domain (namapasangan.com)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>QR Code RSVP / Check-in</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Statistik RSVP (dashboard)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Unlimited galeri</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Request desain khusus</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Prioritas support</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Masa aktif 12 bulan</span>
                        </li>
                      </ul>

                      <button
                        onClick={() => handleOrderClick('Paket Exclusive')}
                        className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg font-semibold transition-all"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Pesan Sekarang
                      </button>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <h3 className="text-xl font-bold text-[var(--color-secondary)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Add-On (Opsional)
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-1">Custom domain setup</p>
                        <p className="text-purple-600 font-bold">+ Rp 50.000</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-1">Tambah masa aktif 6 bulan</p>
                        <p className="text-purple-600 font-bold">+ Rp 50.000</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-1">Tambah galeri foto</p>
                        <p className="text-purple-600 font-bold">+ Rp 25.000</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-1">Request desain khusus</p>
                        <p className="text-purple-600 font-bold">+ Rp 100.000</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-1">Express delivery (1-2 hari)</p>
                        <p className="text-purple-600 font-bold">+ Rp 50.000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
