import { motion } from 'motion/react';
import { MessageCircle, Package, Sparkles, Users, Star } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PricingModal } from './PricingModal';

export function CtaSection() {
  const { t } = useTranslation();
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const whatsappNumber = '6285942550791'; // Ganti dengan nomor WhatsApp Anda
  const whatsappMessage = encodeURIComponent(
    'Halo! Saya tertarik dengan undangan digital seperti yang saya lihat di website. Bisa info lebih lanjut?'
  );

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  const handlePricingClick = () => {
    setIsPricingOpen(true);
  };

  return (
    <section className="py-20 md:py-28 px-4 relative overflow-hidden bg-gradient-to-br from-[#FAE6E8] via-[#F4C2C2] to-[#EBCBCF]">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[var(--color-primary)] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[var(--color-accent)] rounded-full blur-3xl" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[var(--color-primary)]/30 shadow-sm">
            <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
            <span
              className="text-sm font-semibold text-[var(--color-secondary)]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t('cta.promo_badge')}
            </span>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl mb-4 text-[var(--color-secondary)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('cta.title')}
          </h2>
          <p
            className="text-lg md:text-xl text-[var(--color-secondary)]/80 max-w-2xl mx-auto mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t('cta.subtitle')}
            <br />
            <span className="font-semibold text-[var(--color-primary)]">
              {t('cta.subtitle_highlight')}
            </span>
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/60">
            <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[var(--color-secondary)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {t('cta.feature_couples')}
              </p>
              <p className="text-xs text-[var(--color-secondary)]/70" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {t('cta.feature_ordered')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/60">
            <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-[var(--color-primary)]" fill="var(--color-primary)" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[var(--color-secondary)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {t('cta.feature_rating')}
              </p>
              <p className="text-xs text-[var(--color-secondary)]/70" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {t('cta.feature_reviews')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/60">
            <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[var(--color-secondary)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {t('cta.feature_package')}
              </p>
              <p className="text-xs text-[var(--color-secondary)]/70" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {t('cta.feature_price')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Primary Button - WhatsApp */}
          <motion.button
            onClick={handleWhatsAppClick}
            className="group relative px-8 py-4 bg-[#25D366] text-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden min-w-[240px]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#128C7E] to-[#25D366]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
              <MessageCircle className="w-5 h-5" />
              {t('cta.whatsapp_btn')}
            </span>
          </motion.button>

          {/* Secondary Button - Pricing */}
          <motion.button
            onClick={handlePricingClick}
            className="px-8 py-4 bg-white text-[var(--color-primary)] border-2 border-[var(--color-primary)] rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-all min-w-[240px] font-semibold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              {t('cta.pricing_btn')}
            </span>
          </motion.button>
        </motion.div>

        {/* Trust Badge */}
        <motion.p
          className="text-center text-sm text-[var(--color-secondary)]/60 mt-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {t('cta.trust_badge')}
        </motion.p>
      </motion.div>

      {/* Pricing Modal */}
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </section>
  );
}
