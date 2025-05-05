
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-20">
      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-monk/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h1 className="animate-on-scroll opacity-0 transition-all duration-700 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-serif">
            <span className="text-gradient">Empowering Businesses</span><br/>
            <span className="text-charcoal">with the Wisdom of AI</span>
          </h1>
          
          <p className="animate-on-scroll opacity-0 transition-all duration-700 delay-300 mt-6 text-lg text-charcoal/80 max-w-lg">
            Blending cutting-edge AI technology with mindful business strategy for sustainable growth and innovation.
          </p>
          
          <div className="animate-on-scroll opacity-0 transition-all duration-700 delay-500 mt-8 flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-monk hover:bg-monk/90 text-white btn-hover"
              onClick={() => scrollToSection('contact')}
            >
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-monk text-monk hover:bg-monk hover:text-white btn-hover"
              onClick={() => scrollToSection('services')}
            >
              Explore Services
            </Button>
          </div>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center md:justify-end animate-on-scroll opacity-0 transition-all duration-1000">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96">
            {/* Logo centered with glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-monk/20 rounded-full blur-xl animate-pulse-slow"></div>
                <img 
                  src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png"
                  alt="The Machine Monk" 
                  className="w-52 h-52 sm:w-64 sm:h-64 relative z-10 animate-scale-in"
                />
              </div>
            </div>
            
            {/* Tech particles around logo */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className={`absolute w-6 h-6 rounded-full bg-monk/80 shadow-lg animate-pulse-slow`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  opacity: 0.6 + Math.random() * 0.4
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-monk rounded-full flex justify-center">
          <div className="w-1 h-3 bg-monk rounded-full mt-2 animate-pulse-slow"></div>
        </div>
      </div>
    </div>
  );
};
