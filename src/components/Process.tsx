
import { useEffect, useRef } from 'react';
import { SearchCheck, Lightbulb, Code, PackageCheck } from 'lucide-react';

const processSteps = [
  {
    title: 'Discovery',
    description: 'We thoroughly analyze your business needs, goals, and challenges to identify the perfect AI solutions for your specific situation.',
    icon: SearchCheck,
    color: 'bg-monk/10',
    iconColor: 'text-monk',
  },
  {
    title: 'Strategy',
    description: 'Our experts develop a comprehensive AI integration strategy tailored to your business objectives, timeline, and budget considerations.',
    icon: Lightbulb,
    color: 'bg-gold/10',
    iconColor: 'text-gold',
  },
  {
    title: 'Development',
    description: 'We build and implement custom AI solutions using industry best practices, ensuring seamless integration with your existing systems.',
    icon: Code,
    color: 'bg-charcoal/10',
    iconColor: 'text-charcoal',
  },
  {
    title: 'Delivery & Support',
    description: 'We deploy your AI solution, provide comprehensive training, and offer ongoing support to ensure long-term success and optimal performance.',
    icon: PackageCheck,
    color: 'bg-monk/10',
    iconColor: 'text-monk',
  },
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
    <section id="process" ref={sectionRef} className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll opacity-0 transition-all duration-700">
          <h2 className="section-title text-2xl md:text-3xl lg:text-4xl">Our Process</h2>
          <p className="text-charcoal/70 text-base max-w-3xl mx-auto">
            Our structured approach ensures we deliver consistent, high-quality AI solutions that drive real business results.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-monk via-gold to-monk transform -translate-y-1/2 z-0"></div>
          
          {processSteps.map((step, index) => (
            <div 
              key={index} 
              className="animate-on-scroll opacity-0 transition-all duration-700 flex-1 z-10"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col relative">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-monk font-bold text-monk text-sm">
                  {index + 1}
                </div>
                
                <div className={`p-3 rounded-full inline-block ${step.color} mb-4 mx-auto`}>
                  <step.icon className={`w-5 h-5 ${step.iconColor}`} />
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">{step.title}</h3>
                <p className="text-charcoal/70 text-center text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
