
import { useState, useEffect } from 'react';

export const LoadingAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animation duration of 2 seconds
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        const newProgress = oldProgress + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Hide the loading screen after 100%
          setTimeout(() => setIsVisible(false), 300);
          return 100;
        }
        return newProgress;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-charcoal z-50 transition-all duration-300">
      <div className="relative w-32 h-32 mb-6">
        <img 
          src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png" 
          alt="The Machine Monk"
          className="w-full h-full"
        />
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="#E67E22" 
            strokeWidth="2" 
            strokeDasharray="283" 
            strokeDashoffset={283 - (283 * progress) / 100} 
            className="transition-all duration-200"
          />
        </svg>
      </div>
    </div>
  );
};
