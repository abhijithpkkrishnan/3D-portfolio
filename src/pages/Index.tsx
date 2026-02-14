import { useState, useEffect } from 'react';
import InteractiveScene from '@/components/3d/InteractiveScene';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import CustomCursor from '@/components/effects/CustomCursor';
import FloatingOrbs from '@/components/effects/FloatingOrbs';
import ScrollProgress from '@/components/effects/ScrollProgress';
import GameUI from '@/components/effects/GameUI';
import LoadingScreen from '@/components/effects/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'experience', 'projects', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 300) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className={`relative min-h-screen scanline cursor-none md:cursor-none ${isLoading ? 'hidden' : ''}`}>
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Scroll Progress */}
        <ScrollProgress />
        
        {/* Game UI */}
        <GameUI activeSection={activeSection} />
        
        {/* Floating Orbs Background */}
        <FloatingOrbs />
        
        {/* 3D Background Scene */}
        <InteractiveScene />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Content Sections */}
        <main className="relative z-10">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>

        {/* Gradient overlays for depth */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </>
  );
};

export default Index;