import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function BackgroundEffect() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const springConfig = { damping: 15, stiffness: 50 };
  const y1Spring = useSpring(y1, springConfig);
  const y2Spring = useSpring(y2, springConfig);

  // Generate random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Soft Gradient Orbs */}
      <motion.div 
        style={{ y: y1Spring, x: -50 }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-200/20 rounded-full blur-[100px] mix-blend-multiply filter"
      />
      <motion.div 
        style={{ y: y2Spring, x: 50 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-orange-100/20 rounded-full blur-[100px] mix-blend-multiply filter"
      />
      
      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Noise Texture Overlay for grain effect (Optional, adds premium feel) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </div>
  );
}

