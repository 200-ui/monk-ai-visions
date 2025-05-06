
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "What AI services does The Machine Monk offer?",
    answer: "We offer a comprehensive range of AI services including AI Business Optimization, Enterprise AI Assistants, AI-Powered Web & App Development, AI & Content Generation, Custom AI Agent Development, and AI Consulting & Training."
  },
  {
    question: "How can AI improve my business operations?",
    answer: "AI can automate repetitive tasks, analyze large datasets to uncover insights, optimize decision-making processes, enhance customer experiences through personalization, and create new revenue opportunities through innovation."
  },
  {
    question: "What industries do you work with?",
    answer: "We work with clients across various industries including healthcare, finance, retail, manufacturing, education, and technology. Our AI solutions are adaptable to the unique challenges of each sector."
  },
  {
    question: "How long does it typically take to implement an AI solution?",
    answer: "Implementation timelines vary based on the complexity of the project, but typically range from 4-12 weeks. We follow a structured process of discovery, design, development, and deployment to ensure efficient delivery."
  },
  {
    question: "Do I need technical expertise to work with The Machine Monk?",
    answer: "No technical expertise is required. We handle all technical aspects while ensuring you're involved in strategic decisions. Our approach focuses on making AI accessible and understandable to all stakeholders."
  },
  {
    question: "How do you ensure the privacy and security of our data?",
    answer: "We implement robust security protocols including encryption, secure authentication, and regular security audits. All client data is handled according to industry best practices and compliance regulations."
  },
  {
    question: "What is your approach to AI ethics?",
    answer: "We prioritize ethical considerations in all our AI implementations, focusing on transparency, fairness, accountability, and privacy. We work with clients to establish ethical guidelines specific to their use cases."
  },
  {
    question: "How do you measure the success of AI implementations?",
    answer: "We establish clear KPIs at the outset of each project, which may include efficiency gains, cost reductions, revenue increases, customer satisfaction improvements, or other metrics relevant to your business objectives."
  },
  {
    question: "What ongoing support do you provide after implementation?",
    answer: "We offer various support options including monitoring, maintenance, updates, and training programs. Our team remains available to address any questions or issues that arise post-implementation."
  },
  {
    question: "How can we get started with The Machine Monk?",
    answer: "Book a call with our team through the 'Book a Call' button on our website. During this initial consultation, we'll discuss your needs, explore potential AI solutions, and outline the next steps for collaboration."
  }
];

const FaqsPage = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add animation to elements when page loads
    const timer = setTimeout(() => {
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate-fade-in');
        }, index * 100);
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFaqs(faqs);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredFaqs(
        faqs.filter(
          faq => 
            faq.question.toLowerCase().includes(query) || 
            faq.answer.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-charcoal">
      <Navbar />
      <main className="flex-grow pt-24 bg-white dark:bg-charcoal">
        <div className="container mx-auto px-4 py-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-6 font-serif text-charcoal dark:text-white"
          >
            Frequently Asked Questions
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-10"
          >
            <p className="text-center text-charcoal/80 dark:text-white/80 mb-6">
              Find answers to common questions about our AI services and implementation process.
            </p>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full p-3 pl-10 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-monk dark:bg-charcoal/60 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length > 0 ? (
              <Accordion 
                type="single" 
                collapsible 
                className="space-y-4"
                value={expandedIndex !== null ? `item-${expandedIndex}` : undefined}
                onValueChange={(value) => 
                  setExpandedIndex(value ? parseInt(value.split('-')[1]) : null)
                }
              >
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="faq-item opacity-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-charcoal/50 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="px-4 py-3 font-medium text-monk hover:text-monk/80 hover:no-underline">
                      <div className="flex items-center text-left">
                        <span className="mr-3 font-mono bg-monk/10 dark:bg-monk/20 h-7 w-7 flex items-center justify-center rounded-full text-sm">
                          {index + 1}
                        </span>
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-charcoal/80 dark:text-white/80">
                      <div className="pl-10">
                        <div className="h-0.5 w-10 bg-monk/30 mb-3"></div>
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-10">
                <p className="text-charcoal/70 dark:text-white/70">No FAQs match your search. Try a different term.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaqsPage;
