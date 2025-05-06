
import { useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Features } from '@/components/Features';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const teamMembers = [
  {
    name: 'Dr. Alexander Chen',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    bio: 'AI researcher with 15+ years of experience in machine learning and business strategy.'
  },
  {
    name: 'Sarah Johnson',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
    bio: 'Former tech lead at major AI labs with expertise in deep learning and neural networks.'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of AI Solutions',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop',
    bio: 'Specialist in enterprise AI implementation and custom AI agent development.'
  },
  {
    name: 'Emily Zhang',
    role: 'Lead AI Engineer',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=500&fit=crop',
    bio: 'Expert in natural language processing and conversational AI systems.'
  },
];

const AboutPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">About The Machine Monk</h1>
            <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
              Bridging AI brilliance and mindful business strategy for sustainable innovation.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section ref={sectionRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll opacity-0 transition-all duration-700">
                <h2 className="text-3xl font-bold mb-6 font-serif monk-border inline-block">Our Story</h2>
                <p className="text-charcoal/80 mb-4">
                  The Machine Monk was founded with a unique vision: to combine the technical power of artificial intelligence with the mindful, strategic approach of a monk's wisdom.
                </p>
                <p className="text-charcoal/80 mb-6">
                  In a world of rapid technological advancement, we believe that the most powerful AI solutions are those that are implemented thoughtfully, ethically, and strategically.
                </p>
                <div className="mb-8 bg-gray-50 p-6 rounded-lg border-l-4 border-monk">
                  <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                  <p className="text-charcoal/80">
                    Helping businesses harness AI mindfully, efficiently, and ethically to create sustainable value and innovation.
                  </p>
                </div>
                <Button 
                  className="bg-monk hover:bg-monk/90 text-white btn-hover"
                  onClick={() => {
                    document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="animate-on-scroll opacity-0 transition-all duration-700 delay-300">
                <div className="relative h-[500px] overflow-hidden rounded-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1000&q=80" 
                    alt="AI Technology" 
                    className="absolute w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-8">
                      <p className="text-white text-lg font-medium">
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
        
        {/* Team Section */}
        <section id="team" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="section-title">Our Team</h2>
              <p className="text-charcoal/70 max-w-2xl mx-auto">
                Meet the experts behind The Machine Monk's innovative AI solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-monk font-medium mb-3">{member.role}</p>
                    <p className="text-charcoal/70">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
