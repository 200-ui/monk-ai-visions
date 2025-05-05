
import { useEffect, useRef } from 'react';
import { ShieldCheck, Award, Lightbulb, BarChart } from 'lucide-react';

const features = [
  {
    title: 'Expertise',
    description: 'Led by AI specialists with deep industry knowledge and experience.',
    icon: Award,
    color: 'bg-monk/10',
    iconColor: 'text-monk',
  },
  {
    title: 'Innovation',
    description: 'Pioneering AI solutions that keep you ahead of the competition.',
    icon: Lightbulb,
    color: 'bg-gold/10',
    iconColor: 'text-gold',
  },
  {
    title: 'Reliability',
    description: 'Consistent, dependable performance you can count on.',
    icon: BarChart,
    color: 'bg-charcoal/10',
    iconColor: 'text-charcoal',
  },
  {
    title: 'Ethics',
    description: 'Committed to responsible and transparent AI development.',
    icon: ShieldCheck,
    color: 'bg-monk/10',
    iconColor: 'text-monk',
  },
];

export const Features = () => {
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll opacity-0 transition-all duration-700">
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            The Machine Monk offers a unique blend of technical expertise and strategic vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="animate-on-scroll opacity-0 transition-all duration-700 bg-white p-6 rounded-xl shadow-sm hover:shadow-md card-hover border border-gray-100"
            >
              <div className={`p-3 rounded-lg inline-block ${feature.color} mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-charcoal/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
