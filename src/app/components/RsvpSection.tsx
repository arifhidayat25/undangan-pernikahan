import { motion } from 'motion/react';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { saveRsvp } from '../../utils/rsvpStorage';
import { useWeddingData } from '../../context/WeddingDataContext';

export function RsvpSection() {
  const { data } = useWeddingData();
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    attendance: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Calculate RSVP deadline (7 days before wedding)
  const getRsvpDeadline = () => {
    const weddingDate = new Date(data.event.weddingDate);
    const deadline = new Date(weddingDate);
    deadline.setDate(deadline.getDate() - 7);
    
    return deadline.toLocaleDateString(i18n.language === 'id' ? 'id-ID' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    saveRsvp({
      name: formData.name,
      guests: formData.guests,
      attendance: formData.attendance as 'hadir' | 'tidak-hadir',
      message: formData.message,
    });
    
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        guests: '1',
        attendance: '',
        message: '',
      });
    }, 3000);
  };


  const inputVariants = {
    focused: { scale: 1.02 },
    unfocused: { scale: 1 },
  };

  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden" id="rsvp-section">
      <motion.div
        className="max-w-2xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl mb-4 text-[var(--color-secondary)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('rsvp.title')}
          </h2>
          <p
            className="text-[var(--color-secondary)]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t('rsvp.deadline_prefix', 'Mohon konfirmasi kehadiran Anda sebelum')} {getRsvpDeadline()}
          </p>
        </motion.div>

        <motion.div
          className="bg-white/40 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm border border-white/60"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <motion.div
                variants={inputVariants}
                animate={focusedField === 'name' ? 'focused' : 'unfocused'}
              >
                <label
                  className="block text-sm mb-2 text-[var(--color-secondary)] font-medium"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t('rsvp.name_label')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 border-b border-[var(--color-primary)]/50 bg-transparent focus:border-[var(--color-primary)] outline-none transition-colors text-[var(--color-secondary)]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  placeholder={t('rsvp.name_placeholder', 'Masukkan nama Anda')}
                />
              </motion.div>

              {/* Number of Guests */}
              <motion.div
                variants={inputVariants}
                animate={focusedField === 'guests' ? 'focused' : 'unfocused'}
              >
                <label
                  className="block text-sm mb-2 text-[var(--color-secondary)] font-medium"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t('rsvp.guests_label')} *
                </label>
                <select
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  onFocus={() => setFocusedField('guests')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 border-b border-[var(--color-primary)]/50 bg-transparent focus:border-[var(--color-primary)] outline-none transition-colors text-[var(--color-secondary)]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <option value="1">1 {t('rsvp.person', 'Orang')}</option>
                  <option value="2">2 {t('rsvp.person', 'Orang')}</option>
                  <option value="3">3 {t('rsvp.person', 'Orang')}</option>
                  <option value="4">4 {t('rsvp.person', 'Orang')}</option>
                  <option value="5">5+ {t('rsvp.person', 'Orang')}</option>
                </select>
              </motion.div>

              {/* Attendance Radio */}
              <div>
                <label
                  className="block text-sm mb-3 text-[var(--color-secondary)] font-medium"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t('rsvp.attendance_label')} *
                </label>
                <div className="flex gap-4">
                  <motion.label
                    className="flex-1 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="hadir"
                      required
                      checked={formData.attendance === 'hadir'}
                      onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                      className="sr-only"
                    />
                    <div
                      className={`px-6 py-3 rounded-lg border transition-all ${
                        formData.attendance === 'hadir'
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                          : 'border-[var(--color-primary)]/30 bg-white/20 text-[var(--color-secondary)]'
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {t('rsvp.attending')}
                    </div>
                  </motion.label>

                  <motion.label
                    className="flex-1 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="tidak-hadir"
                      required
                      checked={formData.attendance === 'tidak-hadir'}
                      onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                      className="sr-only"
                    />
                    <div
                      className={`px-6 py-3 rounded-lg border transition-all ${
                        formData.attendance === 'tidak-hadir'
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                          : 'border-[var(--color-primary)]/30 bg-white/20 text-[var(--color-secondary)]'
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {t('rsvp.not_attending')}
                    </div>
                  </motion.label>
                </div>
              </div>

              {/* Message */}
              <motion.div
                variants={inputVariants}
                animate={focusedField === 'message' ? 'focused' : 'unfocused'}
              >
                <label
                  className="block text-sm mb-2 text-[var(--color-secondary)] font-medium"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t('rsvp.message_label')}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full px-4 py-3 border-b border-[var(--color-primary)]/50 bg-transparent focus:border-[var(--color-primary)] outline-none transition-colors resize-none text-[var(--color-secondary)]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  placeholder={t('rsvp.message_placeholder', 'Tuliskan ucapan & doa untuk kami...')}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-4 bg-[var(--color-primary)] text-white rounded-xl shadow-md hover:bg-[#A8636B] transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {t('rsvp.submit_btn')}
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#EBCBCF]/50 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Check className="w-10 h-10 text-[var(--color-primary)]" />
              </motion.div>
              <h3
                className="text-2xl mb-2 text-[var(--color-secondary)]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t('rsvp.success_title')}
              </h3>
              <p
                className="text-[var(--color-secondary)]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {t('rsvp.success_message')}
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

