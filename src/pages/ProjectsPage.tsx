
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cog, Users, Code, MessageSquare, Lightbulb, Phone, ExternalLink } from 'lucide-react';
import { BookCallModal } from '@/components/BookCallModal';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const projectsData = [
  {
    title: "AI-Powered Customer Service Platform",
    category: "AI Assistants for Enterprises",
    description: "Developed an intelligent customer service platform that reduced response time by 65% and increased customer satisfaction ratings by 42%.",
    icon: Users,
    color: "bg-gold/10",
    iconColor: "text-gold",
    projectLink: "#"
  },
  {
    title: "Manufacturing Process Optimization",
    category: "AI Business Optimization",
    description: "Implemented AI algorithms that analyzed production data to identify inefficiencies, resulting in a 28% increase in output and 15% reduction in costs.",
    icon: Cog,
    color: "bg-monk/10",
    iconColor: "text-monk",
    projectLink: "#"
  },
  {
    title: "Content Marketing Automation System",
    category: "AI & Content Generation",
    description: "Created an AI-driven content generation system that produces SEO-optimized articles, increasing organic traffic by 87% and conversion rates by 35%.",
    icon: MessageSquare,
    color: "bg-monk/10",
    iconColor: "text-monk",
    projectLink: "#"
  },
  {
    title: "Intelligent Web Application Platform",
    category: "AI-Powered Web & App Development",
    description: "Developed a web platform with embedded AI capabilities for personalized user experiences, leading to a 53% increase in user engagement.",
    icon: Code,
    color: "bg-charcoal/10",
    iconColor: "text-charcoal",
    projectLink: "#"
  },
  {
    title: "Legal Document Analysis Tool",
    category: "Custom AI Agent Development",
    description: "Built a specialized AI agent that analyzes legal documents to extract critical information, reducing document review time by 75%.",
    icon: Lightbulb,
    color: "bg-gold/10",
    iconColor: "text-gold",
    projectLink: "#"
  },
  {
    title: "AI Implementation Training Program",
    category: "AI Consulting & Training",
    description: "Designed and delivered comprehensive AI training programs that enabled the client's team to independently manage their AI systems.",
    icon: Cog,
    color: "bg-charcoal/10",
    iconColor: "text-charcoal",
    projectLink: "#"
  },
];

const ProjectsPage = () => {
  const [showBookCallModal, setShowBookCallModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animate projects entrance
    const timeout = setTimeout(() => {
      const indices = Array.from({ length: projectsData.length }, (_, i) => i);
      setVisibleProjects(indices);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 bg-white dark:bg-charcoal">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4 font-serif text-charcoal dark:text-white">Featured Projects</h1>
            <p className="text-lg text-charcoal/70 dark:text-white/70 max-w-3xl mx-auto">
              Explore our portfolio of successful AI implementations that have delivered measurable results for our clients across various industries.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={visibleProjects.includes(index) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card 
                  className={`transition-all duration-300 border border-gray-100 dark:border-gray-700 dark:bg-charcoal/30 shadow-sm ${hoveredCard === index ? 'shadow-lg transform -translate-y-1' : 'hover:shadow-md'}`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-lg inline-block ${project.color} mb-4`}>
                        <project.icon className={`w-6 h-6 ${project.iconColor} dark:text-gold`} />
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-monk text-monk hover:bg-monk hover:text-white dark:border-gold dark:text-gold dark:hover:bg-gold dark:hover:text-charcoal"
                        asChild
                      >
                        <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                          Explore <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                    <CardTitle className="text-xl font-semibold dark:text-white">{project.title}</CardTitle>
                    <CardDescription className="text-monk dark:text-gold font-medium">{project.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-charcoal/80 dark:text-white/70">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              className="bg-monk hover:bg-monk/90 text-white dark:bg-gold dark:hover:bg-gold/90 dark:text-charcoal"
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
