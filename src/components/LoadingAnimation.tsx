
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

export const LoadingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
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
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="relative w-32 h-32 mb-6 animate-pulse-slow">
        <img 
          src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png" 
          alt="The Machine Monk"
          className="w-full h-full"
        />
      </div>
      <div className="w-64 mb-4">
        <Progress value={progress} className="h-2" />
      </div>
      <p className="text-monk font-medium">{progress}%</p>
    </div>
  );
};
