
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { BookCallModal } from './BookCallModal';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBookCallModal, setShowBookCallModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (id: string) => {
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png" 
              alt="The Machine Monk" 
              className="h-14 w-auto" 
            />
            <span className={`font-bold text-2xl ${scrolled ? 'text-charcoal' : 'text-monk'}`}>
              The Machine Monk
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`font-medium ${scrolled ? 'text-charcoal' : 'text-charcoal'} hover:text-monk transition-colors`}>Home</Link>
            <Link to="/about" className={`font-medium ${scrolled ? 'text-charcoal' : 'text-charcoal'} hover:text-monk transition-colors`}>About Us</Link>
            <a 
              href="#services" 
              onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
              className={`font-medium ${scrolled ? 'text-charcoal' : 'text-charcoal'} hover:text-monk transition-colors cursor-pointer`}
            >
              Services
            </a>
            <Link to="/projects" className={`font-medium ${scrolled ? 'text-charcoal' : 'text-charcoal'} hover:text-monk transition-colors`}>Featured Projects</Link>
            <Link to="/faqs" className={`font-medium ${scrolled ? 'text-charcoal' : 'text-charcoal'} hover:text-monk transition-colors`}>FAQs</Link>
            <Button 
              variant="outline" 
              className="bg-transparent border-monk text-monk hover:bg-monk hover:text-white transition-all"
              onClick={() => setShowBookCallModal(true)}
            >
              <Phone className="w-4 h-4 mr-2" /> Book a Call
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-charcoal" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-white z-40 pt-20 px-6 md:hidden transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col space-y-6 text-lg">
            <Link 
              to="/" 
              className="text-charcoal hover:text-monk transition-colors py-2 border-b border-gray-100"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-charcoal hover:text-monk transition-colors py-2 border-b border-gray-100"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <a 
              href="#services" 
              onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
              className="text-charcoal hover:text-monk transition-colors py-2 border-b border-gray-100"
            >
              Services
            </a>
            <Link 
              to="/projects" 
              className="text-charcoal hover:text-monk transition-colors py-2 border-b border-gray-100"
              onClick={closeMenu}
            >
              Featured Projects
            </Link>
            <Link 
              to="/faqs" 
              className="text-charcoal hover:text-monk transition-colors py-2 border-b border-gray-100"
              onClick={closeMenu}
            >
              FAQs
            </Link>
            <Button 
              variant="default" 
              className="bg-monk text-white hover:bg-monk/90 transition-all mt-4 w-full"
              onClick={() => {
                setShowBookCallModal(true);
                closeMenu();
              }}
            >
              <Phone className="w-4 h-4 mr-2" /> Book a Call
            </Button>
          </div>
        </div>
      </header>

      <BookCallModal 
        isOpen={showBookCallModal} 
        onClose={() => setShowBookCallModal(false)} 
      />
    </>
  );
};
