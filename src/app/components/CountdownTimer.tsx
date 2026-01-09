import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useWeddingData } from '../../context/WeddingDataContext';

export function CountdownTimer() {
  const { data } = useWeddingData();
  const weddingDate = new Date(data.event.weddingDate).getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Hari' },
    { value: timeLeft.hours, label: 'Jam' },
    { value: timeLeft.minutes, label: 'Menit' },
    { value: timeLeft.seconds, label: 'Detik' },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-[#FAF8F5] to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[var(--color-accent)] rounded-full" />
        <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-[var(--color-accent)] rounded-full" />
      </div>

      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-sm tracking-[0.3em] uppercase mb-4 text-[#8B7355]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Hitung Mundur Menuju
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl mb-4 text-[#2C2C2C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Hari Bahagia Kami
        </motion.h2>

        <motion.div
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent mx-auto mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1, type: 'spring', stiffness: 200 }}
            >
              {/* Card */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-[#E8E1D8] relative overflow-hidden group"
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(201, 168, 124, 0.2)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Number */}
                <motion.div
                  className="text-5xl md:text-6xl text-[var(--color-accent)] mb-2 relative z-10"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  key={unit.value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.div>

                {/* Label */}
                <p
                  className="text-sm md:text-base text-[#6B6B6B] uppercase tracking-widest relative z-10"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {unit.label}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[var(--color-accent)]/20 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[var(--color-accent)]/20 rounded-bl-lg" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Message */}
        <motion.p
          className="mt-12 text-lg text-[#6B6B6B]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          Kami tidak sabar untuk berbagi kebahagiaan ini bersama Anda! 💕
        </motion.p>
      </motion.div>
    </section>
  );
}


