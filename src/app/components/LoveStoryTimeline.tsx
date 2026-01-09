import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Sparkles, Users, Gem } from 'lucide-react';

const timeline = [
  {
    icon: Users,
    year: '2020',
    title: 'Pertemuan Pertama',
    description: 'Takdir mempertemukan kami di sebuah kafe kecil di Jakarta. Senyum pertamanya membuat jantung berdebar.',
    color: 'bg-white/40',
  },
  {
    icon: Heart,
    year: '2021',
    title: 'Jatuh Cinta',
    description: 'Setiap hari terasa lebih indah. Kami menyadari bahwa ini bukan sekadar kebersamaan, tapi cinta sejati.',
    color: 'bg-white/40',
  },
  {
    icon: Sparkles,
    year: '2023',
    title: 'Momen Spesial',
    description: 'Liburan ke Bali membawa kenangan yang tak terlupakan. Di bawah matahari terbenam, kami saling berjanji.',
    color: 'bg-white/40',
  },
  {
    icon: Gem,
    year: '2025',
    title: 'Lamaran',
    description: 'Di tengah taman yang penuh bunga, dia berlutut dan bertanya. Tentu saja jawabannya adalah "YA!"',
    color: 'bg-white/40',
  },
];

export function LoveStoryTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart className="w-4 h-4 text-[var(--color-primary)]" fill="var(--color-primary)" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-2xl mb-2 text-[var(--color-primary)]"
             style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Our Journey
          </p>
          <h2
            className="text-4xl md:text-5xl text-[var(--color-secondary)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kisah Cinta Kami
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[var(--color-primary)]/20">
             <motion.div 
               style={{ scaleY, originY: 0 }}
               className="w-full h-full bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)]"
             />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {/* Content Card */}
                  <motion.div
                    className="flex-1 w-full md:w-auto"
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div
                      className={`${item.color} backdrop-blur-md p-6 md:p-8 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(183,110,121,0.15)] transition-shadow duration-300`}
                    >
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center border border-[var(--color-primary)]/30">
                            <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                          </div>
                          <span
                            className="text-4xl opacity-20 text-[var(--color-secondary)] absolute right-4 top-4 font-bold"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {item.year}
                          </span>
                        </div>

                        <h3
                          className="text-2xl md:text-3xl mb-3 text-[var(--color-secondary)]"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {item.title}
                        </h3>

                        <p
                          className="text-[var(--color-secondary)] leading-relaxed"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Icon (Desktop) */}
                  <motion.div
                    className="hidden md:flex w-14 h-14 rounded-full bg-[#fdfbf7] border-4 border-[var(--color-primary)]/20 shadow-lg items-center justify-center flex-shrink-0 relative z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </motion.div>

                  {/* Spacer for layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Final Message */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="inline-block px-8 py-4 bg-white/60 backdrop-blur-sm rounded-full shadow-lg border border-white/80">
            <p
              className="text-[var(--color-primary)] text-lg md:text-xl flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <Heart className="w-5 h-5 fill-current" />
              Dan sekarang, kami siap memulai babak baru bersama...
              <Heart className="w-5 h-5 fill-current" />
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

