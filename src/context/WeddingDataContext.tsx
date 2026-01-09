import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WeddingData, defaultWeddingData } from '../data/weddingData';

interface WeddingDataContextType {
  data: WeddingData;
  updateData: (newData: WeddingData) => void;
  saveData: () => void;
  exportData: () => void;
  importData: (file: File) => Promise<void>;
  resetData: () => void;
  hasUnsavedChanges: boolean;
}

const WeddingDataContext = createContext<WeddingDataContextType | undefined>(undefined);

const STORAGE_KEY = 'wedding_data';

export function WeddingDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WeddingData>(() => {
    // Load from localStorage on initial mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading wedding data:', error);
    }
    return defaultWeddingData;
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateData = (newData: WeddingData) => {
    setData(newData);
    setHasUnsavedChanges(true);
  };

  const saveData = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setHasUnsavedChanges(false);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving wedding data:', error);
      alert('Gagal menyimpan data. Pastikan browser Anda mengizinkan localStorage.');
    }
  };

  const exportData = () => {
    try {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wedding-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Gagal mengekspor data.');
    }
  };

  const importData = async (file: File): Promise<void> => {
    try {
      const text = await file.text();
      const importedData = JSON.parse(text) as WeddingData;
      
      // Basic validation
      if (!importedData.couple || !importedData.event || !importedData.intro) {
        throw new Error('Invalid data format');
      }
      
      setData(importedData);
      setHasUnsavedChanges(true);
      alert('Data berhasil diimpor! Jangan lupa klik Save untuk menyimpan.');
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Gagal mengimpor data. Pastikan file JSON valid.');
    }
  };

  const resetData = () => {
    if (confirm('Apakah Anda yakin ingin mereset semua data ke default? Perubahan yang belum disimpan akan hilang.')) {
      setData(defaultWeddingData);
      setHasUnsavedChanges(true);
    }
  };

  // Auto-save on unmount if there are unsaved changes
  useEffect(() => {
    return () => {
      if (hasUnsavedChanges) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    };
  }, [data, hasUnsavedChanges]);

  return (
    <WeddingDataContext.Provider
      value={{
        data,
        updateData,
        saveData,
        exportData,
        importData,
        resetData,
        hasUnsavedChanges
      }}
    >
      {children}
    </WeddingDataContext.Provider>
  );
}

export function useWeddingData() {
  const context = useContext(WeddingDataContext);
  if (!context) {
    throw new Error('useWeddingData must be used within WeddingDataProvider');
  }
  return context;
}
