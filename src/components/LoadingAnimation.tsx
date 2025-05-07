
import { useState, useEffect, useRef } from 'react';

export const LoadingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check the current theme before rendering
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else if (prefersDark) {
      setIsDarkMode(prefersDark);
    }
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Make sure canvas dimensions match its display size
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    resize();
    
    const startTime = Date.now();
    const duration = 2000; // 2 seconds for the full circle
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw progress circle
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 70;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(230, 126, 34, 0.2)';
      ctx.lineWidth = 4;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * newProgress));
      ctx.strokeStyle = 'rgba(230, 126, 34, 1)';
      ctx.lineWidth = 4;
      ctx.stroke();
      
      if (newProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Hide loading screen after completion
        setTimeout(() => setIsVisible(false), 200);
      }
    };
    
    animate();
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center z-[100] ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-white to-gray-50'}`}>
      <div className="relative w-40 h-40">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/92fe9630-74ce-4bf2-87c4-58c598909233.png" 
            alt="The Machine Monk"
            className="w-32 h-32"
          />
        </div>
      </div>
    </div>
  );
};
