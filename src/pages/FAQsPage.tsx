
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookCallModal } from '@/components/BookCallModal';

const faqCategories = [
  {
    category: "General",
    questions: [
      {
        question: "What is The Machine Monk?",
        answer: "The Machine Monk is an AI agency that specializes in helping businesses leverage artificial intelligence to optimize operations, enhance customer experiences, and drive growth. We blend cutting-edge AI technology with strategic business insights to deliver innovative solutions."
      },
      {
        question: "How can AI benefit my business?",
        answer: "AI can benefit your business in numerous ways, including automating repetitive tasks, generating data-driven insights, personalizing customer experiences, optimizing operations, reducing costs, improving decision-making, and creating new revenue streams through innovative products and services."
      },
      {
        question: "Do you work with businesses of all sizes?",
        answer: "Yes, we work with organizations of all sizes, from startups to large enterprises. Our solutions are scalable and can be tailored to meet the specific needs and budget constraints of your business."
      },
      {
        question: "What industries do you specialize in?",
        answer: "While our AI solutions can be applied across various industries, we have particular expertise in healthcare, finance, retail, manufacturing, legal, and technology sectors. Our team has experience developing specialized AI applications for these domains."
      }
    ]
  },
  {
    category: "Services",
    questions: [
      {
        question: "What services does The Machine Monk offer?",
        answer: "We offer a comprehensive range of AI services including AI Business Optimization, AI Assistants for Enterprises, AI-Powered Web & App Development, AI & Content Generation, Custom AI Agent Development, and AI Consulting & Training."
      },
      {
        question: "How long does it typically take to implement an AI solution?",
        answer: "The timeline varies depending on the complexity of the project. Simple AI implementations might take a few weeks, while more complex, enterprise-wide solutions could take several months. During our initial consultation, we'll provide a more specific timeline based on your project requirements."
      },
      {
        question: "Do you offer ongoing support after implementing an AI solution?",
        answer: "Yes, we provide ongoing support, maintenance, and optimization services for all our AI solutions. We believe in building long-term partnerships with our clients and ensuring that their AI systems continue to deliver value over time."
      },
      {
        question: "Can you integrate AI with our existing systems?",
        answer: "Absolutely. We specialize in integrating AI solutions with existing systems and workflows. Our team has experience working with various technology stacks and can ensure a seamless integration with your current infrastructure."
      }
    ]
  },
  {
    category: "Technology",
    questions: [
      {
        question: "What AI technologies do you work with?",
        answer: "We work with a wide range of AI technologies including machine learning, deep learning, natural language processing, computer vision, reinforcement learning, and generative AI. We select the most appropriate technologies based on your specific business needs and use case."
      },
      {
        question: "Do I need to have technical expertise to work with you?",
        answer: "No, you don't need to have technical expertise. Our team will guide you through the entire process and explain complex concepts in simple terms. We focus on understanding your business objectives and then translate those into technical requirements."
      },
      {
        question: "How do you ensure the quality and reliability of your AI solutions?",
        answer: "We follow rigorous development and testing processes to ensure the quality and reliability of our AI solutions. This includes extensive data validation, model testing, performance benchmarking, and continuous monitoring after deployment."
      },
      {
        question: "How do you address ethical concerns and biases in AI?",
        answer: "We take AI ethics very seriously. Our development process includes steps to identify and mitigate potential biases in data and models. We also prioritize transparency, fairness, and accountability in all our AI implementations and can help clients develop ethical AI governance frameworks."
      }
    ]
  },
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I get started with The Machine Monk?",
        answer: "Getting started is easy! Simply book a call with our team using the button below. During this initial consultation, we'll discuss your business challenges, objectives, and how AI might help. There's no obligation, and we'll provide you with initial recommendations."
      },
      {
        question: "Do you offer a free consultation?",
        answer: "Yes, we offer a free initial consultation to understand your business needs and explore how our AI solutions might help. This consultation helps us determine if there's a good fit between your requirements and our capabilities."
      },
      {
        question: "What information should I prepare for our first meeting?",
        answer: "To make the most of our initial consultation, it's helpful to think about the business challenges you're trying to solve, any relevant data you have, current processes that might benefit from AI, and your goals for implementing AI. Don't worry if you don't have all the answers – we're here to guide you."
      },
      {
        question: "What are your pricing models?",
        answer: "Our pricing varies depending on the scope and complexity of your project. We offer flexible pricing models including project-based fixed price, time and materials, and retainer arrangements. During our consultation, we'll discuss your requirements and provide transparent pricing information."
      }
    ]
  }
];

export const FAQsPage = () => {
  const [showBookCallModal, setShowBookCallModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("General");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-monk/5 to-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">Frequently Asked Questions</h1>
            <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
              Find answers to common questions about our AI services and how we can help transform your business.
            </p>
          </div>
        </section>
        
        {/* FAQs Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Category Navigation */}
              <div className="md:w-1/4">
                <div className="sticky top-32 bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {faqCategories.map((cat) => (
                      <button
                        key={cat.category}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          activeCategory === cat.category 
                            ? 'bg-monk text-white' 
                            : 'hover:bg-gray-100 text-charcoal'
                        }`}
                        onClick={() => setActiveCategory(cat.category)}
                      >
                        {cat.category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* FAQ Content */}
              <div className="md:w-3/4">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">{activeCategory} Questions</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {faqCategories
                      .find(cat => cat.category === activeCategory)
                      ?.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-lg font-medium text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-charcoal/80 text-lg">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto mb-8">
                If you couldn't find the answer to your question, feel free to contact us directly. Our team is always happy to help.
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
