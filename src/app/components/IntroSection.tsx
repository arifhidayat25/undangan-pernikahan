import { motion } from 'motion/react';
import { useWeddingData } from '../../context/WeddingDataContext';

export function IntroSection() {
  const { data } = useWeddingData();
  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden" id="intro-section">
      {/* Subtle Background Ornament */}
      <div className="absolute top-10 right-0 w-64 h-64 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-blob" />
      <div className="absolute bottom-10 left-0 w-64 h-64 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-blob animation-delay-2000" />

      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-3xl md:text-4xl mb-6 text-[var(--color-primary)]"
          style={{ fontFamily: "'Great Vibes', cursive" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {data.intro.subtitle}
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl mb-8 text-[var(--color-secondary)]"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {data.intro.title}
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl leading-relaxed text-[var(--color-secondary)] mb-10 font-light"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {data.intro.message}
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          className="w-24 h-[1px] bg-[var(--color-primary)]/50 mx-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />
      </motion.div>
    </section>
  );
}


