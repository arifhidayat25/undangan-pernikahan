import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeddingDataProvider } from '../context/WeddingDataContext';
import { ThemeProvider } from '../context/ThemeProvider';
import { MainSite } from './MainSite';
import { AdminPage } from './admin/AdminPage';

export default function App() {
  return (
    <WeddingDataProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainSite />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </WeddingDataProvider>
  );
}
