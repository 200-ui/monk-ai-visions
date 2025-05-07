
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import FaqsPage from "./pages/FaqsPage";
import NotFound from "./pages/NotFound";

// Create a ThemeProvider component to handle theme state
const ThemeInitializer = () => {
  const [themeLoaded, setThemeLoaded] = useState(false);
  
  useEffect(() => {
    // Check system preference or saved preference for dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Mark theme as loaded to prevent flickering
    setThemeLoaded(true);
  }, []);
  
  // This helps prevent theme flickering during page navigation
  const location = useLocation();
  
  useEffect(() => {
    if (themeLoaded) {
      // Re-apply theme on route changes to prevent flickering
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  }, [location, themeLoaded]);

  // Add a class to the body while theme is loading to prevent flash of wrong theme
  if (!themeLoaded) {
    return <div className="theme-loading fixed inset-0 bg-white dark:bg-gray-900 z-[9999]"></div>;
  }

  return null;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ThemeInitializer />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
