
import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Search, Code, Package } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    title: 'Discovery',
    description: 'Understanding your business challenges and AI opportunities.',
    icon: Search,
    color: 'bg-monk/10',
    iconColor: 'text-monk'
  },
  {
    id: 2,
    title: 'Design',
    description: 'Creating a customized solution blueprint for your needs.',
    icon: Lightbulb,
    color: 'bg-gold/10',
    iconColor: 'text-gold'
  },
  {
    id: 3,
    title: 'Development',
    description: 'Building your solution with cutting-edge AI technologies.',
    icon: Code,
    color: 'bg-charcoal/10 dark:bg-gold/10',
    iconColor: 'text-charcoal dark:text-gold'
  },
  {
    id: 4,
    title: 'Delivery',
    description: 'Deploying and providing ongoing support for success.',
    icon: Package,
    color: 'bg-monk/10',
    iconColor: 'text-monk'
  }
];

export const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal steps one by one with delay
            processSteps.forEach((step, index) => {
              setTimeout(() => {
                setVisibleSteps(prev => [...prev, step.id]);
              }, index * 400);
            });
          }
        });
      },
      { threshold: 0.2 }
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
    <section id="process" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${visibleSteps.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title dark:text-white">Our Process</h2>
          <p className="text-charcoal/70 dark:text-gray-300 max-w-2xl mx-auto">
            Our systematic approach ensures we deliver high-quality AI solutions.
          </p>
        </div>

        {/* Wave Layout Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Wave SVG Path */}
          <svg 
            className="absolute top-1/2 left-0 right-0 w-full h-32 -translate-y-1/2 hidden md:block"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 Q125,10 250,50 T500,50 T750,50 T1000,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-200 dark:text-gray-700"
              strokeDasharray="8,8"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {processSteps.map((step, index) => {
              const isHigh = index % 2 === 0;
              const isVisible = visibleSteps.includes(step.id);
              
              return (
                <div 
                  key={step.id} 
                  className={`
                    flex flex-col items-center text-center
                    transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                    ${isHigh ? 'md:-translate-y-8' : 'md:translate-y-8'}
                  `}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    transform: isVisible 
                      ? `translateY(${isHigh ? '-2rem' : '2rem'})` 
                      : 'translateY(4rem)'
                  }}
                >
                  {/* Icon */}
                  <div className={`
                    ${step.color} p-4 rounded-full inline-flex items-center justify-center mb-4 
                    border-4 border-white dark:border-gray-900 shadow-md
                    transition-all duration-500 delay-100
                    ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
                  `}>
                    <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>

                  {/* Content Card */}
                  <div className={`
                    bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm w-full
                    border border-gray-100 dark:border-gray-700
                    transition-all duration-500 delay-200
                    hover:shadow-md hover:-translate-y-1
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}>
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">{step.title}</h3>
                    <p className="text-charcoal/70 dark:text-gray-300 text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
