
import { useEffect, useRef } from 'react';
import { Lightbulb, Search, Code, Package } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    title: 'Discovery',
    description: 'We begin by understanding your business, challenges, and objectives through in-depth consultations to identify the most impactful AI opportunities.',
    icon: Search,
    color: 'bg-monk/10',
    iconColor: 'text-monk'
  },
  {
    id: 2,
    title: 'Design',
    description: 'Our team creates a customized solution blueprint that aligns with your specific needs, outlining the architecture, technologies, and implementation plan.',
    icon: Lightbulb,
    color: 'bg-gold/10',
    iconColor: 'text-gold'
  },
  {
    id: 3,
    title: 'Development',
    description: 'We bring your solution to life, leveraging cutting-edge AI technologies while maintaining close collaboration throughout the development process.',
    icon: Code,
    color: 'bg-charcoal/10 dark:bg-gold/10',
    iconColor: 'text-charcoal dark:text-gold'
  },
  {
    id: 4,
    title: 'Delivery',
    description: 'Following thorough testing and refinement, we deploy your solution and provide ongoing support to ensure sustainable, long-term success.',
    icon: Package,
    color: 'bg-monk/10',
    iconColor: 'text-monk'
  }
];

export const Process = () => {
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
    <section id="process" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll opacity-0 transition-all duration-700">
          <h2 className="section-title dark:text-white">Our Process</h2>
          <p className="text-charcoal/70 dark:text-gray-300 max-w-2xl mx-auto">
            Our systematic approach ensures we deliver high-quality AI solutions that drive real business impact.
          </p>
        </div>

        <div className="relative">
          {/* Timeline connector */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <div 
                key={step.id} 
                className="animate-on-scroll opacity-0 transition-all duration-700 flex flex-col items-center text-center"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`${step.color} p-5 rounded-full inline-flex items-center justify-center mb-4 relative z-10 border-4 border-white dark:border-gray-900`}>
                  <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm w-full">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{step.title}</h3>
                  <p className="text-charcoal/70 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
