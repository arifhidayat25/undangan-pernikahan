import { useState, useEffect } from 'react';
import { OpeningCard } from './components/OpeningCard';
import { FloatingButtons } from './components/FloatingButtons';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { DetailsSection } from './components/DetailsSection';
import { LoveStoryTimeline } from './components/LoveStoryTimeline';
import { GallerySection } from './components/GallerySection';
import { WishesSection } from './components/WishesSection';
import { RsvpSection } from './components/RsvpSection';
import { CtaSection } from './components/CtaSection';
import { FooterSection } from './components/FooterSection';
import { BackgroundEffect } from './components/BackgroundEffect';
import { ScrollReveal } from './components/ui/ScrollReveal';
import { useWeddingData } from '../context/WeddingDataContext';

export function MainSite() {
  const { data } = useWeddingData();
  const [showContent, setShowContent] = useState(false);

  // Set dynamic page title
  useEffect(() => {
    const brideName = data.couple.bride.name;
    const groomName = data.couple.groom.name;
    document.title = `${brideName} & ${groomName} - Undangan Pernikahan`;
  }, [data.couple.bride.name, data.couple.groom.name]);

  const handleOpenInvitation = () => {
    setShowContent(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <BackgroundEffect />
      
      {/* Opening Card */}
      {!showContent && <OpeningCard onOpen={handleOpenInvitation} />}

      {/* Main Content */}
      {showContent && (
        <div className="relative z-10">
          <ScrollReveal animation="fade-up" delay={0.2}><HeroSection /></ScrollReveal>
          <ScrollReveal animation="fade-up"><IntroSection /></ScrollReveal>
          <ScrollReveal animation="scale-in"><CountdownTimer /></ScrollReveal>
          <ScrollReveal animation="fade-up"><DetailsSection /></ScrollReveal>
          <ScrollReveal animation="slide-left"><LoveStoryTimeline /></ScrollReveal>
          <ScrollReveal animation="fade-up"><GallerySection /></ScrollReveal>
          <ScrollReveal animation="fade-up"><WishesSection /></ScrollReveal>
          <ScrollReveal animation="scale-in"><RsvpSection /></ScrollReveal>
          <ScrollReveal animation="fade-up"><CtaSection /></ScrollReveal>
          <FooterSection />

          {/* Floating Controls */}
          <FloatingButtons />
        </div>
      )}
    </div>
  );
}
