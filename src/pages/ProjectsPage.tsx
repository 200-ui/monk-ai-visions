
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cog, Users, Code, MessageSquare, Lightbulb, Phone } from 'lucide-react';
import { BookCallModal } from '@/components/BookCallModal';
import { useState, useEffect } from 'react';

const projectsData = [
  {
    title: "AI-Powered Customer Service Platform",
    category: "AI Assistants for Enterprises",
    description: "Developed an intelligent customer service platform that reduced response time by 65% and increased customer satisfaction ratings by 42%.",
    icon: Users,
    color: "bg-gold/10",
    iconColor: "text-gold",
  },
  {
    title: "Manufacturing Process Optimization",
    category: "AI Business Optimization",
    description: "Implemented AI algorithms that analyzed production data to identify inefficiencies, resulting in a 28% increase in output and 15% reduction in costs.",
    icon: Cog,
    color: "bg-monk/10",
    iconColor: "text-monk",
  },
  {
    title: "Content Marketing Automation System",
    category: "AI & Content Generation",
    description: "Created an AI-driven content generation system that produces SEO-optimized articles, increasing organic traffic by 87% and conversion rates by 35%.",
    icon: MessageSquare,
    color: "bg-monk/10",
    iconColor: "text-monk",
  },
  {
    title: "Intelligent Web Application Platform",
    category: "AI-Powered Web & App Development",
    description: "Developed a web platform with embedded AI capabilities for personalized user experiences, leading to a 53% increase in user engagement.",
    icon: Code,
    color: "bg-charcoal/10",
    iconColor: "text-charcoal dark:text-white/70",
  },
  {
    title: "Legal Document Analysis Tool",
    category: "Custom AI Agent Development",
    description: "Built a specialized AI agent that analyzes legal documents to extract critical information, reducing document review time by 75%.",
    icon: Lightbulb,
    color: "bg-gold/10",
    iconColor: "text-gold",
  },
  {
    title: "AI Implementation Training Program",
    category: "AI Consulting & Training",
    description: "Designed and delivered comprehensive AI training programs that enabled the client's team to independently manage their AI systems.",
    icon: Cog,
    color: "bg-charcoal/10",
    iconColor: "text-charcoal dark:text-white/70",
  },
];

const ProjectsPage = () => {
  const [showBookCallModal, setShowBookCallModal] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark:bg-charcoal dark:text-white">
      <Navbar />
      <main className="flex-grow pt-24 bg-white dark:bg-charcoal">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 font-serif text-charcoal dark:text-white">Featured Projects</h1>
            <p className="text-lg text-charcoal/70 dark:text-white/70 max-w-3xl mx-auto">
              Explore our portfolio of successful AI implementations that have delivered measurable results for our clients across various industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projectsData.map((project, index) => (
              <Card 
                key={index} 
                className={`transition-all duration-500 border border-gray-100 dark:border-gray-700 dark:bg-charcoal/50 shadow-sm hover:shadow-md group ${
                  activeProjectIndex === index ? 'scale-105 shadow-lg' : ''
                }`}
                onMouseEnter={() => setActiveProjectIndex(index)}
                onMouseLeave={() => setActiveProjectIndex(null)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg inline-block ${project.color} transition-transform duration-300 group-hover:scale-110`}>
                      <project.icon className={`w-6 h-6 ${project.iconColor}`} />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-monk hover:text-monk/80 hover:bg-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => alert(`Explore project: ${project.title}`)}
                    >
                      Explore
                    </Button>
                  </div>
                  <CardTitle className="text-xl font-semibold dark:text-white">{project.title}</CardTitle>
                  <CardDescription className="text-monk dark:text-monk/90 font-medium">{project.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-charcoal/80 dark:text-white/70 group-hover:text-charcoal dark:group-hover:text-white transition-colors">
                    {project.description}
                  </p>
                  <div className={`mt-4 overflow-hidden transition-all duration-300 ${activeProjectIndex === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="h-1 w-12 bg-monk mb-3"></div>
                    <p className="text-sm text-charcoal/70 dark:text-white/60">
                      Click "Explore" to see the full project details.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              className="bg-monk hover:bg-monk/90 text-white"
              onClick={() => setShowBookCallModal(true)}
            >
              <Phone className="mr-2 h-4 w-4" /> Discuss Your Project
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      
      <BookCallModal 
        isOpen={showBookCallModal} 
        onClose={() => setShowBookCallModal(false)} 
      />
    </div>
  );
};

export default ProjectsPage;
