
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
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animate FAQs entrance
    const timeout = setTimeout(() => {
      const indices = Array.from({ length: faqs.length }, (_, i) => i);
      setVisibleItems(indices);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, []);

  const handleToggle = (value: string) => {
    setExpandedItem(expandedItem === value ? null : value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-charcoal">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <motion.h1 
            className="text-4xl font-bold text-center mb-12 font-serif text-charcoal dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <div className="max-w-3xl mx-auto">
            <Accordion 
              type="single" 
              collapsible 
              className="space-y-4"
              value={expandedItem || undefined}
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-charcoal/30 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger 
                      onClick={() => handleToggle(`item-${index}`)}
                      className="px-4 py-3 font-medium text-monk dark:text-gold hover:text-monk/80 dark:hover:text-gold/80 hover:no-underline group"
                    >
                      <div className="flex items-center">
                        <motion.div 
                          animate={expandedItem === `item-${index}` ? { rotate: 90 } : { rotate: 0 }}
                          className="mr-2 text-monk dark:text-gold"
                        >
                          →
                        </motion.div>
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-charcoal/80 dark:text-white/80">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.answer}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaqsPage;
