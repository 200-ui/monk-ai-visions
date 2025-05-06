
import { useState, useEffect } from 'react';

export const LoadingAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [dots, setDots] = useState<Array<{ angle: number; opacity: number }>>([]);

  useEffect(() => {
    // Create 12 dots in a circle
    const newDots = Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      opacity: Math.random() * 0.5 + 0.5
    }));
    setDots(newDots);

    // Hide the loading screen after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-charcoal z-50">
      <div className="relative w-32 h-32">
        {dots.map((dot, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-monk"
            style={{
              left: `calc(50% + ${Math.cos(dot.angle) * 60}px)`,
              top: `calc(50% + ${Math.sin(dot.angle) * 60}px)`,
              opacity: dot.opacity,
              animation: `pulse ${0.8 + i * 0.1}s infinite alternate`
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png" 
            alt="The Machine Monk"
            className="w-24 h-24"
          />
        </div>
      </div>
    </div>
  );
};
