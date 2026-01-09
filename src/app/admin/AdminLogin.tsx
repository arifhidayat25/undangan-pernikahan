import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-[#FAE6E8] to-[#F4C2C2] flex items-center justify-center px-4">
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
            Admin Panel
          </h1>
          <p className="text-[var(--color-secondary)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Masukkan password untuk melanjutkan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--color-secondary)] mb-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                error ? 'border-red-500' : 'border-[var(--color-primary)]/30'
              } focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all`}
              placeholder="Masukkan password"
              autoFocus
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-2"
              >
                Password salah!
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[#A8636B] transition-colors font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-[var(--color-secondary)] mt-6">
          Hint: password = "password"
        </p>
      </motion.div>
    </div>
  );
}

