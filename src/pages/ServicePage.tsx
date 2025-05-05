
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BookCallModal } from '@/components/BookCallModal';

// Service data
const servicesData = {
  'ai-business-optimization': {
    title: 'AI Business Optimization',
    hero: 'Transform Your Business Operations with AI',
    description: 'Our AI Business Optimization services help companies streamline operations, reduce costs, and increase efficiency through intelligent automation and data-driven insights.',
    benefits: [
      'Automate repetitive tasks and workflows',
      'Gain deeper insights from your business data',
      'Optimize resource allocation and scheduling',
      'Identify bottlenecks and inefficiencies',
      'Reduce operational costs by 20-30%',
      'Improve decision-making with predictive analytics'
    ],
    process: [
      'Business process assessment and mapping',
      'AI opportunity identification',
      'Custom solution development',
      'Integration with existing systems',
      'Training and implementation',
      'Ongoing support and optimization'
    ],
    useCases: [
      'Supply chain optimization',
      'Inventory management',
      'Customer service automation',
      'Financial forecasting',
      'HR process optimization',
      'Quality control'
    ],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1000&q=80',
  },
  'ai-assistants-for-enterprises': {
    title: 'AI Assistants for Enterprises',
    hero: 'Intelligent Assistants That Transform Your Business',
    description: 'Our enterprise AI assistants help your business automate customer interactions, streamline internal processes, and provide 24/7 support without human intervention.',
    benefits: [
      'Provide 24/7 customer and employee support',
      'Reduce support ticket volume by up to 40%',
      'Automate routine queries and tasks',
      'Improve customer satisfaction scores',
      'Reduce operational costs',
      'Scale support operations without adding headcount'
    ],
    process: [
      'Use case definition and requirements gathering',
      'Knowledge base development',
      'AI assistant design and training',
      'Integration with existing systems',
      'Deployment and testing',
      'Continuous improvement and maintenance'
    ],
    useCases: [
      'Customer support automation',
      'Internal IT help desk',
      'HR assistant for employee queries',
      'Sales assistant for lead qualification',
      'Operations assistant for process guidance',
      'Knowledge management assistant'
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
  },
  'ai-powered-web-app-development': {
    title: 'AI-Powered Web & App Development',
    hero: 'Next-Generation Applications Powered by AI',
    description: 'We build intelligent web applications and mobile apps that leverage the power of AI to provide personalized user experiences, smart automation, and valuable insights.',
    benefits: [
      'Create more engaging user experiences',
      'Personalize content and recommendations',
      'Automate complex processes',
      'Generate insights from user behavior',
      'Improve conversion rates',
      'Enable voice and natural language interfaces'
    ],
    process: [
      'Requirements analysis and planning',
      'UI/UX design with AI integration points',
      'Front-end and back-end development',
      'AI model integration and testing',
      'Deployment and performance optimization',
      'Maintenance and support'
    ],
    useCases: [
      'AI-powered customer portals',
      'Intelligent e-commerce platforms',
      'Smart content management systems',
      'Voice-enabled applications',
      'Personalized learning platforms',
      'AI-enhanced dashboards and analytics tools'
    ],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80',
  },
  'ai-content-generation': {
    title: 'AI & Content Generation',
    hero: 'Transform Your Content Strategy with AI',
    description: 'Our AI content generation services help businesses create high-quality, SEO-optimized content at scale, saving time and resources while improving engagement and conversions.',
    benefits: [
      'Create content 10x faster than traditional methods',
      'Ensure consistent brand voice across all channels',
      'Generate SEO-optimized content that ranks well',
      'Scale content production efficiently',
      'Reduce content creation costs',
      'Test multiple variations for optimal performance'
    ],
    process: [
      'Content strategy development',
      'Brand voice analysis and template creation',
      'AI model fine-tuning for your specific needs',
      'Content generation and human review',
      'SEO optimization and publishing',
      'Performance monitoring and improvement'
    ],
    useCases: [
      'Blog posts and articles',
      'Product descriptions',
      'Social media content',
      'Email marketing campaigns',
      'Ad copy and landing pages',
      'Technical documentation'
    ],
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1000&q=80',
  },
  'custom-ai-agent-development': {
    title: 'Custom AI Agent Development',
    hero: 'Purpose-Built AI Agents for Your Business',
    description: 'We develop specialized AI agents tailored to your industry and business requirements, automating complex tasks and providing intelligent assistance in your specific domain.',
    benefits: [
      'Automate industry-specific workflows',
      'Apply domain expertise at scale',
      'Improve decision-making with specialized AI',
      'Reduce errors in complex processes',
      'Enable 24/7 operation of specialized functions',
      'Gain competitive advantage through AI innovation'
    ],
    process: [
      'Domain and process analysis',
      'AI agent architecture design',
      'Knowledge base and training data development',
      'Agent development and training',
      'Integration and deployment',
      'Monitoring and continuous learning'
    ],
    useCases: [
      'Legal document analysis and contract review',
      'Medical diagnosis assistance',
      'Financial fraud detection',
      'Real estate valuation and analysis',
      'Scientific research assistance',
      'Regulatory compliance monitoring'
    ],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
  },
  'ai-consulting-training': {
    title: 'AI Consulting & Training',
    hero: 'Expert Guidance for Your AI Journey',
    description: 'Our consulting and training services help organizations develop an effective AI strategy, build internal capabilities, and successfully implement AI solutions across the business.',
    benefits: [
      'Develop a clear AI roadmap and strategy',
      'Build internal AI expertise and capabilities',
      'Identify high-impact AI opportunities',
      'Avoid common AI implementation pitfalls',
      'Accelerate AI adoption and time-to-value',
      'Ensure ethical and responsible AI use'
    ],
    process: [
      'AI readiness assessment',
      'Strategy development and opportunity mapping',
      'Custom training program development',
      'Workshop delivery and hands-on training',
      'Implementation guidance and support',
      'Ongoing advisory services'
    ],
    useCases: [
      'Executive AI strategy workshops',
      'Technical team AI training',
      'AI ethics and governance frameworks',
      'AI project management training',
      'Vendor selection and evaluation',
      'Change management for AI adoption'
    ],
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1000&q=80',
  }
};

export const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<any>(null);
  const [showBookCallModal, setShowBookCallModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (serviceId && servicesData[serviceId as keyof typeof servicesData]) {
      setService(servicesData[serviceId as keyof typeof servicesData]);
    }
    setTimeout(() => setLoading(false), 300);
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!service) return <div className="h-screen flex items-center justify-center">Service not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-monk/5 to-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">{service.title}</h1>
                <p className="text-2xl text-charcoal/80 mb-8">{service.hero}</p>
                <p className="text-lg text-charcoal/70 mb-8">{service.description}</p>
                <Button 
                  size="lg" 
                  className="bg-monk hover:bg-monk/90 text-white text-lg px-8 py-6"
                  onClick={() => setShowBookCallModal(true)}
                >
                  Book a Consultation
                </Button>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={service.image}
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.benefits.map((benefit: string, index: number) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <div className="flex items-start">
                    <div className="bg-monk/10 p-2 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-monk" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-lg text-charcoal/80">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Approach</h2>
            <div className="relative max-w-3xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-[25px] top-0 bottom-0 w-1 bg-monk/20 rounded-full hidden md:block"></div>
              
              {service.process.map((step: string, index: number) => (
                <div key={index} className="flex mb-8 items-start">
                  <div className="bg-monk text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 z-10">
                    {index + 1}
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6 ml-6 flex-1 border border-gray-100">
                    <p className="text-lg text-charcoal/80">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.useCases.map((useCase: string, index: number) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:bg-monk/5 transition-all duration-300">
                  <p className="text-lg text-charcoal font-medium">{useCase}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-semibold mb-4">Ready to transform your business with {service.title}?</h3>
              <Button 
                size="lg" 
                className="bg-monk hover:bg-monk/90 text-white text-lg mt-4"
                onClick={() => setShowBookCallModal(true)}
              >
                Book a Call
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <BookCallModal 
        isOpen={showBookCallModal} 
        onClose={() => setShowBookCallModal(false)} 
      />
    </div>
  );
};
