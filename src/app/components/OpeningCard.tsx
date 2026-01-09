import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useWeddingData } from '../../context/WeddingDataContext';
import confetti from 'canvas-confetti';

interface OpeningCardProps {
  onOpen: () => void;
}

export function OpeningCard({ onOpen }: OpeningCardProps) {
  const { data } = useWeddingData();
  const [isOpen, setIsOpen] = useState(false);
  const [isSealed, setIsSealed] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isSealed) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  const weddingDate = new Date(data.event.weddingDate);
  const formattedDate = `${weddingDate.getDate().toString().padStart(2, '0')} . ${(weddingDate.getMonth() + 1).toString().padStart(2, '0')} . ${weddingDate.getFullYear()}`;

  const handleOpen = () => {
    if (!isSealed) return;
    setIsSealed(false);

    // Confetti explosion
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
    
    // Sequence
    setTimeout(() => {
        setIsOpen(true);
        setTimeout(() => {
            onOpen();
        }, 1200);
    }, 1500); // Wait for open animation
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAE6E8] overflow-hidden perspective-[1000px]"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)", transition: { duration: 1.5, ease: "easeInOut" } }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
            
            <div ref={containerRef} className="relative w-[340px] h-[240px] md:w-[420px] md:h-[300px]" style={{ perspective: "1000px" }}>
                <motion.div
                    className="relative w-full h-full preserve-3d cursor-pointer group"
                    style={{ rotateX: isSealed ? rotateX : 0, rotateY: isSealed ? rotateY : 0 }}
                    initial={{ y: 50, opacity: 0, rotateX: 20 }}
                    animate={{ y: isSealed ? 0 : 300, opacity: 1 }}
                    exit={{ opacity: 0, y: 800, transition: { duration: 0.8 } }}
                    transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                    onClick={handleOpen}
                >
                    {/* Shadow */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/20 blur-xl rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-black/30" />

                    {/* Envelope Body (Back) */}
                    <div className="absolute inset-0 bg-[#f0e6d9] rounded-lg shadow-2xl border border-[#e6dccf]" />

                    {/* The Invitation Card */}
                    <motion.div
                        className="absolute inset-[10px] bg-white shadow-sm flex flex-col items-center justify-center p-6 text-center z-10"
                        initial={{ y: 0 }}
                        animate={!isSealed ? { y: -250, z: 50, scale: 1.1 } : { y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        {/* Card Content */}
                        <div className="border border-[var(--color-primary)]/20 w-full h-full p-4 flex flex-col items-center justify-center relative">
                             <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[var(--color-primary)]/40" />
                             <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[var(--color-primary)]/40" />
                             <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[var(--color-primary)]/40" />
                             <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[var(--color-primary)]/40" />

                            <p className="text-[var(--color-primary)] text-xs font-medium tracking-[0.2em] uppercase mb-4">The Wedding of</p>
                            <h2 className="text-2xl text-[var(--color-secondary)] mb-2 leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                                {data.couple.bride.name} <span className="text-[var(--color-primary)] mx-1">&</span> {data.couple.groom.name}
                            </h2>
                            <p className="text-xs text-gray-500 font-serif italic mt-2">{formattedDate}</p>
                        </div>
                    </motion.div>

                    {/* Envelope Flaps (Front Interface) */}
                    <div className="absolute inset-0 pointer-events-none z-20">
                        {/* Side Flaps */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[#f8f1e7]" 
                             style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)", background: "linear-gradient(90deg, #f8f1e7 0%, #ebe2d6 100%)" }} />
                        <div className="absolute top-0 right-0 w-full h-full bg-[#f8f1e7]"
                             style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)", background: "linear-gradient(-90deg, #f8f1e7 0%, #ebe2d6 100%)" }} />
                             
                        {/* Bottom Flap */}
                        <div className="absolute bottom-0 left-0 w-full h-full bg-[#fcf8f3]" 
                             style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)", background: "linear-gradient(0deg, #fcf8f3 0%, #f0e6d9 100%)", filter: "drop-shadow(0 -4px 6px rgba(0,0,0,0.05))" }} />
                    </div>

                    {/* Top Flap (Animated) */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full origin-top z-30"
                        style={{ perspective: "1000px" }}
                        animate={!isSealed ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                         <div className="w-full h-full bg-[#faefe3] border-b border-black/5" 
                              style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0)", backfaceVisibility: "hidden", background: "linear-gradient(180deg, #faefe3 0%, #efe5d9 100%)" }}>
                             
                             {/* Wax Seal */}
                            <motion.div 
                                className="absolute top-[35%] left-1/2 -translate-x-1/2 w-16 h-16 pointer-events-auto cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                animate={{ opacity: isSealed ? 1 : 0 }}
                            >
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#A04040] to-[#782828] shadow-lg flex items-center justify-center border-2 border-[#C05050]/30 relative z-50">
                                    <div className="absolute inset-1 rounded-full border border-[rgba(255,255,255,0.2)]" />
                                    <Heart className="w-6 h-6 text-[#E8C0C0] drop-shadow-md" fill="currentColor" />
                                </div>
                                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#8B5E66] uppercase bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm">Buka Undangan</p>
                                </div>
                            </motion.div>
                         </div>
                    </motion.div>
                    
                </motion.div>
            </div>
            
            <p className="absolute bottom-10 text-[var(--color-secondary)]/60 text-sm tracking-widest uppercase animate-pulse">
                Klik segel untuk membuka
            </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


