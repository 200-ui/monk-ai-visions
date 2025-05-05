
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import { ServicePage } from "./pages/ServicePage";
import { FAQsPage } from "./pages/FAQsPage";
import { FeaturedProjects } from "./pages/FeaturedProjects";
import { LoadingScreen } from "./components/LoadingScreen";
import { BackToTop } from "./components/BackToTop";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {loading && <LoadingScreen />}
        <BrowserRouter>
          <BackToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/service/:serviceId" element={<ServicePage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/projects" element={<FeaturedProjects />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
