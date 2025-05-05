
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Cog, Users, Code, MessageSquare, Lightbulb } from 'lucide-react';

const services = [
  {
    title: 'AI Business Optimization',
    description: 'AI-powered process automation, data insights, and efficiency boosters for your business workflows.',
    icon: Cog,
    color: 'bg-monk/10',
    iconColor: 'text-monk',
    slug: 'ai-business-optimization',
  },
  {
    title: 'AI Assistants for Enterprises',
    description: 'Custom AI agents for customer support, sales, research, and operational excellence.',
    icon: Users,
    color: 'bg-gold/10',
    iconColor: 'text-gold',
    slug: 'ai-assistants-for-enterprises',
  },
  {
    title: 'AI-Powered Web & App Development',
    description: 'Intelligent web applications and platforms with embedded AI capabilities.',
    icon: Code,
    color: 'bg-charcoal/10',
    iconColor: 'text-charcoal',
    slug: 'ai-powered-web-app-development',
  },
  {
    title: 'AI & Content Generation',
    description: 'SEO-optimized, AI-generated content that ranks well and converts effectively.',
    icon: MessageSquare,
    color: 'bg-monk/10',
    iconColor: 'text-monk',
    slug: 'ai-content-generation',
  },
  {
    title: 'Custom AI Agent Development',
    description: 'Domain-specific AI agents for unique business needs across legal, finance, and more.',
    icon: Lightbulb,
    color: 'bg-gold/10',
    iconColor: 'text-gold',
    slug: 'custom-ai-agent-development',
  },
  {
    title: 'AI Consulting & Training',
    description: 'Expert guidance for AI adoption, integration, and team training.',
    icon: Cog,
    color: 'bg-charcoal/10',
    iconColor: 'text-charcoal',
    slug: 'ai-consulting-training',
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
    <section id="services" ref={sectionRef} className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll opacity-0 transition-all duration-700">
          <h2 className="section-title text-2xl md:text-3xl lg:text-4xl">Our Services</h2>
          <p className="text-charcoal/70 text-base max-w-2xl mx-auto">
            Innovative AI solutions designed to transform your business operations and elevate your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="animate-on-scroll opacity-0 transition-all duration-700 border border-gray-100 shadow-sm hover:shadow-md card-hover bg-white h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg inline-block ${service.color} mb-2`}>
                    <service.icon className={`w-5 h-5 ${service.iconColor}`} />
                  </div>
                  <Link 
                    to={`/service/${service.slug}`}
                    className="text-sm text-monk hover:underline"
                  >
                    Learn More
                  </Link>
                </div>
                <CardTitle className="text-lg font-medium">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-charcoal/80 text-sm">
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
