
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="bg-monk text-white p-3 rounded-full shadow-lg hover:bg-monk/90 transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};
