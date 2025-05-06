
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

<lov-add-dependency>framer-motion@latest</lov-add-dependency>

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(
        faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  }, [searchQuery]);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow pt-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 font-serif text-charcoal dark:text-white">
            Frequently Asked Questions
          </h1>
          
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-monk focus:border-transparent transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <svg
                className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <AnimatePresence>
              {filteredFaqs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <p className="text-gray-500 dark:text-gray-400">No matching questions found. Try a different search term.</p>
                </motion.div>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="mb-4"
                  >
                    <motion.div
                      className={`border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm faq-hover dark:bg-gray-800 dark:border-gray-700 ${
                        activeIndex === index ? 'ring-2 ring-monk' : ''
                      }`}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <button
                        className="w-full text-left px-6 py-4 flex justify-between items-center"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={activeIndex === index}
                      >
                        <h3 className="font-medium text-monk text-lg dark:text-monk">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: activeIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-5 w-5 text-monk" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-4 text-charcoal/80 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-4">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaqsPage;
