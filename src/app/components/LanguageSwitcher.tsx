import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="px-3 py-1 bg-white/50 backdrop-blur-sm border border-white/40 rounded-full text-xs font-medium tracking-wider uppercase text-[var(--color-secondary)] hover:bg-white/80 transition-colors z-50 shadow-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {i18n.language === 'id' ? 'EN' : 'ID'}
    </motion.button>
  );
}
