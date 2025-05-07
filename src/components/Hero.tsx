
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match its display size
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Parameters for the dots
    const numDots = 15;
    const dots = [];
    const connectionDistance = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const orbitRadius = Math.min(canvas.width, canvas.height) * 0.38;

    // Create initial dots
    for (let i = 0; i < numDots; i++) {
      const angle = (i / numDots) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * orbitRadius;
      const y = centerY + Math.sin(angle) * orbitRadius;
      dots.push({
        x,
        y,
        angle,
        speed: 0.002 + Math.random() * 0.002,
        radius: 3,
        baseOrbit: orbitRadius,
        wobble: Math.random() * 8,
        connectionProbability: Math.random()
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update positions first
      dots.forEach((dot, i) => {
        // Update position
        dot.angle += dot.speed;
        const wobble = Math.sin(Date.now() * 0.001 + i * 2) * dot.wobble;
        dot.x = centerX + Math.cos(dot.angle) * (dot.baseOrbit + wobble);
        dot.y = centerY + Math.sin(dot.angle) * (dot.baseOrbit + wobble);
        
        // Randomly change connection probability
        if (Math.random() < 0.01) {
          dot.connectionProbability = Math.random();
        }
      });
      
      // Connect dots with lines conditionally
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        // Connect to next dot (circular path)
        const nextIndex = (i + 1) % dots.length;
        const nextDot = dots[nextIndex];
        
        // Always connect to next dot if they're close enough or with some probability
        const dx = dot.x - nextDot.x;
        const dy = dot.y - nextDot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance || dot.connectionProbability > 0.6) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(nextDot.x, nextDot.y);
          const opacity = Math.min(1, (connectionDistance - distance) / 50);
          ctx.strokeStyle = `rgba(230, 126, 34, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        
        // Connect to some other dots based on distance and probability
        for (let j = 0; j < dots.length; j++) {
          if (i !== j && j !== nextIndex) {
            const otherDot = dots[j];
            const dx = dot.x - otherDot.x;
            const dy = dot.y - otherDot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance * 0.7 && Math.random() > 0.7) {
              ctx.beginPath();
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(otherDot.x, otherDot.y);
              
              // Set line opacity based on distance
              const opacity = 1 - distance / connectionDistance;
              ctx.strokeStyle = `rgba(230, 126, 34, ${opacity * 0.3})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
      
      // Draw dots on top
      dots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(230, 126, 34, 0.8)';
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-20 dark:from-gray-900 dark:to-gray-800">
      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-monk/5 rounded-full blur-3xl dark:bg-monk/10"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl dark:bg-gold/10"></div>
      
      <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h1 className="animate-on-scroll opacity-0 transition-all duration-700 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-serif">
            <span className="text-gradient">Empowering Businesses</span><br/>
            <span className="text-charcoal dark:text-white">with the Wisdom of AI</span>
          </h1>
          
          <p className="animate-on-scroll opacity-0 transition-all duration-700 delay-300 mt-6 text-lg text-charcoal/80 dark:text-gray-300 max-w-lg">
            Blending cutting-edge AI technology with mindful business strategy for sustainable growth and innovation.
          </p>
          
          <div className="animate-on-scroll opacity-0 transition-all duration-700 delay-500 mt-8 flex flex-wrap gap-4">
            <Button 
              size="default" 
              className="bg-monk hover:bg-monk/90 text-white"
              onClick={() => scrollToSection('services')}
            >
              Our Services
            </Button>
            <Button 
              variant="outline" 
              size="default" 
              className="border-monk text-monk hover:bg-monk hover:text-white dark:border-monk dark:text-monk dark:hover:text-white"
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center md:justify-end animate-on-scroll opacity-0 transition-all duration-1000">
          <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px]">
            {/* Logo centered with canvas for animated dots */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full z-0"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png"
                alt="The Machine Monk" 
                className="w-56 h-56 sm:w-72 sm:h-72 relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - Hide on mobile and in responsive mode */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-8 h-12 border-2 border-monk rounded-full flex justify-center">
          <div className="w-1 h-3 bg-monk rounded-full mt-2 animate-pulse-slow"></div>
        </div>
      </div>
    </div>
  );
};
