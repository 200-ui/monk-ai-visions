
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BookCallModal } from '@/components/BookCallModal';
import { useState } from 'react';

// Project categories
const categories = ["All", "AI Business", "AI Assistants", "Web Development", "Content", "Custom AI"];

// Project data (placeholder)
const projects = [
  {
    id: 1,
    title: "E-commerce AI Assistant",
    description: "Intelligent customer service automation for a leading e-commerce platform, reducing support costs by 35% while improving customer satisfaction.",
    category: "AI Assistants",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Supply Chain Optimization System",
    description: "Advanced AI solution for inventory and logistics optimization, resulting in 22% reduction in holding costs and 18% improvement in delivery times.",
    category: "AI Business",
    image: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "AI-Powered Healthcare Platform",
    description: "Intelligent health management system with personalized recommendations and medical report analysis for improved patient outcomes.",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Financial Advisory AI",
    description: "Custom AI agent for investment analysis and portfolio management, providing personalized recommendations based on market trends.",
    category: "Custom AI",
    image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "AI Content Strategy",
    description: "Comprehensive content generation system for multi-channel marketing, increasing engagement by 45% and conversion rates by 28%.",
    category: "Content",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    title: "Manufacturing Process Optimization",
    description: "AI-driven quality control and process optimization system, reducing defects by 32% and improving production efficiency.",
    category: "AI Business",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1000&q=80",
  },
];

export const FeaturedProjects = () => {
  const [showBookCallModal, setShowBookCallModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-monk/5 to-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">Featured Projects</h1>
            <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
              Explore our portfolio of successful AI implementations across various industries and use cases.
            </p>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full text-lg transition-colors ${
                    activeCategory === category 
                      ? 'bg-monk text-white' 
                      : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="h-60 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-monk/10 text-monk text-sm font-medium mb-4">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-charcoal/70 mb-4">{project.description}</p>
                    {/* Case study button would link to specific case study page */}
                    <Button className="w-full bg-charcoal hover:bg-charcoal/90 text-white">
                      View Case Study
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-charcoal/70">No projects found in this category.</p>
              </div>
            )}
            
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-semibold mb-4">Want to discuss your project?</h3>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto mb-8">
                Let's talk about how our AI solutions can transform your business and drive real results.
              </p>
              <Button 
                size="lg" 
                className="bg-monk hover:bg-monk/90 text-white text-lg"
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
