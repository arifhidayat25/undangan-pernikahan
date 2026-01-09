import { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { CoupleEditor } from './components/CoupleEditor';
import { EventEditor } from './components/EventEditor';
import { IntroEditor } from './components/IntroEditor';
import { LoveStoryEditor } from './components/LoveStoryEditor';
import { GalleryEditor } from './components/GalleryEditor';
import { ThemeEditor } from './components/ThemeEditor';
import { RsvpManager } from './components/RsvpManager';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('couple');

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'couple':
        return <CoupleEditor />;
      case 'event':
        return <EventEditor />;
      case 'intro':
        return <IntroEditor />;
      case 'love-story':
        return <LoveStoryEditor />;
      case 'gallery':
        return <GalleryEditor />;
      case 'theme':
        return <ThemeEditor />;
      case 'rsvp':
        return <RsvpManager />;
      default:
        return <CoupleEditor />;
    }
  };

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </AdminLayout>
  );
}
