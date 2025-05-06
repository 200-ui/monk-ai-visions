
import { useRef, useEffect } from 'react';
import { 
  BarChart, 
  Users, 
  Code, 
  MessageSquare,
  Cog,
  BookOpen
} from 'lucide-react';

const services = [
  {
    title: "AI Business Optimization",
    description: "Leverage AI to streamline operations, reduce costs, and enhance decision-making with data-driven insights.",
    icon: BarChart,
    color: "bg-monk/10",
    iconColor: "text-monk"
  },
  {
    title: "AI Assistants for Enterprises",
    description: "Custom AI assistants that automate customer interactions and support, improving response times and satisfaction.",
    icon: Users,
    color: "bg-gold/10",
    iconColor: "text-gold"
  },
  {
    title: "AI-Powered Web & App Development",
    description: "Create intelligent, responsive digital experiences that adapt to user behavior and preferences.",
    icon: Code,
    color: "bg-charcoal/10",
    iconColor: "text-charcoal dark:text-white/70"
  },
  {
    title: "AI & Content Generation",
    description: "Produce engaging, SEO-optimized content at scale while maintaining brand voice and quality standards.",
    icon: MessageSquare,
    color: "bg-monk/10",
    iconColor: "text-monk"
  },
  {
    title: "Custom AI Agent Development",
    description: "Build specialized AI agents tailored to specific industry needs and complex business challenges.",
    icon: Cog,
    color: "bg-gold/10",
    iconColor: "text-gold"
  },
  {
    title: "AI Consulting & Training",
    description: "Expert guidance on AI strategy, implementation, and team upskilling to drive internal innovation.",
    icon: BookOpen,
    color: "bg-charcoal/10",
    iconColor: "text-charcoal dark:text-white/70"
  }
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
    <section id="services" ref={sectionRef} className="py-20 bg-white dark:bg-charcoal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll opacity-0 transition-all duration-700">
          <h2 className="section-title dark:text-white">Our Services</h2>
          <p className="text-charcoal/70 dark:text-white/70 max-w-2xl mx-auto">
            Comprehensive AI solutions designed to transform your business and drive sustainable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="animate-on-scroll opacity-0 transition-all duration-700 bg-white dark:bg-charcoal/50 p-6 rounded-lg shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 group hover:translate-y-[-5px]"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`${service.color} p-3 rounded-lg inline-block mb-4 transition-transform group-hover:scale-110`}>
                <service.icon className={`w-6 h-6 ${service.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{service.title}</h3>
              <p className="text-charcoal/80 dark:text-white/70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
