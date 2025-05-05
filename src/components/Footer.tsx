
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Facebook, Twitter, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';

export const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = new FormData(form).get('email') as string;
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    
    toast.success('Thank you for subscribing!');
    form.reset();
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png" 
                alt="The Machine Monk" 
                className="h-12 w-auto" 
              />
              <span className="font-bold text-xl">
                The Machine Monk
              </span>
            </div>
            <p className="text-gray-300 mt-4">
              Empowering businesses with the wisdom of AI. Innovative solutions for the modern enterprise.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-300 hover:text-monk transition-colors hover-scale">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-monk transition-colors hover-scale">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-monk transition-colors hover-scale">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-monk transition-colors hover-scale">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-monk transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-monk transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-monk transition-colors">Services</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-monk transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-monk transition-colors">AI Business Optimization</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-monk transition-colors">AI Assistants</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-monk transition-colors">Web & App Development</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-monk transition-colors">AI Consulting</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Newsletter</h3>
            <p className="text-gray-300 mb-4">Stay updated with our latest news and offers.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                type="email" 
                name="email"
                placeholder="Your email" 
                className="bg-charcoal-light border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-monk"
              />
              <Button type="submit" className="bg-monk hover:bg-monk/90 text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} The Machine Monk. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
