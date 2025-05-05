
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsVisible(false);
            }, 300);
            return 100;
          }
          return prevProgress + 5;
        });
      }, 50);

      return () => clearInterval(interval);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <img 
        src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png" 
        alt="The Machine Monk" 
        className="w-28 h-28 mb-6 animate-pulse-slow"
      />
      <Progress value={progress} className="w-64 h-2 bg-gray-100" indicatorClassName="bg-monk" />
    </div>
  );
};
