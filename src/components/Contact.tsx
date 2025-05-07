
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Message sent successfully!');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setIsSubmitted(false);
      }, 2000);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll opacity-0 transition-all duration-700">
          <h2 className="section-title dark:text-white">Contact Us</h2>
          <p className="text-charcoal/70 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to transform your business with AI? Get in touch with our team of experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="animate-on-scroll opacity-0 transition-all duration-700">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 monk-border inline-block dark:text-white">Send us a message</h3>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
                  <CheckCircle className="text-monk w-16 h-16 mb-4" />
                  <h4 className="text-xl font-semibold text-charcoal dark:text-white">Message Sent!</h4>
                  <p className="text-center text-muted-foreground dark:text-gray-300 mt-2">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus-visible:ring-monk dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus-visible:ring-monk dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="focus-visible:ring-monk resize-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-monk hover:bg-monk/90 text-white btn-hover w-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="animate-on-scroll opacity-0 transition-all duration-700 delay-300">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 monk-border inline-block dark:text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-monk/10 p-3 rounded-lg mr-4">
                    <Mail className="text-monk w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal dark:text-white">Email Us</h4>
                    <p className="text-charcoal/70 dark:text-gray-300 mt-1">info@themachinemonk.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-monk/10 p-3 rounded-lg mr-4">
                    <Phone className="text-monk w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal dark:text-white">Call Us</h4>
                    <p className="text-charcoal/70 dark:text-gray-300 mt-1">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-monk/10 p-3 rounded-lg mr-4">
                    <MapPin className="text-monk w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal dark:text-white">Visit Us</h4>
                    <p className="text-charcoal/70 dark:text-gray-300 mt-1">123 AI Avenue, Tech City<br/>Innovation District, CA 94103</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <h4 className="font-medium text-charcoal dark:text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {['twitter', 'facebook', 'linkedin', 'instagram'].map((platform) => (
                    <a 
                      key={platform} 
                      href={`https://${platform}.com`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-monk/10 hover-scale p-3 rounded-full transition-colors"
                    >
                      <img 
                        src={`https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/${platform}.svg`} 
                        alt={platform} 
                        className="w-5 h-5 opacity-70"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
