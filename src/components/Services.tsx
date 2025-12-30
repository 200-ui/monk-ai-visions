
import { useEffect, useRef, useState } from 'react';
import { Cog, Users, Code, MessageSquare, Lightbulb } from 'lucide-react';

const services = [
  {
    title: 'AI Business Optimization',
    description: 'AI-powered process automation, data insights, and efficiency boosters for your business workflows.',
    icon: Cog,
    color: 'bg-monk/10',
    iconColor: 'text-monk',
  },
  {
    title: 'AI Assistants for Enterprises',
    description: 'Custom AI agents for customer support, sales, research, and operational excellence.',
    icon: Users,
    color: 'bg-gold/10',
    iconColor: 'text-gold',
  },
  {
    title: 'AI-Powered Web & App Development',
    description: 'Intelligent web applications and platforms with embedded AI capabilities.',
    icon: Code,
    color: 'bg-charcoal/10 dark:bg-gold/10',
    iconColor: 'text-charcoal dark:text-gold',
  },
  {
    title: 'AI & Content Generation',
    description: 'SEO-optimized, AI-generated content that ranks well and converts effectively.',
    icon: MessageSquare,
    color: 'bg-monk/10',
    iconColor: 'text-monk',
  },
  {
    title: 'Custom AI Agent Development',
    description: 'Domain-specific AI agents for unique business needs across legal, finance, and more.',
    icon: Lightbulb,
    color: 'bg-gold/10',
    iconColor: 'text-gold',
  },
  {
    title: 'AI Consulting & Training',
    description: 'Expert guidance for AI adoption, integration, and team training.',
    icon: Cog,
    color: 'bg-charcoal/10 dark:bg-gold/10',
    iconColor: 'text-charcoal dark:text-gold',
  },
];

export const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

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
              }, index * 100);
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

  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;
        
        // Reset scroll position when reaching the end of first set
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  // Duplicate services for infinite scroll effect
  const duplicatedServices = [...services, ...services];

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll opacity-0 transition-all duration-700">
          <h2 className="section-title dark:text-white">Our Services</h2>
          <p className="text-charcoal/70 dark:text-gray-300 max-w-2xl mx-auto">
            Innovative AI solutions designed to transform your business operations and elevate your digital presence.
          </p>
        </div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden cursor-pointer px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedServices.map((service, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-[350px] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold dark:text-white pr-3">{service.title}</h3>
              <div className={`p-2 rounded-lg ${service.color} flex-shrink-0`}>
                <service.icon className={`w-5 h-5 ${service.iconColor}`} />
              </div>
            </div>
            <p className="text-charcoal/70 dark:text-gray-300 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
