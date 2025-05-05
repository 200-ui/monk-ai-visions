
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
    <section id="process" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll opacity-0 transition-all duration-700">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">Our Process</h2>
          <p className="text-charcoal/80 text-lg max-w-3xl mx-auto">
            Our structured approach ensures we deliver consistent, high-quality AI solutions that drive real business results.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-monk via-gold to-monk transform -translate-y-1/2 z-0"></div>
          
          {processSteps.map((step, index) => (
            <div 
              key={index} 
              className="animate-on-scroll opacity-0 transition-all duration-700 flex-1 z-10"
            >
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col relative">
                {/* Step number */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center border-2 border-monk font-bold text-monk">
                  {index + 1}
                </div>
                
                <div className={`p-4 rounded-full inline-block ${step.color} mb-6 mx-auto`}>
                  <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">{step.title}</h3>
                <p className="text-charcoal/70 text-center text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
