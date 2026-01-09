import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  Users, 
  Calendar, 
  MessageSquare, 
  Heart, 
  Image, 
  Palette,
  Home,
  LogOut,
  Menu,
  X,
  ListChecks
} from 'lucide-react';
import { useWeddingData } from '../../context/WeddingDataContext';
import { useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'couple', label: 'Data Pasangan', icon: Users },
  { id: 'event', label: 'Detail Acara', icon: Calendar },
  { id: 'intro', label: 'Pesan Pembuka', icon: MessageSquare },
  { id: 'love-story', label: 'Love Story', icon: Heart },
  { id: 'gallery', label: 'Galeri Foto', icon: Image },
  { id: 'theme', label: 'Tema Warna', icon: Palette },
  { id: 'rsvp', label: 'Data RSVP', icon: ListChecks },
];

export function AdminLayout({ children, activeSection, onSectionChange }: AdminLayoutProps) {
  const { saveData, exportData, resetData, hasUnsavedChanges } = useWeddingData();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const { importData } = useWeddingData();
        await importData(file);
      }
    };
    input.click();
  };

  const handleLogout = () => {
    if (hasUnsavedChanges) {
      if (confirm('Ada perubahan yang belum disimpan. Yakin ingin keluar?')) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAE6E8] to-[#F4C2C2]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/60 sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1
              className="text-2xl text-[var(--color-secondary)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Admin Panel
            </h1>
            {hasUnsavedChanges && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                Unsaved Changes
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={saveData}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[#A8636B] transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>

            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[var(--color-primary)] border border-[var(--color-primary)] rounded-lg hover:bg-[#FFF5F5] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={handleImport}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[var(--color-primary)] border border-[var(--color-primary)] rounded-lg hover:bg-[#FFF5F5] transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </button>

            <button
              onClick={resetData}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 bg-white/80 backdrop-blur-md border-r border-white/60 z-30 overflow-y-auto"
            >
              <nav className="p-4 space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        onSectionChange(section.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeSection === section.id
                          ? 'bg-[var(--color-primary)] text-white shadow-md'
                          : 'text-[var(--color-secondary)] hover:bg-[var(--color-primary)]/10'
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

