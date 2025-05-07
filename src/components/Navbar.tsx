
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { BookCallModal } from './BookCallModal';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBookCallModal, setShowBookCallModal] = useState(false);
  const [pageYOffset, setPageYOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setPageYOffset(currentScrollY);
      
      if (currentScrollY > 50) {
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

  // Always show mobile menu button
  const showMobileMenu = true;

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png" 
              alt="The Machine Monk" 
              className="h-12 w-auto" 
            />
            <span className={`font-bold text-xl ${scrolled ? 'text-charcoal dark:text-white' : 'text-charcoal dark:text-white'}`}>
              The Machine Monk
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`font-medium ${scrolled ? 'text-charcoal dark:text-white' : 'text-charcoal dark:text-white'} hover:text-monk transition-colors`}>Home</Link>
            <Link to="/about" className={`font-medium ${scrolled ? 'text-charcoal dark:text-white' : 'text-charcoal dark:text-white'} hover:text-monk transition-colors`}>About Us</Link>
            <Link to="/projects" className={`font-medium ${scrolled ? 'text-charcoal dark:text-white' : 'text-charcoal dark:text-white'} hover:text-monk transition-colors`}>Projects</Link>
            <Link to="/faqs" className={`font-medium ${scrolled ? 'text-charcoal dark:text-white' : 'text-charcoal dark:text-white'} hover:text-monk transition-colors`}>FAQs</Link>
            <ThemeToggle />
            <Button 
              variant="outline" 
              className="bg-transparent border-monk text-monk hover:bg-monk hover:text-white transition-all dark:border-monk dark:text-monk"
              onClick={() => setShowBookCallModal(true)}
            >
              <Phone className="w-4 h-4 mr-2" /> Book a Call
            </Button>
          </nav>

          {/* Mobile Menu Button - Always show */}
          {showMobileMenu && (
            <button 
              className="md:hidden text-charcoal dark:text-white bg-white/90 dark:bg-gray-800/90 p-2 rounded-md" 
              onClick={toggleMenu} 
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-white/95 dark:bg-gray-900/98 z-40 pt-20 px-6 md:hidden transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col space-y-6 text-lg">
            <Link 
              to="/" 
              className="text-charcoal dark:text-white hover:text-monk transition-colors py-2 border-b border-gray-100 dark:border-gray-700"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-charcoal dark:text-white hover:text-monk transition-colors py-2 border-b border-gray-100 dark:border-gray-700"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link 
              to="/projects" 
              className="text-charcoal dark:text-white hover:text-monk transition-colors py-2 border-b border-gray-100 dark:border-gray-700"
              onClick={closeMenu}
            >
              Projects
            </Link>
            <Link 
              to="/faqs" 
              className="text-charcoal dark:text-white hover:text-monk transition-colors py-2 border-b border-gray-100 dark:border-gray-700"
              onClick={closeMenu}
            >
              FAQs
            </Link>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-charcoal dark:text-white">Dark Mode</span>
              <ThemeToggle />
            </div>
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
