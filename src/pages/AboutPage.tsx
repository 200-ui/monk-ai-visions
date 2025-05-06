
import { useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Features } from '@/components/Features';

const AboutPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('opacity-100');
                el.classList.remove('opacity-0', 'translate-y-10');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
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
    const numDots = 12;
    const dots = [];
    const connectionDistance = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const orbitRadius = Math.min(canvas.width, canvas.height) * 0.35;

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
        wobble: Math.random() * 5
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw dots
      dots.forEach((dot, i) => {
        // Update position
        dot.angle += dot.speed;
        const wobble = Math.sin(Date.now() * 0.001 + i) * dot.wobble;
        dot.x = centerX + Math.cos(dot.angle) * (dot.baseOrbit + wobble);
        dot.y = centerY + Math.sin(dot.angle) * (dot.baseOrbit + wobble);
        
        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(230, 126, 34, 0.8)';
        ctx.fill();
        
        // Connect dots with lines
        dots.forEach((otherDot, j) => {
          if (i !== j) {
            const dx = dot.x - otherDot.x;
            const dy = dot.y - otherDot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(otherDot.x, otherDot.y);
              
              // Set line opacity based on distance
              const opacity = 1 - distance / connectionDistance;
              ctx.strokeStyle = `rgba(230, 126, 34, ${opacity * 0.5})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif dark:text-white">About The Machine Monk</h1>
            <p className="text-xl text-charcoal/80 max-w-3xl mx-auto dark:text-gray-300">
              Bridging AI brilliance and mindful business strategy for sustainable innovation.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll opacity-0 transition-all duration-700">
                <h2 className="text-3xl font-bold mb-6 font-serif monk-border inline-block dark:text-white">Our Story</h2>
                <p className="text-charcoal/80 mb-4 dark:text-gray-300">
                  The Machine Monk was founded with a unique vision: to combine the technical power of artificial intelligence with the mindful, strategic approach of a monk's wisdom.
                </p>
                <p className="text-charcoal/80 mb-4 dark:text-gray-300">
                  In a world of rapid technological advancement, we believe that the most powerful AI solutions are those that are implemented thoughtfully, ethically, and strategically.
                </p>
                <p className="text-charcoal/80 mb-4 dark:text-gray-300">
                  Our approach goes beyond simply implementing the latest AI technologies—we focus on understanding the unique needs and goals of each business, developing customized solutions that integrate seamlessly with existing processes and culture.
                </p>
                <p className="text-charcoal/80 mb-6 dark:text-gray-300">
                  We take pride in our holistic methodology, considering not just immediate results but long-term sustainability and adaptability. Our team combines deep technical expertise with business acumen to ensure that our AI implementations deliver measurable value.
                </p>
                <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-monk">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Our Mission</h3>
                  <p className="text-charcoal/80 dark:text-gray-300">
                    Helping businesses harness AI mindfully, efficiently, and ethically to create sustainable value and innovation.
                  </p>
                </div>
              </div>
              
              <div className="animate-on-scroll opacity-0 transition-all duration-700 delay-300">
                <div className="relative h-[500px] overflow-hidden rounded-xl flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full z-0"
                  />
                  <div className="relative z-10 w-64 h-64">
                    <img 
                      src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png"
                      alt="The Machine Monk" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features (Reusing component) */}
        <Features />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
