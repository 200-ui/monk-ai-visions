
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cog, Users, Code, MessageSquare, Lightbulb, Phone, ExternalLink } from 'lucide-react';
import { BookCallModal } from '@/components/BookCallModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Project = {
  title: string;
  category: string;
  description: string;
  icon: any;
  color: string;
  iconColor: string;
  link?: string;
  details?: string;
};

const projectsData: Project[] = [
  {
    title: "AI-Powered Customer Service Platform",
    category: "AI Assistants for Enterprises",
    description: "Developed an intelligent customer service platform that reduced response time by 65% and increased customer satisfaction ratings by 42%.",
    icon: Users,
    color: "bg-gold/10",
    iconColor: "text-gold",
    link: "#",
    details: "Our AI-powered customer service solution integrates natural language processing to understand customer queries and machine learning to continuously improve response accuracy. The platform includes sentiment analysis to gauge customer emotions and route complex issues to human agents when necessary."
  },
  {
    title: "Manufacturing Process Optimization",
    category: "AI Business Optimization",
    description: "Implemented AI algorithms that analyzed production data to identify inefficiencies, resulting in a 28% increase in output and 15% reduction in costs.",
    icon: Cog,
    color: "bg-monk/10",
    iconColor: "text-monk",
    link: "#",
    details: "By collecting and analyzing data from IoT sensors throughout the manufacturing process, our AI system identified bottlenecks and optimization opportunities. The solution provides real-time dashboards and predictive maintenance alerts to prevent costly downtime."
  },
  {
    title: "Content Marketing Automation System",
    category: "AI & Content Generation",
    description: "Created an AI-driven content generation system that produces SEO-optimized articles, increasing organic traffic by 87% and conversion rates by 35%.",
    icon: MessageSquare,
    color: "bg-monk/10",
    iconColor: "text-monk",
    link: "#",
    details: "Our content generation platform uses advanced language models to create engaging, original content tailored to specific industries and audiences. The system analyzes trending topics, competitor content, and SEO data to ensure maximum visibility and engagement."
  },
  {
    title: "Intelligent Web Application Platform",
    category: "AI-Powered Web & App Development",
    description: "Developed a web platform with embedded AI capabilities for personalized user experiences, leading to a 53% increase in user engagement.",
    icon: Code,
    color: "bg-charcoal/10 dark:bg-gold/10",
    iconColor: "text-charcoal dark:text-gold",
    link: "#",
    details: "This web platform features personalized content recommendations, dynamic UI elements that adapt to user behavior, and intelligent search functionality. By analyzing user interactions in real-time, the system continuously optimizes the user experience."
  },
  {
    title: "Legal Document Analysis Tool",
    category: "Custom AI Agent Development",
    description: "Built a specialized AI agent that analyzes legal documents to extract critical information, reducing document review time by 75%.",
    icon: Lightbulb,
    color: "bg-gold/10",
    iconColor: "text-gold",
    link: "#",
    details: "Our legal document analysis tool uses natural language processing to identify key clauses, potential risks, and inconsistencies across large volumes of contracts and legal documents. The system provides detailed reports and highlights areas requiring human review."
  },
  {
    title: "AI Implementation Training Program",
    category: "AI Consulting & Training",
    description: "Designed and delivered comprehensive AI training programs that enabled the client's team to independently manage their AI systems.",
    icon: Cog,
    color: "bg-charcoal/10 dark:bg-gold/10",
    iconColor: "text-charcoal dark:text-gold",
    link: "#",
    details: "The training program covers AI fundamentals, implementation strategies, and ongoing management techniques tailored to the client's specific industry and needs. Participants learn through hands-on workshops and real-world case studies."
  },
];

const ProjectsPage = () => {
  const [showBookCallModal, setShowBookCallModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow pt-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 font-serif text-charcoal dark:text-white">Featured Projects</h1>
            <p className="text-lg text-charcoal/70 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our portfolio of successful AI implementations that have delivered measurable results for our clients across various industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projectsData.map((project, index) => (
              <Card 
                key={index} 
                className="project-card overflow-hidden dark:bg-gray-800 dark:text-white dark:border-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <CardHeader>
                  <div className={`p-3 rounded-lg inline-block ${project.color} mb-4 dark:bg-opacity-30`}>
                    <project.icon className={`w-6 h-6 ${project.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
                  <CardDescription className="text-monk dark:text-monk/90 font-medium">{project.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-charcoal/80 dark:text-gray-300 mb-6">
                    {project.description}
                  </p>
                  <div className="flex justify-end">
                    <Button 
                      className="bg-monk hover:bg-monk/90 text-white"
                      onClick={() => setSelectedProject(project)}
                    >
                      Explore <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
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

      <Dialog 
        open={selectedProject !== null} 
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-3xl dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-monk">{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-lg ${selectedProject?.color} dark:bg-opacity-30 mr-4`}>
                {selectedProject?.icon && <selectedProject.icon className={`w-6 h-6 ${selectedProject.iconColor}`} />}
              </div>
              <span className="font-semibold text-monk">{selectedProject?.category}</span>
            </div>
            <p className="mb-6 text-charcoal/80 dark:text-gray-300">
              {selectedProject?.description}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Project Details</h3>
              <p className="text-charcoal/80 dark:text-gray-300">{selectedProject?.details}</p>
            </div>
            <div className="flex justify-between items-center">
              {selectedProject?.link && (
                <Button 
                  variant="outline" 
                  className="border-monk text-monk hover:bg-monk hover:text-white dark:text-white dark:border-monk"
                  onClick={() => window.open(selectedProject.link, '_blank')}
                >
                  View Live Project <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
              <Button 
                className="bg-monk hover:bg-monk/90 text-white ml-auto"
                onClick={() => {
                  setSelectedProject(null);
                  setShowBookCallModal(true);
                }}
              >
                <Phone className="mr-2 h-4 w-4" /> Request Similar Solution
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;
