import { motion } from 'motion/react';
import { useState } from 'react';
import { Heart, Send, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
}

export function WishesSection() {
  const { t, i18n } = useTranslation();
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      name: 'Rina & Andi',
      message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu! 💕',
      timestamp: new Date('2026-01-02'),
    },
    {
      id: 2,
      name: 'Keluarga Wijaya',
      message: 'Congratulations! Wishing you both a lifetime of love and happiness together.',
      timestamp: new Date('2026-01-01'),
    },
    {
      id: 3,
      name: 'Sarah Putri',
      message: 'Finally! So happy for you both. May your love story continue to inspire us all ❤️',
      timestamp: new Date('2025-12-30'),
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add new wish
    const newWish: Wish = {
      id: wishes.length + 1,
      name: formData.name,
      message: formData.message,
      timestamp: new Date(),
    };

    setTimeout(() => {
      setWishes([newWish, ...wishes]);
      setFormData({ name: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-[#EBCBCF] rounded-full mix-blend-multiply filter blur-[100px] opacity-20" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#DCAE96] rounded-full mix-blend-multiply filter blur-[100px] opacity-20" />
        </div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="w-6 h-6 text-[var(--color-primary)]" />
             <p className="text-2xl text-[var(--color-primary)]" style={{ fontFamily: "'Great Vibes', cursive" }}>
              {t('wishes.pretitle')}
            </p>
          </div>
          <h2
            className="text-4xl md:text-5xl mb-4 text-[var(--color-secondary)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('wishes.title')}
          </h2>
          <p
            className="text-[var(--color-secondary)]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t('wishes.description')}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-sm border border-white/60 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('wishes.name_placeholder')}
                className="w-full px-5 py-4 border border-white/50 rounded-xl bg-white/50 focus:bg-white focus:border-[var(--color-primary)] outline-none transition-all placeholder:text-[var(--color-secondary)]/60 text-[var(--color-secondary)]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              />
            </div>

            <div>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t('wishes.message_placeholder')}
                rows={4}
                className="w-full px-5 py-4 border border-white/50 rounded-xl bg-white/50 focus:bg-white focus:border-[var(--color-primary)] outline-none transition-all resize-none placeholder:text-[var(--color-secondary)]/60 text-[var(--color-secondary)]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[var(--color-primary)] text-white rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-[#A8636B] transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span>{t('wishes.submitting')}</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>{t('wishes.submit_btn')}</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Wishes List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-[var(--color-primary)]" fill="var(--color-primary)" />
            <p
              className="text-[var(--color-secondary)]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {wishes.length} {t('wishes.count_label')}
            </p>
          </div>

          <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-[var(--color-primary)]/50 scrollbar-track-transparent">
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/60 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 border border-[var(--color-primary)]/20"
                  >
                    <span
                      className="text-[var(--color-primary)] text-xl"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {wish.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4
                        className="text-[var(--color-secondary)] font-semibold"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {wish.name}
                      </h4>
                      <span
                        className="text-xs text-[var(--color-secondary)]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {wish.timestamp.toLocaleDateString(i18n.language === 'id' ? 'id-ID' : 'en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <p
                      className="text-[var(--color-secondary)] leading-relaxed"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {wish.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


