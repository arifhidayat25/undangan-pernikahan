import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, X } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function MusicPlayer({ isPlaying, onToggle }: MusicPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-40">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute bottom-full left-0 mb-2 px-4 py-2 bg-[#2C2C2C] text-white text-sm rounded-lg shadow-lg whitespace-nowrap"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Klik untuk memutar musik
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#2C2C2C]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        {/* Main Music Button */}
        <motion.button
          onClick={onToggle}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[#D4B896] shadow-lg flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
        >
          <Music className="w-6 h-6 text-white" />
          
          {/* Sound Waves Animation */}
          {isPlaying && (
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-white rounded-full"
                  animate={{
                    height: [8, 16, 8],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}
        </motion.button>

        {/* Volume Control (appears when playing) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.button
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-[var(--color-accent)]" />
              ) : (
                <Volume2 className="w-5 h-5 text-[var(--color-accent)]" />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

