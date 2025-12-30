
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import { LoadingAnimation } from '@/components/LoadingAnimation';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Ensure dark mode class is preserved during mount
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }

    // Show loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay before showing content to prevent flash
      requestAnimationFrame(() => {
        setShowContent(true);
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // During loading, maintain theme-aware background
  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className={`min-h-screen flex flex-col bg-background transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;

