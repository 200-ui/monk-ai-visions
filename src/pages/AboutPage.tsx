
import { useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Features } from '@/components/Features';
import { Button } from '@/components/ui/button';
import { BookCallModal } from '@/components/BookCallModal';
import { useState } from 'react';

const AboutPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showBookCallModal, setShowBookCallModal] = useState(false);

  useEffect(() => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">About The Machine Monk</h1>
            <p className="text-xl md:text-2xl text-charcoal/80 max-w-3xl mx-auto">
              Bridging AI brilliance and mindful business strategy for sustainable innovation.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section ref={sectionRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll opacity-0 transition-all duration-700">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-serif monk-border inline-block">Our Story</h2>
                <p className="text-charcoal/80 text-lg mb-6">
                  The Machine Monk was founded in 2018 with a unique vision: to combine the technical power of artificial intelligence with the mindful, strategic approach of a monk's wisdom.
                </p>
                <p className="text-charcoal/80 text-lg mb-6">
                  In a world of rapid technological advancement, we believe that the most powerful AI solutions are those that are implemented thoughtfully, ethically, and strategically. Our team of AI experts, business strategists, and industry specialists work together to create solutions that not only leverage cutting-edge technology but also align perfectly with our clients' business objectives.
                </p>
                <p className="text-charcoal/80 text-lg mb-6">
                  We've helped over 100 businesses across various industries transform their operations, improve customer experiences, and drive growth through thoughtful AI implementation. Our client-centered approach ensures that every solution we develop is tailored to address specific business challenges and opportunities.
                </p>
                <div className="mb-8 bg-gray-50 p-8 rounded-lg border-l-4 border-monk">
                  <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-charcoal/80 text-lg">
                    Helping businesses harness AI mindfully, efficiently, and ethically to create sustainable value and innovation that drives meaningful growth and positive impact.
                  </p>
                </div>
                <Button 
                  className="bg-monk hover:bg-monk/90 text-white btn-hover text-lg py-6 px-8"
                  onClick={() => setShowBookCallModal(true)}
                >
                  Contact Us
                </Button>
              </div>
              
              <div className="animate-on-scroll opacity-0 transition-all duration-700 delay-300">
                <div className="relative h-[500px] overflow-hidden rounded-xl">
                  <img 
                    src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png" 
                    alt="The Machine Monk" 
                    className="absolute w-full h-full object-contain transform hover:scale-105 transition-transform duration-700 bg-gray-50 p-12"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end">
                    <div className="p-8">
                      <p className="text-white text-xl font-medium text-center w-full">
                        Transforming businesses through mindful AI integration since 2018
                      </p>
                    </div>
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
      
      <BookCallModal 
        isOpen={showBookCallModal} 
        onClose={() => setShowBookCallModal(false)} 
      />
    </div>
  );
};

export default AboutPage;
