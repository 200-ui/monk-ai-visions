
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll opacity-0 transition-all duration-700">
          <h2 className="section-title dark:text-white">Our Services</h2>
          <p className="text-charcoal/70 dark:text-gray-300 max-w-2xl mx-auto">
            Innovative AI solutions designed to transform your business operations and elevate your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="animate-on-scroll opacity-0 transition-all duration-700 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md card-hover bg-white dark:bg-gray-800">
              <CardHeader>
                <div className={`p-3 rounded-lg inline-block ${service.color} mb-4`}>
                  <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>
                <CardTitle className="text-xl font-semibold dark:text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-charcoal/80 dark:text-gray-300">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
