import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useWeddingData } from '../../context/WeddingDataContext';

export function HeroSection() {
  const { data } = useWeddingData();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  
  const weddingDate = new Date(data.event.weddingDate);
  const formattedDate = `${weddingDate.getDate().toString().padStart(2, '0')} . ${(weddingDate.getMonth() + 1).toString().padStart(2, '0')} . ${weddingDate.getFullYear()}`; 

  const scrollToNext = () => {
    const nextSection = document.getElementById('intro-section');
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden" id="hero-section">
      {/* Animated Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${data.intro.heroBackgroundImage || 'https://images.unsplash.com/photo-1760669348218-20c45a264231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWN8ZW58MXx8fHwxNzY3NDE0NDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'}')`,
          }}
        />
        {/* Pink Tint Overlay - More refined */}
        <div className="absolute inset-0 bg-[var(--color-secondary)]/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAE6E8] via-[#FAE6E8]/20 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-4" 
        style={{ opacity, y: textY }}
      >
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.4,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {/* Couple Names */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
            }}
            className="mb-8 relative"
          >
             <h1
                className="text-6xl md:text-8xl lg:text-9xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {data.couple.bride.name} <span className="font-light mx-4 text-[#ffe4e1]">&</span> {data.couple.groom.name}
            </h1>
            <motion.p
                 className="absolute -top-12 left-1/2 -translate-x-1/2 text-3xl md:text-4xl text-white/90 drop-shadow-md whitespace-nowrap"
                 style={{ fontFamily: "'Great Vibes', cursive" }}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1, duration: 1 }}
            >
                The Wedding of
            </motion.p>
          </motion.div>

          {/* Wedding Date */}
          <motion.div
            className="space-y-4 pointer-events-none"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            <div className="flex items-center justify-center gap-6">
                <div className="h-[1px] w-12 bg-white/60 shadow-sm" />
                <p className="text-xl md:text-2xl tracking-[0.2em] uppercase text-white font-light drop-shadow-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Official Invitation
                </p>
                <div className="h-[1px] w-12 bg-white/60 shadow-sm" />
            </div>
            
            <p className="text-2xl md:text-3xl text-white drop-shadow-md" style={{ fontFamily: "'Playfair Display', serif" }}>
              {formattedDate}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={scrollToNext}
          whileHover={{ scale: 1.2 }}
        >
          <div className="p-4 rounded-full border border-[#F4C2C2]/30 bg-[#F4C2C2]/10 backdrop-blur-sm">
            <ChevronDown className="w-6 h-6 text-[#F4C2C2]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
