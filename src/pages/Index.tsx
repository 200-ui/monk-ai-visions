
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
