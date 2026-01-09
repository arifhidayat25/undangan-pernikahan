import { motion, AnimatePresence } from 'motion/react';
import { Heart, MapPin, CalendarHeart, WineOff, Navigation, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useWeddingData } from '../../context/WeddingDataContext';

export function DetailsSection() {
  const { data } = useWeddingData();
  const [isMapInteractive, setIsMapInteractive] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);

  // Helper function to format date in Indonesian
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

  // Auto-sync dates: use custom if different from default, otherwise use main wedding date
  const ceremonyDate = data.event.ceremony.date === 'Minggu, 15 Juni 2026' 
    ? formatIndonesianDate(data.event.weddingDate)
    : data.event.ceremony.date;
    
  const receptionDate = data.event.reception.date === 'Minggu, 15 Juni 2026'
    ? formatIndonesianDate(data.event.weddingDate)
    : data.event.reception.date;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(data.event.ceremony.address + " " + data.event.reception.address);
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden" id="details-section">
       {/* Background Elements */}
       <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#EBCBCF] rounded-full mix-blend-multiply filter blur-[120px] opacity-20" />
       <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-[120px] opacity-20" />

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
         <motion.div className="text-center mb-16" variants={itemVariants}>
            <p className="text-2xl text-[var(--color-primary)] mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Save the Date
            </p>
            <h2
              className="text-4xl md:text-5xl text-[var(--color-secondary)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Waktu & Lokasi
            </h2>
         </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Ceremony */}
          <motion.div
            className="bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-sm border border-white/60 hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 rounded-full border border-[var(--color-primary)]/20 flex items-center justify-center relative group">
                <div className="absolute inset-0 rounded-full border border-[var(--color-accent)]/10 scale-125 transition-transform duration-700 group-hover:scale-110" />
                <Heart className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
            </div>

            <h3
              className="text-3xl text-center mb-6 text-[var(--color-secondary)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {data.event.ceremony.title}
            </h3>

            <div className="space-y-6 mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#FAF8F5] rounded-full">
                     <CalendarHeart className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-[var(--color-secondary)] font-medium text-lg">{ceremonyDate}</p>
                  <p className="text-[var(--color-secondary)]">{data.event.ceremony.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="p-2 bg-[#FAF8F5] rounded-full">
                    <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                 </div>
                <div>
                  <p className="text-[var(--color-secondary)] font-medium text-lg">{data.event.ceremony.venue}</p>
                  <p className="text-sm text-[var(--color-secondary)]">{data.event.ceremony.address}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <motion.a
                href={data.event.ceremony.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 bg-[var(--color-primary)] text-white text-center rounded-full transition-all shadow-md hover:bg-[#A8636B]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Tambah ke Kalender
              </motion.a>
            </div>
          </motion.div>

          {/* Reception */}
          <motion.div
            className="bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-sm border border-white/60 hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
          >
             <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 rounded-full border border-[var(--color-primary)]/20 flex items-center justify-center relative group">
                <div className="absolute inset-0 rounded-full border border-[var(--color-accent)]/10 scale-125 transition-transform duration-700 group-hover:scale-110" />
                <WineOff className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
            </div>

            <h3
              className="text-3xl text-center mb-6 text-[var(--color-secondary)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {data.event.reception.title}
            </h3>

            <div className="space-y-6 mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <div className="flex items-start gap-4">
                 <div className="p-2 bg-[#FAF8F5] rounded-full">
                    <CalendarHeart className="w-5 h-5 text-[var(--color-primary)]" />
                 </div>
                <div>
                  <p className="text-[var(--color-secondary)] font-medium text-lg">{receptionDate}</p>
                  <p className="text-[var(--color-secondary)]">{data.event.reception.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="p-2 bg-[#FAF8F5] rounded-full">
                    <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                 </div>
                <div>
                  <p className="text-[var(--color-secondary)] font-medium text-lg">{data.event.reception.venue}</p>
                  <p className="text-sm text-[var(--color-secondary)]">{data.event.reception.address}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <motion.a
                href={data.event.reception.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 bg-[var(--color-primary)] text-white text-center rounded-full transition-all shadow-md hover:bg-[#A8636B]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Tambah ke Kalender
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Google Maps Embed with 3D Tilt and Overlay */}
        <motion.div
            variants={itemVariants}
            className="relative group perspective-1000"
            onHoverStart={() => !isMapInteractive && setIsMapInteractive(false)}
        >
            <motion.div
                 className="bg-white/40 backdrop-blur-md p-4 rounded-[2rem] border border-white/60 shadow-lg relative overflow-hidden"
                 whileHover={!isMapInteractive ? { 
                    rotateX: 2, 
                    rotateY: 2, 
                    scale: 1.01,
                    boxShadow: "0 25px 50px -12px rgba(183, 110, 121, 0.25)" 
                 } : {}}
                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-[var(--color-primary)]/20 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                    <span className="text-[var(--color-secondary)] font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Lokasi Acara
                    </span>
                </div>

                <div className="w-full h-[450px] rounded-[1.5rem] overflow-hidden relative">
                    <iframe
                        src={data.event.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ 
                            border: 0, 
                            filter: 'sepia(20%) hue-rotate(320deg) contrast(90%) opacity(0.9)',
                            pointerEvents: isMapInteractive ? 'auto' : 'none'
                        }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    
                    {/* Thematic Overlay */}
                    <div className="absolute inset-0 bg-[var(--color-secondary)]/10 pointer-events-none mix-blend-overlay" />

                    {/* Interactive Cover */}
                    <AnimatePresence>
                        {!isMapInteractive && (
                            <motion.div 
                                className="absolute inset-0 bg-white/10 backdrop-blur-[2px] z-20 flex items-center justify-center cursor-pointer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMapInteractive(true)}
                            >
                                <motion.button
                                    className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-full shadow-2xl font-medium tracking-wide border border-white/20"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                                >
                                    Klik untuk Eksplorasi Peta
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Actions Bar */}
                <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 pb-2">
                     <motion.a
                        href={data.event.mapDirectionUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[var(--color-primary)] text-white rounded-full shadow-lg hover:bg-[#A8636B] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Buka Google Maps</span>
                      </motion.a>

                      <motion.button
                        onClick={handleCopyAddress}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-[var(--color-primary)] border border-[var(--color-primary)] rounded-full shadow-sm hover:bg-[#FFF5F5] transition-colors relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                         <AnimatePresence mode="wait">
                            {showCopyToast ? (
                                <motion.div
                                    key="copied"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Alamat Disalin!</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="copy"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <Copy className="w-4 h-4" />
                                    <span>Salin Alamat</span>
                                </motion.div>
                            )}
                         </AnimatePresence>
                      </motion.button>
                </div>
            </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

