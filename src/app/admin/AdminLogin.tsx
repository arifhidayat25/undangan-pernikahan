import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'password') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAE6E8] to-[#F4C2C2] flex items-center justify-center px-4 relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full border border-white/60"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1
            className="text-3xl text-[var(--color-secondary)] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('admin.login.title')}
          </h1>
          <p className="text-[var(--color-secondary)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {t('admin.login.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--color-secondary)] mb-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t('admin.login.password_label')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                error ? 'border-red-500' : 'border-[var(--color-primary)]/30'
              } focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all`}
              placeholder={t('admin.login.password_placeholder')}
              autoFocus
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-2"
              >
                {t('admin.login.error_msg')}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[#A8636B] transition-colors font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t('admin.login.submit_btn')}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--color-secondary)] mt-6">
          {t('admin.login.hint')}
        </p>
      </motion.div>
    </div>
  );
}

