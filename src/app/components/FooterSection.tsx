import { motion } from 'motion/react';
import { Gift, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWeddingData } from '../../context/WeddingDataContext';

export function FooterSection() {
  const { data } = useWeddingData();
  const { t } = useTranslation();
  
  // Generate hashtag from couple names and wedding year
  const getHashtag = () => {
    const brideName = data.couple.bride.name;
    const groomName = data.couple.groom.name;
    const year = new Date(data.event.weddingDate).getFullYear();
    return `#${brideName}${groomName}${year}`;
  };
  
  // Get couple names for display
  const getCoupleNames = () => {
    return `${data.couple.bride.name} & ${data.couple.groom.name}`;
  };
  
  // Get wedding year
  const getYear = () => {
    return new Date(data.event.weddingDate).getFullYear();
  };
  return (
    <footer className="py-16 md:py-20 px-4 bg-[var(--color-secondary)] text-[#FAE6E8]">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Wedding Hashtag */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p
            className="text-sm tracking-widest uppercase text-[var(--color-primary)] mb-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t('footer.share_moment')}
          </p>
          <h3
            className="text-3xl md:text-4xl mb-4 text-[#F4C2C2]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {getHashtag()}
          </h3>
          <p
            className="text-sm text-[#DCAE96]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t('footer.use_hashtag')}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent mx-auto mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />

        {/* Wedding Registry */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-[var(--color-primary)]" />
            <p
              className="text-sm tracking-widest uppercase text-[var(--color-primary)]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t('footer.wedding_gift')}
            </p>
          </div>

          <p
            className="text-[#DCAE96] mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t('footer.gift_message')}
          </p>

          <motion.a
            href="#"
            className="inline-block px-8 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full relative overflow-hidden group"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="relative z-10 group-hover:text-white transition-colors"
              initial={false}
            >
              {t('footer.view_registry')}
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-[var(--color-primary)]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          className="pt-8 border-t border-[var(--color-primary)]/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-[var(--color-primary)]" fill="var(--color-primary)" />
            <Heart className="w-5 h-5 text-[var(--color-primary)]" fill="var(--color-primary)" />
            <Heart className="w-4 h-4 text-[var(--color-primary)]" fill="var(--color-primary)" />
          </div>

          <p
            className="text-lg md:text-xl mb-4 text-[#F4C2C2]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('footer.thank_you')}
          </p>

          <p
            className="text-sm text-[#DCAE96]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {getCoupleNames()}
          </p>

          {/* Creative Copyright */}
          <div className="mt-8 pt-6 border-t border-[var(--color-primary)]/10">
            <p
              className="text-xs text-[#DCAE96]/80 mb-2 flex items-center justify-center gap-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span>{t('footer.made_with')}</span>
              <Heart className="w-3 h-3 text-[var(--color-primary)] animate-pulse" fill="var(--color-primary)" />
              <span>{t('footer.by')}</span>
              <a 
                href="https://github.com/arifhidayat25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-primary)] hover:text-[#A8636B] transition-colors underline decoration-dotted"
              >
                Achmad Arif Hidayat
              </a>
            </p>
            <p
              className="text-xs text-[#DCAE96]/60"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              © {getYear()} {getCoupleNames()} Wedding • {t('footer.rights_reserved')}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}


