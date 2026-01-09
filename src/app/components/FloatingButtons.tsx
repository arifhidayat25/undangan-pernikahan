import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowUp, Calendar, MapPin } from 'lucide-react';

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToRsvp = () => {
    const rsvpSection = document.getElementById('rsvp-section');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDetails = () => {
    const detailsSection = document.getElementById('details-section');
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
      {/* Quick Actions */}
      <motion.button
        onClick={scrollToDetails}
        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-[var(--color-primary)]/20 flex items-center justify-center group"
        whileHover={{ scale: 1.1, backgroundColor: 'var(--color-primary)' }}
        whileTap={{ scale: 0.9 }}
        title="Lihat Lokasi"
      >
        <MapPin className="w-5 h-5 text-[var(--color-primary)] group-hover:text-white transition-colors" />
      </motion.button>

      <motion.button
        onClick={scrollToRsvp}
        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-[var(--color-primary)]/20 flex items-center justify-center group"
        whileHover={{ scale: 1.1, backgroundColor: 'var(--color-primary)' }}
        whileTap={{ scale: 0.9 }}
        title="RSVP"
      >
        <Calendar className="w-5 h-5 text-[var(--color-primary)] group-hover:text-white transition-colors" />
      </motion.button>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-[var(--color-primary)] shadow-lg flex items-center justify-center border border-white/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, y: -2, backgroundColor: '#A8636B' }}
            whileTap={{ scale: 0.9 }}
            title="Kembali ke Atas"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}


